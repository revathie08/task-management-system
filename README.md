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
