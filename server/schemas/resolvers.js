const { AuthenticationError } = require('apollo-server-express');
const { User, bookSchema } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
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
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }, context) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError("no user with this email");
            }
            const correstPass = await user.isCorrectPassword(password);
            if (!correstPass) {
                throw new AuthenticationError('Incorrect password');
            }
            const token = signToken(user);
            // console.log(`signToken: ${token}`)
            // console.log(context._id)
            return { token, user };
        },
        saveBook: async (parent, { bookDetails, user }) => {
            try {
                const { _id } = user;
                const selecteduser = await User.findByIdAndUpdate(
                    _id,
                    { $push: { savedBooks: bookDetails } },
                    { new: true }
                )
                return selecteduser;
            } catch (error) {
                console.log(error)
            }

        },
        removeBook: async (parent, { bookId, userId }) => {

            return User.findOneAndUpdate(
                { _id: userId },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true },
            );
        },
    },
};


module.exports = resolvers;