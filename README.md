Here's your fixed and polished README file:

# Backend

This is the backend of a social media application built with Node.js, Express, and MongoDB. It handles user authentication, post creation, and post interaction.

## Getting Started

Follow these steps to set up the project locally for development and testing.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd <project-folder>
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and add the following:
   ```
   MONGODB_URL=your_mongodb_url
   JWT_SECRET=your_jwt_secret
   ```
5. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### User Routes

- **POST /api/user/new/user**
  - Create a new user.
  - **Request Body:** `{ email, username, password, profile }`
  - **Response:** `{ user, accessToken }`

- **GET /api/user/login**
  - Log in a user.
  - **Request Body:** `{ email, password }`
  - **Response:** `{ user, accessToken }`

- **PUT /api/user/:id/follow**
  - Follow or unfollow a user.
  - **Request Body:** `{ user }`
  - **Response:** `"User has been followed"` or `"User has been unfollowed"`

- **GET /api/user/flw/:id**
  - Get posts from followed users.
  - **Response:** Array of posts.

- **GET /api/user/all/user/:id**
  - Get all users except those followed by the current user.
  - **Response:** Array of users.

- **PUT /api/user/update/password/:id**
  - Update user password.
  - **Request Body:** `{ oldPassword, newPassword, confirmPassword }`
  - **Response:** `"Password has been updated"`

- **GET /api/user/get/search/user**
  - Search for users.
  - **Query Params:** `keyword`
  - **Response:** Array of users.

- **GET /api/user/explore**
  - Get all posts sorted by weight.
  - **Response:** Array of posts.

### Post Routes

- **POST /api/post/new/post**
  - Create a new post.
  - **Request Body:** `{ title, image }`
  - **Response:** Post object.

- **POST /api/post/all/post/by/user**
  - Get all posts by the current user.
  - **Response:** Array of posts.

- **PUT /api/post/:id/like**
  - Like or dislike a post.
  - **Response:** `"Post liked"` or `"Post disliked"`

- **PUT /api/post/comment/post**
  - Add a comment to a post.
  - **Request Body:** `{ comment, postId, profile }`
  - **Response:** Post object.

## Built With

- [Node.js](https://nodejs.org/) - JavaScript runtime.
- [Express](https://expressjs.com/) - Backend framework.
- [MongoDB](https://www.mongodb.com/) - Database.
- [JWT](https://jwt.io/) - Authentication.
