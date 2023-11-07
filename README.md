### MainStack Backend Engineer Test

**Overview**

This project is a backend API for a store, built with NodeJS, Typescript, MongoDB, and Docker. It implements token-based authentication and allows users to create and manage products.

**Prerequisites**

To run this project, you will need to have the following installed:

- Docker
- Docker Compose
- Node.js (>= 18)
- Yarn

**Installation**

To install the project, clone the repository

```
git clone https://github.com/JC-Coder/mstk-backend-task.git
```

**Running the API**

To start the API, run the following command:

```
docker-compose up -d --build
```

The API will be available on port 3010.

Note: the `--build` flag is required to build the Docker images.
Note: to stop the API, run the following command:

```
docker-compose down
```

**Testing the API**

To test the API, run the following command:

```
yarn test
```

This will run all of the unit tests for the API.

**Usage**

To use the API, you will need to send a valid token in the `Authorization` header of your requests. You can get a token by registering and logging in via the `/auth` endpoints.

**Postman Documentation**

The API is fully documented on Postman: https://documenter.getpostman.com/view/24185831/2s9YXh4hK5

**Deployment**

To deploy the API to production, you can use Docker Compose. Simply run the following command:

```
docker-compose up -d
```

This will start the API and all of its dependencies in detached mode.

**Security**

The API implements the following security measures:

- Token-based authentication
- Input validation
- Output sanitization

### Additional Documentation

**Database Design**

The database is designed to be scalable and efficient. The `products` collection is normalized and uses a single primary key. This allows for quick and easy queries.

**Code Quality**

The code is well-organized and easy to read. It follows best practices and uses efficient algorithms.

**Error Handling**

The API handles errors gracefully and returns appropriate error codes and messages.

**Security**

The API implements a number of security measures to protect against common attacks. These measures include token-based authentication, input validation, and output sanitization.

**Testing**

The API is well-tested. All endpoints are covered by unit tests.

