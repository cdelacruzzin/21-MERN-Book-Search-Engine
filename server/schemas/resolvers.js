const { AuthenticationError } = require('apollo-server-express');
const { User, bookSchema } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('savedBooks');
        },
        singleUser: async (parent, { userId }) => {
            return User.findById(userId);
        },
        me: async (parent, args, context) => {
            if (context._id) {
                const user = await User.findById(context._id);
                return user
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    },
    Mutation: {
        //defines the mutation resolver called "addUser", an async function that will create a User
        addUser: async (parent, { username, email, password }) => {
            /**
             * Destructures the username, email, and password from the args to extract only those values.
             * Uses the await keyword to wait until the async User.create() function completes.
             * This action creates a new User document with the required fields: username, email, and password.
             */
            const user = await User.create({ username, email, password });

            /** Takes the newly created User document assigned to "user", and passes it as an argument to the signToken(), which will be the payload we want to store. 
             * it will return a JWT, which we will store to "token"
             */
            const token = signToken(user);
            //when this "addUser" resolver is called, it will return the "user" (the newly created User document), and a token (a JWT with the user's encoded data)
            return { token, user };
        },

        // defines the mutation resolver for "login", an async function to log an authenticated user in.
        login: async (parent, { email, password }, context) => {
            /** destructures the email, and password to extract only those values.
             * Uses the await keyword to wait until the User.findOne() function to complete.
             * this gets only one user document with the required fields: email.
              */
            const user = await User.findOne({ email });
            //if the user does not exist, throw an authentication error.
            if (!user) {
                throw new AuthenticationError("no user with this email");
            }
            /**  uses the await keyword to wait until user.isCorrectPassword completes
             * This passes the password to the isCorrectPassword instance method.
             * It compares this password passed in, and the stored hashed password in the database.
             * throws an authentication error is incorrect password
            */
            const correstPass = await user.isCorrectPassword(password);
            if (!correstPass) {
                throw new AuthenticationError('Incorrect password');
            }
            /** takes the "user", and passes it to the signToken(), which will be the payload (data) we want to store to the context. It will return a JWT, and we assign it to "token" */
            const token = signToken(user);
            /** when "login" resolver mutation is called, it will return the user document whose email matches the "email" passed in the parameters, and a token (a JWT with the user's data encoded to the context) */
            return { token, user };
        },

        // defines the mutation resolver for "saveBook", an async function to update and append a User document's saveBook field
        saveBook: async (parent, { bookDetails, user }) => {
            try {
                //destructures the user to only extract the "_id" property.
                const { _id } = user;
                /** findByIdAndUpdate looks for a document with the "_id" field equal to the _id destructured from the user args.
                 * $push pushes the "bookDetails" to the savedBooks field of the user with the '_id' of _id.
                 * new: true, by default, findByIdAndUpdate(), etc. returns the old version. With new: true, tjese methods will return the new
                 * version of the document after the update has been applied
                */
                const selecteduser = await User.findByIdAndUpdate(
                    _id,
                    { $push: { savedBooks: bookDetails } },
                    { new: true }
                )
                    .populate('savedBooks'); // Populate savedBooks to get the full book details
                    //returns the updated user object with the savedBooks field populated
                return selecteduser;
            } catch (error) {
                console.log(error)
            }

        },
        // similar to saveBook mutation resolver, but instead uses $pull to remove the document 
        removeBook: async (parent, { bookId, userId }) => {
            try {
                return User.findOneAndUpdate(
                    { _id: userId },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true },
                )
                    .populate('savedBooks');// Populate savedBooks to get the full book details
            } catch (error) {
                console.log(error)
            }

        },
    },
};


module.exports = resolvers;