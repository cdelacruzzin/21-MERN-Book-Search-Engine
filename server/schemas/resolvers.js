const {AuthenticationError} = require('apollo-server-express');
const {User, bookSchema} = require('../models');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        singleUser: async (parent, {userId}) =>{
            return User.findById(userId);
        },
        me: async (parent, args, context) => {
            // if(context.)
        }
    },
    Mutation: {
        addUser: async (parent, {username, email, password}) =>{
            const user = await User.create({username, email, password});
            const token = signToken(user);
            return {token, user};
        },
        login: async (parent, {email, password})=> {
            const user = await User.findOne({email});
            if(!user){
                throw new AuthenticationError("no user with this email");
            }
            const correstPass = await user.isCorrectPassword(password);
            if(!correstPass){
                throw new AuthenticationError('Incorrect password');
            }
            const token = signToken(user);
            return {token, user};
        },
        saveBook: async (parent, {bookDetails, user}) => {

            const {_id, username} = user;

            const selecteduser = await User.findById(_id);

            selecteduser.savedBooks.push(bookDetails);

            return selecteduser;

        }

    }
}


module.exports = resolvers;