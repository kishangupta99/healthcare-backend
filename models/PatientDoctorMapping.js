const mongoose = require('mongoose');

const mappingSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: [true, 'Patient reference is required'],
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: [true, 'Doctor reference is required'],
    },
  },
  { timestamps: true }
);

// Prevent duplicate assignment of the same doctor to the same patient
mappingSchema.index({ patient: 1, doctor: 1 }, { unique: true });

module.exports = mongoose.model('PatientDoctorMapping', mappingSchema);