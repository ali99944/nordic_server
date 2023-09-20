const mongoose = require('mongoose')

const IssueSchema = new mongoose.Schema({
    machine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Machine'
    },

    date: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: 'incomplete'
    },
})