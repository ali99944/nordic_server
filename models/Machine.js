const mongoose = require('mongoose')

// Define a function to format timestamps as "YYYY-MM-DD HH-MM"
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

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
    shiftNumber:{
      type: String,
      required: true
    }
  },
  {
    timestamps: {
      currentTime: () => Date.now(),
    },
  }
);

const machineModel = mongoose.model('machine', machineSchema)

module.exports = machineModel;