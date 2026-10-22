const Patient = require('../models/Patient');

// @desc    Create a patient
// @route   POST /api/patients
// @access  Private
exports.createPatient = async (req, res, next) => {
  try {
    const { name, age, gender, contactInfo, address } = req.body;

    const patient = await Patient.create({
      name,
      age,
      gender,
      contactInfo,
      address,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'Patient created successfully',
      data: patient,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all patients for logged in user
// @route   GET /api/patients
// @access  Private
exports.getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find({ createdBy: req.user._id });
    res.status(200).json({
      success: true,
      count: patients.length,
      data: patients,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get specific patient
// @route   GET /api/patients/:id
// @access  Private
exports.getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found or unauthorized' });
    }

    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update patient
// @route   PUT /api/patients/:id
// @access  Private
exports.updatePatient = async (req, res, next) => {
  try {
    let patient = await Patient.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found or unauthorized' });
    }

    patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Patient updated successfully',
      data: patient,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete patient
// @route   DELETE /api/patients/:id
// @access  Private
exports.deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found or unauthorized' });
    }

    await patient.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Patient deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
