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

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    notes:{
        type: String,
        default: null
    },

    status: {
        type: String,
        default: 'incomplete'
    },
})