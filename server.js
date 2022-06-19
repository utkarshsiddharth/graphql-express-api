const express = require("express")
const expressGraphQL = require("express-graphql").graphqlHTTP
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql")
let { books, authors } = require("./data")
const cors = require("cors")

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "Author details",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => {
        return books.filter((book) => book.authorId === author.id)
      },
    },
  }),
})

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This represent a book written by a author",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return authors.find((author) => author.id === book.authorId)
      },
    },
  }),
})

// root query
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    book: {
      type: BookType,
      description: "Single book entry",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => books.find((book) => book.id === args.id),
    },
    books: {
      type: new GraphQLList(BookType),
      description: "List of books",
      resolve: () => books,
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of Authors",
      resolve: () => authors,
    },
    author: {
      type: AuthorType,
      description: "Single author entry",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        authors.find((author) => author.id === args.id),
    },
  }),
})

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addBook: {
      type: BookType,
      description: "Add a book",
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const book = {
          id: books.length + 1,
          name: args.name,
          authorId: args.authorId,
        }
        books.push(book)
        return book
      },
    },
    addAuthor: {
      type: BookType,
      name: "Add Author",
      description: "Add a new author",
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (parent, args) => {
        const author = {
          id: authors.length + 1,
          name: args.name,
        }
        authors.push(author)
        return author
      },
    },
    deleteBook: {
      type: BookType,
      name: "Delete Book",
      description: "Delete a book by its id",
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve: (parent, args) => {
        let book = ""
        books = books.filter((_book) => {
          if (_book.id === args.id) {
            book = _book
          }
          return _book.id !== args.id
        })
        return book
      },
    },
    deleteAuthor: {
      type: AuthorType,
      name: "Delete Author",
      description: "Delete a author by its id",
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve: (parent, args) => {
        let author = ""
        authors = authors.filter((_author) => {
          if (_author.id === args.id) {
            author = _author
          }
          return _author.id !== args.id
        })
        return author
      },
    },
  }),
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
})

const app = express()
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
)
app.use(
  "/graphql",
  expressGraphQL({
    graphiql: true,
    schema: schema,
  })
)
app.listen(5000, () => console.log(`server is running on PORT: 5000`))
