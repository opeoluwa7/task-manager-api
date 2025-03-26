# task-manager-api

A node.js API that helps manage tasks, handle CRUD operations, user authentication with PostgreSQL.

## Tech Stack

- **Backend:** - **Node.js:** Node is a free, open-source, cross-platform Javascript runtime environment that lets developers create servers, web apps, command line tools and scripts. - **Express.js:** Express is a minimal and flexible Node.js web framework that simplifies building APIs and web applications by handling routing, middleware, and HTTP requests.
- **Database:** -**PostgresSQL(hosted on Railway):** Postgres is a powerful, open-source relational database system known for its reliability, scalability and advanced SQL compliance.
- **Authentication:** -**JWT(JSON Web Token):** A compact, secure way to represent authentication data, often used for user authentication and API authorization. -**bcrypt:** A hashing library used to securely hash and compare passwords to enhance authentication & security. -**Joi:** A schema validation library for Javascript, used to validate and enforce rules on user input in APIs.
- **Hosting:** -**Railway:** A cloud platform that simplifies deploying and managing databases, backend services, and full-stack applications with minimal configurations.

### Features

-

#### Setup & Installation

The Backend Service is hosted on railway so you do not need the project files to run this API, your browser or postman alone will suffice.

To run this project locally:
**1. Clone the repository**

```
git clone https://github.com/opeoluwa7/task-manager-api.git
cd your-repo
```

**2. Install dependencies**
`npm install`

**3. Run the server**
`npm start`

By default, Railway sets the PORT but there is a default of 5000 in `index.js`. You can change this to whatever PORT you want.
Then run this in your browser or postman:
`http://localhost:5000`

##### API USAGE

To use this API, you will need a tool like POSTMAN to be able to access these endpoints or you can use your browser url and pass in data with development console.

Here's a basic example of how to use the API.
