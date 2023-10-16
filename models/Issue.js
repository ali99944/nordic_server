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

    totalTime: {
        type: String,
        default: null
    },

    publisher:{
        type: String,
        default: 'unknown'
    },

    fixedBy:{
        type: String,
        default: null
    },

    processes:{
        type: [String],
        default: []
    },

    boardNumber: {
        type: String,
        default: null
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
        enum: ['complete', 'incomplete', 'waiting','redirected']
    },

    statusText: {
        type: String,
        default: ''
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
    },

    category:{
        type: String,
        required: true
    },

    problem:{
        type: String,
        required: true
    },

    importanceLevel:{
        type: Number,
        required: true
    }
})

const IsseModel = mongoose.model('Issue', IssueSchema)

module.exports = IsseModel