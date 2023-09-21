const mongoose = require('mongoose')
const cron = require('node-cron')

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
    // Find all inactive machines
    const inactiveMachines = await Machine.find({ status: 'inactive' });

    if (inactiveMachines.length > 0) {
      // Send notifications to devices here
      // You can use a push notification service like Firebase Cloud Messaging (FCM) or any other service
      // For the sake of this example, we'll use Axios to simulate sending notifications
      await axios.post('your-notification-endpoint', {
        message: 'There are inactive machines. Please check.',
      });

      console.log('Notifications sent.');
    } else {
      console.log('No inactive machines found.');
    }
  } catch (error) {
    console.error('Error sending notifications:', error);
  }
}

// Schedule the task to run every hour
cron.schedule('* * * * * *', () => {
  console.log(new Date());
  // sendNotifications();
});

module.exports = machineModel;