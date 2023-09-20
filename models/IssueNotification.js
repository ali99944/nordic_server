const mongoose = require('mongoose')

const issueNotificationSchema = new mongoose.Schema({
  date:{
    type: String,
    required: true
  },
  fullDate:{
    type: String,
    required: true
  },
  title:{
    type: String,
    required: true
  },
  body:{
    type: String,
    required: true
  },
  description:{
    type: String,
    default: '',
  }
})

const IssueNotificationModel = mongoose.model('IssueNotification',issueNotificationSchema)
module.exports = IssueNotificationModel