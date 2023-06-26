const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth")

const resolvers = {
    query: {
        me: async (parent, args) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id});
                return userData;
            }
            throw new AuthenticationError("you need to log in!!");
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user};
        }
    },
    login: async (parent, {email, password}) => {
        const user = await User.findOne({email});

        if(!user) {
            throw new AuthenticationError("no user found");
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
            throw new AuthenticationError("Incorrect information!");
        }
        const token = signToken(user);
        return {token, user};
    },

    saveBook: async (parent, {newBook}, context) => {
        if (context.user) {
            const user = await User.findByIdAndUpdate({_id: context.user._id}, {$push: {savedBooks: newBook}}, {new: true});
            return user;
        }
        throw new AuthenticationError("Please log in!!")
    },

    removeBook: async (parent, {bookId}, context) => {
        if (context.user) {
            const user = await User.findByIdAndUpdate({_id: context.user._id}, {$pull: {savedBooks: bookId}}, {new: true});
            return user;
        }
        throw new AuthenticationError("Please log in!!")
    },

}
