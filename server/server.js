const {ApolloServer} = require('apollo-server-express'); 

const express = require('express');
const path = require('path');
const db = require('./config/connection');
// const routes = require('./routes');

const {authMiddleware} = require('./utils/auth');
const {resolvers, typeDefs} = require('./schemas');

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

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
