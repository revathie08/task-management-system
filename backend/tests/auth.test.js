const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const Task = require('../models/Task');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const { expect } = chai;

describe('CreateTask Function Test', () => {
  
  it('should create a new task successfully', async () => {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      body: { title: "New Task", description: "Task description", dueDate: "2026-12-31" }
    };
    
    const createdTask = { _id: new mongoose.Types.ObjectId(), ...req.body, userId: req.user.id };
    
    const saveStub = sinon.stub(Task.prototype, 'save').resolves(createdTask);
    
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    
    await createTask(req, res);
    
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.called).to.be.true;
    
    saveStub.restore();
  });
  
  it('should return 500 if an error occurs', async () => {
    const saveStub = sinon.stub(Task.prototype, 'save').throws(new Error('DB Error'));
    
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      body: { title: "New Task", description: "Task description", dueDate: "2026-12-31" }
    };
    
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    
    await createTask(req, res);
    
    expect(res.status.calledWith(500)).to.be.true;
    
    saveStub.restore();
  });
});

describe('GetTasks Function Test', () => {
  
  it('should return tasks for the user', async () => {
    const userId = new mongoose.Types.ObjectId();
    const mockTasks = [
      { _id: new mongoose.Types.ObjectId(), title: "Task 1", userId },
      { _id: new mongoose.Types.ObjectId(), title: "Task 2", userId }
    ];
    
    const findStub = sinon.stub(Task, 'find').resolves(mockTasks);
    
    const req = { user: { id: userId } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    
    await getTasks(req, res);
    
    expect(res.json.calledWith(mockTasks)).to.be.true;
    
    findStub.restore();
  });
  
  it('should return 500 if database error occurs', async () => {
    const findStub = sinon.stub(Task, 'find').throws(new Error('DB Error'));
    
    const req = { user: { id: new mongoose.Types.ObjectId() } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    
    await getTasks(req, res);
    
    expect(res.status.calledWith(500)).to.be.true;
    
    findStub.restore();
  });
});

describe('DeleteTask Function Test', () => {
  
  it('should delete a task successfully', async () => {
    const taskId = new mongoose.Types.ObjectId();
    const mockTask = { 
      _id: taskId, 
      title: "Task to delete",
      deleteOne: sinon.stub().resolves()
    };
    
    const findByIdStub = sinon.stub(Task, 'findById').resolves(mockTask);
    
    const req = { params: { id: taskId } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    
    await deleteTask(req, res);
    
    expect(mockTask.deleteOne.calledOnce).to.be.true;
    expect(res.json.calledWith({ message: 'Task deleted' })).to.be.true;
    
    findByIdStub.restore();
  });
  
  it('should return 404 if task not found', async () => {
    const findByIdStub = sinon.stub(Task, 'findById').resolves(null);
    
    const req = { params: { id: new mongoose.Types.ObjectId() } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    
    await deleteTask(req, res);
    
    expect(res.status.calledWith(404)).to.be.true;
    
    findByIdStub.restore();
  });
});

describe('UpdateTask Function Test', () => {
  
  it('should update a task successfully', async () => {
    const taskId = new mongoose.Types.ObjectId();
    const mockTask = { 
      _id: taskId,
      title: "Old Title",
      description: "Old Description",
      dueDate: "2026-12-31",
      status: "Pending",
      save: sinon.stub().resolvesThis()
    };
    
    const findByIdStub = sinon.stub(Task, 'findById').resolves(mockTask);
    
    const req = { 
      params: { id: taskId },
      body: { title: "Updated Title", description: "Updated Description" }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    
    await updateTask(req, res);
    
    expect(mockTask.title).to.equal("Updated Title");
    expect(mockTask.save.calledOnce).to.be.true;
    expect(res.json.called).to.be.true;
    
    findByIdStub.restore();
  });
  
  it('should return 404 if task not found for update', async () => {
    const findByIdStub = sinon.stub(Task, 'findById').resolves(null);
    
    const req = { 
      params: { id: new mongoose.Types.ObjectId() },
      body: { title: "Updated Title" }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    
    await updateTask(req, res);
    
    expect(res.status.calledWith(404)).to.be.true;
    
    findByIdStub.restore();
  });
});

describe('Authentication Tests', () => {
  
  const User = require('../models/User');
  const { registerUser, loginUser } = require('../controllers/authController');
  const bcrypt = require('bcrypt');
  
  it('should register a new user successfully', async () => {
    const req = {
      body: { name: "Test User", email: "test@test.com", password: "password123" }
    };
    
    const newUser = { 
      _id: new mongoose.Types.ObjectId(),
      name: "Test User",
      email: "test@test.com",
      role: "user"
    };
    
    const findOneStub = sinon.stub(User, 'findOne').resolves(null);
    const createStub = sinon.stub(User, 'create').resolves(newUser);
    
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    
    await registerUser(req, res);
    
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.called).to.be.true;
    
    findOneStub.restore();
    createStub.restore();
  });
  
  it('should return 400 if user already exists', async () => {
    const existingUser = { email: "test@test.com" };
    const findOneStub = sinon.stub(User, 'findOne').resolves(existingUser);
    
    const req = {
      body: { name: "Test User", email: "test@test.com", password: "password123" }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    
    await registerUser(req, res);
    
    expect(res.status.calledWith(400)).to.be.true;
    
    findOneStub.restore();
  });
  
  it('should return 401 for invalid login credentials', async () => {
    const findOneStub = sinon.stub(User, 'findOne').resolves(null);
    
    const req = {
      body: { email: "wrong@test.com", password: "wrongpassword", role: "user" }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    
    await loginUser(req, res);
    
    expect(res.status.calledWith(401)).to.be.true;
    
    findOneStub.restore();
  });
});
