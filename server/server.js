const { ApolloServer } = require('apollo-server-express'); // Importing ApolloServer from the 'apollo-server-express' module to create a GraphQL server with Express.
const express = require('express');
const path = require('path'); //imports the built-in "path" module which provides utilities to work with files and directories
const db = require('./config/connection');  //stores the database connection string from the config

const { authMiddleware } = require('./utils/auth');   //
const { resolvers, typeDefs } = require('./schemas');   //imports the graphql resolver and type definition functions

const app = express();  //initializes the express app
const PORT = process.env.PORT || 3001;  //stores the port number for the server to listen to.

const server = new ApolloServer({   //initializes a new Apollo Server with the typeDefs, resolver functions and the auth context 
  typeDefs,
  resolvers,
  context: authMiddleware   //before a request is processed by resolvers, it wil pass through this middleware. it checks if the request has a valid jwt, if so, attach it to the request's context.
})


app.use(express.urlencoded({ extended: true }));  //middleware to parse incoming url-encoded data(form submissions)
app.use(express.json());  //middleware to parse incoming JSON data (API requests)

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));   //serves static files from the "build" directory inside the cliend folder
}

app.get('/', (req, res) => {  //defines a router for the "/" endpoint
  res.sendFile(path.join(__dirname, '../client/build/index.html'));   //acts as an entry point. Once hit, send back the "index.html" from the build directopry
});

//creates a new instance of the Apollo Server with the graphql schema
const startApolloServer = async () => { //async function to start the Apollo server and apply its middlewares
  await server.start();   //starts the Apollo Server
  server.applyMiddleware({ app });  // attaches the apollo server middlewares to the express app

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

startApolloServer();