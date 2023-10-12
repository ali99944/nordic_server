const mongoose = require('mongoose');

const IssueTopicSchema = new mongoose.Schema({
    category:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    name:{
        type: String,
        required: true
    }
})

const IssueTopicModel = mongoose.model('IssueTopic', IssueTopicSchema)

module.exports = IssueTopicModel