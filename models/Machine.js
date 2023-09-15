const mongoose = require('mongoose')

const machineSchema = mongoose.Schema({
    number:{
        type: Number,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

const machineModel = mongoose.model('machine', machineSchema)

module.exports = machineModel;