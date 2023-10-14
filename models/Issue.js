const mongoose = require('mongoose')

const IssueSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },

    fixedAt: {
        type: String,
        default: null
    },

    processes:{
        type: [String],
        default: []
    },

    boardNumber: {
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
        default: 'incomplete',
        enum: ['complete', 'incomplete', 'in-maintenance', 'require-parts']
    },

    zone:{
        type: String,
        required: true
    },

    zoneLocation:{
        type: String,
        required: true
    },

    serial:{
        type: String,
        required: true
    }
})

const IsseModel = mongoose.model('Issue', IssueSchema)

module.exports = IsseModel