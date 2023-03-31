const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        return Book.find({ author: author }).populate("author");
      }
      if (args.genre) {
        return Book.find({ genres: args.genre }).populate("author");
      }
      return Book.find({}).populate("author");
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("Unauthenticated", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      if (args.title.length < 5) {
        throw new GraphQLError("Title must have at least 5 characters", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
          },
        });
      }
      if (args.author.length < 4) {
        throw new GraphQLError("Author must have at least 4 characters", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.author,
          },
        });
      }
      // check if the author exists in the database
      const findAuthor = await Author.findOne({ name: args.author });
      if (!findAuthor) {
        const author = new Author({ name: args.author });
        await author.save();
      }

      const author =
        findAuthor || (await Author.findOne({ name: args.author }));
      const book = new Book({ ...args, author: author });
      author.bookCount = author.bookCount ? (author.bookCount += 1) : 1;
      await author.save();

      await book.save();
      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, { currentUser }) => {
      // check if the user is logged in
      if (!currentUser) {
        throw new GraphQLError("Unauthenticated", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      return author.save();
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });
      try {
        return user.save();
      } catch (error) {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "password") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, process.env.SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
