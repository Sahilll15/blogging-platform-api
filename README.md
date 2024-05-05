# Blogging Platform API -MYSQL BACKEND

This repository contains the RESTful API for a blogging platform built using Express.js and MySQL. The API supports operations related to blog posts, comments, and user authentication.


## Features

- User authentication using JSON Web Tokens (JWT)
- CRUD operations for blog posts
- CRUD operations for comments
- Middleware for authentication and error handling
- Input data validation
- Use of a relational database (MySQL) for data storage

## Requirements

- Node.js
- MySQL

## Installation

1. Clone the repository:

   ```bash
    git clone https://github.com/sahilll15/blogging-platform-api.git
   ```

2. Go into the working directory
```bash
cd blogging-platform-api
```

3. view the .env.example file and add the required fields


4. run the project
```
npm i
nodemon index.js
```



   

## API Documentation

the APIs of the project are


1. **Authentication API**
    - `POST auth/register`: Register a new user.
    - `POST auth/login`: Log in an existing user.

2. **Blog Posts API**
    - `POST /blog/create`: Create a new blog post.
    - `GET /blog/all`: Get all blog posts.
    - `GET /blog/get/:id`: Get a single blog post by ID.
    - `PUT /blog/update/:id`: Update a blog post by ID.
    - `DELETE /blog/delete/:id`: Delete a blog post by ID.


3. **Comments API**
    - `POST /comment/create/:postId`: Create a new comment.
    - `GET /comment/get/:postId`: Get all comments for a post.
    - `PUT /comment/update/:commentId`: Update a comment by ID.
    - `DELETE /comment/delete/:commentId`: Delete a comment by ID.
    - `GET /comment/comment/:commentId`: get the comment by the comment id 

  4. **Middleware**
    - Authentication middleware: Ensures that only authenticated users can access certain routes.
    - Error handling middleware: Handles errors and returns appropriate HTTP responses.

5. **Database Connection**
    - The API uses MySQL as the database management system.
    - The database connection details can be configured in the `db.js` file.




## Tech Stack

**Server:** Node, Express,mysql2

