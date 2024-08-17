const mongoose = require("mongoose");
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const memberMiddleware = require("../middleware/memberMiddleware");
const taskModel = require("../models/task.model");
const taskRoute = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const managerMiddleware = require("../middleware/managerMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const userModel = require("../models/user.model");

taskRoute.use(express.json());

// Welcome message
taskRoute.get('/', authMiddleware, async (req, res) => {
    try {
        res.send("Welcome to Task Manager");
    } catch (error) {
        console.error("Error in GET /:", error);
        res.status(500).send("Internal server error");
    }
});

// Get tasks for a specific user (admin only)
taskRoute.get("/task", [authMiddleware, adminMiddleware], async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userID = decoded.userID;
        const tasks = await taskModel.find({ userID: userID });
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error in GET /task:", error);
        res.status(500).send("Internal server error");
    }
});

// Create a new task
taskRoute.post('/createTask', [authMiddleware, memberMiddleware], async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userID = decoded.userID;

        const task = new taskModel({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            userID: userID
        });

        await task.save();
        res.status(201).json({ message: "Task added successfully", task });
    } catch (error) {
        console.error("Error in POST /createTask:", error);
        res.status(500).send("Internal server error");
    }
});

// Update a task
taskRoute.patch('/update/:id', [authMiddleware, memberMiddleware], async (req, res) => {
    try {
        const { status } = req.body;
        const task = await taskModel.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (status === 'completed') {
            task.status = 'completed';
            task.completedAt = new Date();
        } else {
            task.status = status;
            task.completedAt = null;
        }

        await task.save();
        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        console.error("Error in PATCH /update/:id:", error);
        res.status(500).send("Internal server error");
    }
});

// Delete a task
taskRoute.delete('/delete/:id', [authMiddleware, memberMiddleware], async (req, res) => {
    try {
        const deletedTask = await taskModel.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: "Task deleted successfully", deletedTask });
    } catch (error) {
        console.error("Error in DELETE /delete/:id:", error);
        res.status(500).send("Internal server error");
    }
});

// Get all tasks (admin and manager)
taskRoute.get('/allUserTask', [managerMiddleware, adminMiddleware], async (req, res) => {
    try {
        const tasks = await taskModel.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error in GET /allUserTask:", error);
        res.status(500).send("Internal server error");
    }
});

// Get total and average tasks
taskRoute.get('/total_Avg_Tasks', adminMiddleware, async (req, res) => {
    try {
        const tasks = await taskModel.find();
        const completeTasks = await taskModel.find({ status: "completed" });
        const total = tasks.length;
        const avg = total > 0 ? completeTasks.length / total : 0;
        res.status(200).json({ total, averageCompletedTasks: avg, tasksList: tasks });
    } catch (error) {
        console.error("Error in GET /total_Avg_Tasks:", error);
        res.status(500).send("Internal server error");
    }
});

// Toggle user enabled status
taskRoute.patch('/toggle-enable/:id', adminMiddleware, async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        user.isEnabled = !user.isEnabled;
        await user.save();

        res.status(200).send(`User ${user.isEnabled ? 'enabled' : 'disabled'} successfully`);
    } catch (error) {
        console.error("Error in PATCH /toggle-enable/:id:", error);
        res.status(500).send("Internal server error");
    }
});

module.exports = taskRoute;
