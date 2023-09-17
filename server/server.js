const { ApolloServer } = require('apollo-server-express'); // Importing ApolloServer from the 'apollo-server-express' module to create a GraphQL server with Express.


const express = require('express');
const path = require('path');
const db = require('./config/connection');
// const routes = require('./routes');

const { authMiddleware } = require('./utils/auth');
const { resolvers, typeDefs } = require('./schemas');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({   //initializes a new Apollo Server with the typeDefs, resolver functions and the auth context 
  typeDefs,
  resolvers,
  context: authMiddleware   //before a request is processed by resolvers, it wil pass through this middleware. it checks if the request has a valid jwt, if so, attach it to the request's context.
})


app.use(express.urlencoded({ extended: true }));  //middleware to parse incoming url-encoded data(form submissions)
app.use(express.json());  //middleware to parse incoming JSON data (API requests)

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {  //defines a router for the "/" endpoint
  res.sendFile(path.join(__dirname, '../client/build/index.html'));   //acts as an entry point. Once hit, send back the "index.html" from the build directopry
});

//creates a new instance of the Apollo Server with the graphql schema
const startApolloServer = async () => { //async function to start the Apollo server and apply its middlewares
  await server.start();   //starts the Apollo Server
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

startApolloServer();