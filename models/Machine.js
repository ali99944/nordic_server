const mongoose = require('mongoose')

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
    timestamps: true,
  }
);

const machineModel = mongoose.model('machine', machineSchema)

module.exports = machineModel;