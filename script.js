const express = require('express');
const path = require('path');
const app = express();
const port = 4000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle the form submission

let tasks = [];

// Add a new task
app.post('/add-task', (req, res) => {
    const { taskName, description, deadline } = req.body;

    // Process the data (e.g., save to a database or just log it)
    console.log(`Task Name: ${taskName}`);
    console.log(`Description: ${description}`);
    console.log(`Deadline: ${deadline}`);

    tasks.push({ taskName, description, deadline });
    res.send('Task added successfully!');
});

// Fetch all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Update a task
app.put('/update-task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);  // Get task index from URL
    const { taskName, description, deadline } = req.body;

    tasks[taskId] = { taskName, description, deadline };  // Update the task

    res.send('Task updated successfully!');
});

// Delete a task
app.delete('/delete-task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);  // Get task index from URL

    tasks = tasks.filter((task, index) => index !== taskId);  // Remove the task

    res.send('Task deleted successfully!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
