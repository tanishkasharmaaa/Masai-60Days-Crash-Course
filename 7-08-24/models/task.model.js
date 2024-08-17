const mongoose = require("mongoose");

// Define the schema for tasks
const taskSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ["completed", "pending"], 
        default: "pending" 
    },
    userID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users" 
    },
    completedAt: { 
        type: Date, 
        default: null 
    }
}, { versionKey: false }); // Disable versioning

// Create and export the model
const taskModel = mongoose.model("task", taskSchema);

module.exports = taskModel;
