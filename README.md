# Chat Application

This is a full-stack chat application with a React frontend and a Node.js backend. The frontend is deployed on GitHub Pages, and the backend is deployed on Render. MongoDB Atlas is used as the database.

## Table of Contents

- Features
- Demo
- Technologies Used
- Getting Started
  - Prerequisites
  - Installation
  - Running the Frontend
  - Running the Backend
- Environment Variables
- Deployment
  - Deploying Frontend
  - Deploying Backend
- License

## Features

- Real-time messaging
- Persistent message storage
- Responsive design

## Demo

You can view the live demo of the frontend here: https://your-username.github.io/your-repo-name

## Technologies Used

- Frontend: React, Socket.io-client
- Backend: Node.js, Express, Socket.io, Mongoose
- Database: MongoDB Atlas
- Deployment: GitHub Pages (Frontend), Render (Backend)

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)
- Git

### Installation

1. Clone the repository

   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

2. Install dependencies for the frontend

   cd client
   npm install

3. Install dependencies for the backend

   cd ../server
   npm install

### Running the Frontend

1. Navigate to the client directory

   cd client

2. Start the React development server

   npm start

   The frontend will be available at http://localhost:3000.

### Running the Backend

1. Navigate to the server directory

   cd server

2. Start the Node.js server

   node server.js

   The backend will be available at http://localhost:5000.

## Environment Variables

Create a .env file in the server directory and add the following environment variables:

MONGODB_URI=your-mongodb-atlas-connection-string
PORT=5000

## Deployment

### Deploying Frontend

1. Navigate to the client directory

   cd client

2. Install gh-pages

   npm install gh-pages --save-dev

3. Update package.json

   Add the following properties to your package.json file in the client directory:

   "homepage": "https://your-username.github.io/your-repo-name",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }

4. Deploy to GitHub Pages

   npm run deploy

### Deploying Backend

1. Create a Render Account

   Sign up for a free account on Render: https://render.com/

2. Create a New Web Service

   Click on "New" and then "Web Service".

3. Connect Your Repository

   Connect your GitHub repository containing the backend code.

4. Configure the Service

   - Name: Give your service a name.
   - Environment: Select "Node".
   - Build Command: Use `npm install`.
   - Start Command: Use `node server.js`.

5. Add Environment Variables

   Add your MongoDB Atlas connection string as an environment variable.

6. Deploy

   Click "Create Web Service" to deploy your backend.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

Replace placeholders like `your-username`, `your-repo-name`, and `your-mongodb-atlas-connection-string` with your actual GitHub username, repository name, and MongoDB Atlas connection string, respectively.