// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Job = require('./models/Job');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware: Log all incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

//CORS Configuration (Relaxed for development)
app.use(cors()); // <-- Allows all origins during development

// Middleware: Parse JSON request body
app.use(express.json());

// Health Check Route (Optional, useful for debugging)
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes

// GET all jobs (with optional search)
app.get('/api/jobs', async (req, res) => {
  try {
    const { search } = req.query;
    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { location: { $regex: search, $options: 'i' } }
          ]
        }
      : {};
    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET a single job by ID
app.get('/api/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    console.error("Error getting job by ID:", err);
    res.status(400).json({ error: 'Invalid job ID' });
  }
});

// POST a new job
app.post('/api/jobs', async (req, res) => {
  try {
    console.log("Data received:", req.body);
    const { title, company, type, location, description } = req.body;

    // Basic validation
    if (!title || !company || !type || !location || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newJob = new Job({ title, company, type, location, description });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    console.error("Error saving job:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
