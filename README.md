# Task Management System <br>
## **📌 Overview** ##
This project is a Task Management System built using the ***MERN stack (MongoDB, Express.js, React.js, and Node.js).*** It allows users to ***create, update, delete, and manage*** their tasks efficiently.


# 🌐 Live Demo # <br>
🚀 The project is deployed on **Netlify**. You can access it here: <br>

🔗 https://task-manager-backend-9hv8.onrender.com



## **Getting Started** ##
## **1️⃣ Prerequisites** ##
Ensure you have the following installed on your system:

✅ Node.js (Latest LTS version recommended) <br>

✅ MongoDB (Ensure it's running locally or use a cloud database like MongoDB Atlas) <br>

✅ Package Manager: npm <br>

## **2️⃣ Setup Instructions**  <br>
📌 Clone the repository
``` bash
git clone https://github.com/sanidhyapn/Task_manager.git
```
``` bash
cd task-management-system
```

# 🔥 Setting up the Backend
``` bash
cd backend
```
``` bash
npm install
```

Create a .env file in the backend directory and configure the following environment variables:
``` bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:
``` bash
npm run dev
```

# Setting up the Frontend
 ``` bash
cd frontend
```
``` bash
npm install
```
Start the frontend development server:
``` bash
npm run dev
```

# ***🛠 Technologies Used***

**Frontend :** <br>
✔️ React (UI framework)

✔️ Vite (Development build tool)

✔️ Chakra UI & Bootstrap (Styling and components)

✔️ React Router (Routing)

✔️ Axios (API requests)

✔️ Framer Motion (Animations)

**Backend :** <br>
✔️ Node.js & Express.js (Server and API)

✔️ MongoDB & Mongoose (Database)

✔️ JWT (JSON Web Token) (Authentication)

✔️ Bcrypt.js (Password hashing)

✔️ Cors & Cookie-Parser (Middleware)

✔️ Dotenv (Environment variables)

✔️ Nodemailer (Email notifications)

✔️ Node-Cron (Task scheduling)

***📌 Assumptions***
⭐ Users are required to log in before managing tasks.

⭐ Tasks can have statuses like pending, in-progress, and completed.

⭐ Email notifications are sent for task updates.

⭐ The backend assumes a MongoDB instance is running.


## 💡 Challenges Faced & Solutions  

| Challenge                         | Solution  |
|-----------------------------------|-----------|
| **Handling CORS errors**         | Implemented `cors` middleware to allow cross-origin requests. |
| **State management in React**    | Used React Hooks and Context API to manage global state. |
| **Securing authentication**      | Used JWT with secure cookies for user authentication. |
| **Deployment issues**            | Faced issues with environment variables, CORS, and server-client communication. Solved by: <br> ✅ Using `.env` files correctly <br> ✅ Setting up proper CORS policies <br> ✅ Configuring frontend to use the correct API endpoint <br> ✅ Debugging server logs and handling errors proactively |

