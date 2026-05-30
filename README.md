# Task Management System

A full-stack CRUD application for managing tasks with role-based authentication for Users and Admins. Built as part of QUT IFQ636 Software Life Cycle Management - Assignment 1.

## Overview

The Task Management System allows registered users to manage their personal tasks (Create, Read, Update, Delete) while providing administrators with oversight capabilities to view all users, monitor all tasks, and update task statuses across the system.

## Features

### User Features
- User registration and login
- Add new tasks with title, description, due date
- View all personal tasks
- Edit existing tasks
- Delete tasks
- Logout

### Admin Features
- Role-based login
- View all registered users
- View all tasks from all users
- Update task status (Pending / In Progress / Completed)
- Logout

## Setup Instructions

### Prerequisites
- Node.js v18+ installed
- MongoDB Atlas account (or local MongoDB)
- Git installed

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in `backend/` folder:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5001

Start backend server:
```bash
npm start
```

Backend runs at: `http://localhost:5001`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## Public URL

Application URL:
http://52.65.192.73:3000

## JIRA Board

JIRA Board URL:
https://revathiedathikandi.atlassian.net/jira/software/projects/SCRUM/boards/1

## Project Structure

task-management-system/
├── .github/
│   └── workflows/
│       └── run-test.yml
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── tests/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
└── README.md

## Automated Testing

The project includes automated backend unit tests implemented using Mocha, Chai, Sinon, and Supertest. GitHub Actions is configured to automatically execute test cases whenever code is pushed to the main branch.

## Conclusion

The Task Management System was successfully developed as a full-stack web application using React.js, Node.js, Express.js, and MongoDB. The system supports role-based authentication and complete CRUD operations for task management. Users can create, view, update, and delete tasks, while administrators can manage users and monitor tasks across the system.

The project demonstrates the application of software development lifecycle concepts including requirements analysis, system design, project planning, UI/UX prototyping, version control, automated testing, CI/CD implementation, and cloud deployment. GitHub feature branches, pull requests, and GitHub Actions were used to support a structured and maintainable development workflow.

