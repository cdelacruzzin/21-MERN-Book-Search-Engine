# Google Books Search Engine Revamp

**Experience a revamped Google Books search engine!** Initially built using a RESTful API, this engine has been transformed to utilize a GraphQL API via Apollo Server.

## Overview

[Explore the Live Site](https://graphql-book-search-engine-091b0d7dad44.herokuapp.com/) 
![preview](/client/src/assets/Capture.PNG)


Dive into this enhanced version of the Google Books search engine. Initially leveraging a RESTful API, I've elevated its functionality by transitioning to a GraphQL API through Apollo Server. Crafted with the MERN stack, this application integrates a React frontend, a MongoDB database, and a server/API structured with Node.js and Express.js. In this revamp, I've:

- Established an Apollo Server, adapting GraphQL for data fetching and modifications, bidding farewell to the former RESTful API.
  
- Tweaked the existing authentication middleware to seamlessly function within a GraphQL API ambiance.

- Integrated an Apollo Provider, ensuring optimal communication with the Apollo Server.

- Successfully launched the application on Heroku.

## Technology Used 

| Technology Used         | Resource URL           | 
| ------------- |:-------------:|    
| Git | [https://git-scm.com/](https://git-scm.com/)     |  
| JavaScript | [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) |  
| NodeJs | [https://nodejs.org/en](https://nodejs.org/en) |
| ExpressJS | [https://www.npmjs.com/package/express](https://www.npmjs.com/package/express) |
| GraphQL | [https://graphql.org/](https://graphql.org/) |
| MongoDB | [https://www.mongodb.com/](https://www.mongodb.com/) |
| Mongoose ODM | [https://www.npmjs.com/package/mongoose](https://www.npmjs.com/package/mongoose) |
| Apollo Server | [https://www.apollographql.com/docs/apollo-server/](https://www.apollographql.com/docs/apollo-server/) |
| React | [https://react.dev/](https://react.dev/) |

<be>

## Installation

**Prerequisites:**
- Ensure MongoDB is installed on your system.
- NPM packages required: `express-js` and `mongoose`.

**Installation & Execution:**

1. **Repository Setup**: Clone the repository to a suitable directory on your local machine.
2. **Dependency Installation**: In the terminal, navigate to the root directory of the project. Execute the command `npm install` to install the necessary dependencies as outlined in the `package.json` file.
3. **Server Initialization**: To commence the application, use either the `npm run start` or `npm run develop` commands. This will initialize both the client and server concurrently.

Adhere to these instructions meticulously to ensure seamless operation of the MERN Book-Search-Engine.



