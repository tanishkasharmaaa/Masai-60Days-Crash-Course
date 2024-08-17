const mongoose = require("mongoose");

// Define the schema for users
const userSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true,
        unique: true // Ensure email is unique
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ["member", "manager", "admin"], 
        default: "member" 
    },
    isEnabled: { 
        type: Boolean, 
        default: true 
    }
}, {
    versionKey: false // Disable versioning (__v field)
});

// Create and export the model
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
