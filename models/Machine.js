const mongoose = require('mongoose')
const cron = require('node-cron')
const admin = require('../utils/firebase');


const machineSchema = mongoose.Schema({
    serial:{
        type: Number,
        required: true
    },
    status:{
      type: String,
      default: 'active'
    },
    qrcode:{
      type: String,
      default: null
    },
    zone:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Zone',
      required: true
    },
    zoneLocation:{
      type: String,
      required: true
    },
    shiftNumber:{
      type: String,
      required: true
    }
  }
);

const machineModel = mongoose.model('machine', machineSchema)

// Define a function to send notifications
async function sendNotifications() {
  try {
    const message = {
      data: {
          title: 'Notifications',
          body: 'Notification body',
          type: 'issue_closed',
      },
      topic: 'nordic', // Replace with the topic you want to use
    };
    
    let response = await admin
      .messaging()
      .send(message)
  } catch (error) {
    console.error('Error sending notifications:', error);
  }
}

// // Schedule the task to run every hour
// cron.schedule('* * * * * *', () => {
//   console.log(new Date());
//   sendNotifications();
// });

module.exports = machineModel;