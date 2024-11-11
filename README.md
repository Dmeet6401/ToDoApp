Here’s a template for your `README.md` that includes setup instructions, details about the tools and libraries used, and challenges faced during the project:

---

# Todo List Application

This project is a simple Todo List application with features like creating, editing, deleting, and updating the task status. It uses a full-stack architecture with a React front-end, a Node.js back-end, and a MongoDB database.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Tools and Libraries Used](#tools-and-libraries-used)
- [Challenges Faced & Decisions Made](#challenges-faced-decisions-made)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/todo-app.git
```

### 2. Back-End Setup (Node.js and MongoDB)

#### Requirements:
- Node.js (v16 or higher)
- MongoDB instance (local or MongoDB Atlas)

#### Steps to set up back-end:

1. Navigate to the back-end directory:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory with the following content:

    ```env
    PORT=5000
    MONGO_URI=<Your_MongoDB_URI>
    JWT_SECRET=<Your_Secret_Key>
    ```

    - Replace `<Your_MongoDB_URI>` with your MongoDB connection string (either local or from MongoDB Atlas).
    - Replace `<Your_Secret_Key>` with a secret key for JWT authentication.

4. Start the server:

    ```bash
    npm start
    ```

    The server will run on `http://localhost:5000`.

### 3. Front-End Setup (React)

#### Requirements:
- Node.js (v16 or higher)

#### Steps to set up front-end:

1. Navigate to the front-end directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables by creating a `.env` file in the front-end directory with the following content:

    ```env
    REACT_APP_API_URL=http://localhost:5000/api
    ```

    This points to the back-end API.

4. Start the development server:

    ```bash
    npm start
    ```

    The application will run on `http://localhost:3000`.

---

## Tools and Libraries Used

### Front-End:

- **React**: A JavaScript library for building user interfaces.
- **React Router**: A library for routing in React applications.
- **Axios**: A promise-based HTTP client for making requests to the back-end.
- **useAuth (Custom Hook)**: A custom hook for managing authentication states.

### Back-End:

- **Node.js**: JavaScript runtime for building the back-end.
- **Express**: A web framework for Node.js to build REST APIs.
- **MongoDB**: NoSQL database for storing todos and user data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB to interact with the database.
- **JWT (JSON Web Token)**: Authentication mechanism for securing API endpoints.
- **Bcrypt**: Library for hashing passwords before saving them in the database.
- **Cors**: Middleware for enabling cross-origin requests between the front-end and back-end.

### Development Tools:

- **Postman**: Tool used for testing API endpoints during development.
- **Git**: Version control system for managing the codebase.
- **Node.js** and **npm**: Used for running the back-end server and managing dependencies.

### Deployment

The Todo List Application is deployed on the following platforms:

#### Front-End:
- **Vercel**: [Frontend Deployment Link](https://to-do-app-psi-sage.vercel.app/)

#### Back-End:
- **Back4App**: [Backend Deployment Link](https://todolist3-mhahxeq8.b4a.run/)


---

## Challenges Faced & Decisions Made

### 1. **Handling Authentication with JWT**:
   - **Challenge**: Securing API endpoints and managing user sessions.
   - **Solution**: Used JWT for stateless authentication. JWT tokens are sent in the `Authorization` header to protect API routes. Tokens are stored in cookies for persistence.

### 2. **Managing State in the Front-End**:
   - **Challenge**: Keeping the front-end state synchronized with the back-end (especially after updates, deletes, and adds).
   - **Solution**: Implemented a `useAuth` custom hook to manage user sessions and authentication state across the app. Used React state management (useState, useEffect) to update the UI dynamically.

### 3. **Error Handling**:
   - **Challenge**: Ensuring proper error handling in both the front-end and back-end to improve user experience.
   - **Solution**: Implemented `try-catch` blocks in async operations and displayed user-friendly error messages.

### 4. **CORS Issue**:
   - **Challenge**: The front-end and back-end were running on different ports, leading to CORS issues.
   - **Solution**: Used the `cors` middleware on the back-end to allow requests from different origins.

---
