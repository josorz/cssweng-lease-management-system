const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MaintenanceTasksSchema = new Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Properties',
    },
    date: Date,
    deadline: Date,
    description: String,
    contractor: String,
    status: {
        type: String,
        enum: ['Complete', 'Pending', 'Cancelled'], // i didnt put overdue
        required: true
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: true
    }
}, { virtuals: true, collection: 'MaintenanceTasks' });

module.exports = mongoose.model("MaintenanceTasks", MaintenanceTasksSchema);