# task-manager-api

A node.js API that helps manage tasks, handle CRUD operations, jwt authentication with PostgreSQL.

## Documentation

For full API details, check the Postman Documentation [here](https://documenter.getpostman.com/view/42958843/2sB2cPk5wr)

## Tech Stack

- **Backend:**
  - **Node.js:** Node is a free, open-source, cross-platform Javascript runtime environment that lets developers create servers, web apps, command line tools and scripts.
  - **Express.js:** Express is a minimal and flexible Node.js web framework that simplifies building APIs and web applications by handling routing, middleware, and HTTP requests.
- **Database:**
  - **PostgresSQL(hosted on Railway):** Postgres is a powerful, open-source relational database system known for its reliability, scalability and advanced SQL compliance.
- **Authentication:**
  - **JWT(JSON Web Token):** A compact, secure way to represent authentication data, often used for user authentication and API author ization.
  - **bcrypt:** A hashing library used to securely hash and compare passwords to enhance authentication & security.
  - **Joi:** A schema validation library for Javascript, used to validate and enforce rules on user input in APIs.
- **Hosting:**
  - **Railway:** A cloud platform that simplifies deploying and managing databases, backend services, and full-stack applications with minimal configurations.
  - **Cloudinary:** Cloudinary is a cloud-based platform offering end-to-end image and video management, including storage, optimization, transformation, and delivery, for websites and applications.

## Features

- Authentication for accessing protected routes and resources.
- Can be used to create, update and delete tasks.
- Can be used to help track schedule based on factors like deadline and priority.
- Registered users can update their own data and delete their account.
- Users can upload images and retrive them.

## API USAGE

To use this API, you will need a tool like [Postman](https://www.postman.com/) or [Httpie](https://httpie.io/) to be able to access these endpoints or you can use your browser url and pass in data with development console.

Here's a basic example of how to use the API.

**Authentication**

**Endpoint:** POST /auth/register

```
{
  "name": "username"
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**

```
{
  "success": "true",
  "data": "data",
  "token": "your_jwt_token"
}
```

**Get all tasks (Protected route)**

**Endpoint:** GET /tasks/all

**Headers:**

```
{
  "Authorization": "Bearer your_jwt_token"
}
```

**Response:**

```
[
  {
    "id": 1,
    "title": "First Task",
    "description": "...",
    "status": "..."
  }
]
```

## Project Structure

```
src/
    |-- common #Rate limiter
    |-- config #Config files(DB queries, env.js)
    |-- controllers # Request handlers
    |-- middlewares # Auth and other middleware
    |-- routes # API routes
    |-- utils # jwt and other helpers
README.md
index.js
package-lock.json
package.json
```

## Deployment

- Hosted on Railway
- Access the API at https:///task-manager-api-2025.up.railway.app
