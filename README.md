# BuddyScript Backend

[GitHub Repo Link](https://github.com/mohammad-salim-23/AppifylabTask-Backend)

## Overview

**Appifylab Backend** is a social media-style backend application where users can:  
- Create posts  
- Like posts  
- Comment on posts  
- View other users’ posts  

This backend is built with **Node.js, TypeScript, and MongoDB**. It is designed to support a social media platform with post interactions and can be extended with features like user profiles, notifications, and media uploads.

---

## Features

- **User Authentication** (JWT-based)  
- **CRUD Operations** for posts  
- **Like / Unlike** functionality  
- **Commenting System**  
- **Author-specific feed**  
- **Role-based access** (`user` and `admin`)  

---

## Tech Stack

- **Backend:** Node.js, Express.js, TypeScript  
- **Database:** MongoDB with Mongoose ORM  
- **Authentication:** JSON Web Tokens (JWT)  
- **Security:** bcrypt for password hashing  
- **Validation:** Zod  
- **Others:** CORS, dotenv for environment variables, http-status-codes  

---

## Future Plans

- Real-time chat between users  
- Post media upload (images/videos) support  
- Notifications system  
- Admin dashboard for moderation  
- Enhanced search and feed algorithms  

---

## Getting Started (Local Development)

### Prerequisites

- Node.js v18+  
- npm or yarn  
- MongoDB instance (local or Atlas)  

### Installation

1. Clone the repository:

```bash
git clone https://github.com/mohammad-salim-23/AppifylabTask-Backend.git
cd AppifylabTask-Backend
Install dependencies:
npm install
# or
yarn
Create a .env file in the root directory and add your environment variables:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the development server:
npm run start:dev
# or
yarn start:dev
The backend will be running at http://localhost:5000.

###-------API Endpoints-----------
API Endpoints
Auth Routes (/api/auth)
POST /login
Login a user. Public endpoint.
POST /register
Register a new user. Public endpoint.
GET /users
Get all users. Accessible by admin and user.
PATCH /users/:id
Update user status. Accessible by admin and user.
Post Routes (/api/post)
POST /
Create a new post. Accessible by user and admin.
GET /feed
Get feed posts from other users. Accessible by user and admin.
GET /my-posts
Get posts created by the current user. Accessible by user and admin.
PATCH /:id
Update a post. Accessible by user and admin.
DELETE /:id
Delete a post. Accessible by user and admin.
Comment Routes (/api/comment)
POST /
Add a comment or reply to a post. Accessible by user and admin.
GET /:postId
Get top-level comments for a post. Accessible by user and admin.
GET /replies/:commentId
Get replies for a specific comment. Accessible by user and admin.
PATCH /:commentId
Update a comment. Accessible by user and admin.
DELETE /:commentId
Delete a comment. Accessible by user and admin.
Like Routes (/api/likes)
POST /
Like or unlike a post. Accessible by user and admin.
GET /post/:postId
Get likes for a specific post. Accessible by user and admin.