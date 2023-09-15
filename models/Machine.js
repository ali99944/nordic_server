const mongoose = require('mongoose')

const machineSchema = mongoose.Schema({
    serial:{
        type: Number,
        required: true
    },
    status:{
      type: Boolean,
      default: true
    },
    qrcode:{
      type: String,
      required: true
    },
    zone:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Zone',
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const machineModel = mongoose.model('machine', machineSchema)

module.exports = machineModel;