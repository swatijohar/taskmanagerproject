import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Task } from './models/Task.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect to MongoDB with better error handling
mongoose.connect(process.env.MONGODB_URI, mongooseOptions)
  .then(() => console.log('✅ Connected to MongoDB successfully'))
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });

// Add MongoDB connection error handler
mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

// Routes
// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    console.log('Tasks fetched successfully:', tasks.length);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create a task
app.post('/api/tasks', async (req, res) => {
  try {
    console.log('Received task data:', req.body);
    
    if (!req.body.title || !req.body.description) {
      return res.status(400).json({ 
        message: 'Title and description are required' 
      });
    }

    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      completed: false
    });

    const savedTask = await task.save();
    console.log('Task saved successfully:', savedTask);
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update a task
app.patch('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});