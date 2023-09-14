const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({req}) {
    // allows token to be sent via  req.query or headers
    let token = req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    //if no token found, the middleware returns the request object unchanged(any resolver using this request is not authenticated)
    if (!token) {
      return req;
    }

    // verify token and get user data out of it
    try {
      //if the token is verified, the "verify" function will return the payload token
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;  //the decoded user data from the token is added to the request object
    } catch {
      console.log('Invalid token');
    }

    console.log(req)
    return req; //return the request object so it can be passed to the resolver as "context"
  },

  //function to generate a JWT token
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id }; //stores the data(payload) that we want to store the token

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });  //the "sign" method creates and returns a new JWT, encoding the payload with the secret
  },
};
