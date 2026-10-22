const PatientDoctorMapping = require('../models/PatientDoctorMapping');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

// @desc    Assign a doctor to a patient
// @route   POST /api/mappings
// @access  Private
exports.createMapping = async (req, res, next) => {
  try {
    const { patient: patientId, doctor: doctorId } = req.body;

    // Verify patient exists and belongs to the authenticated user
    const patient = await Patient.findOne({
      _id: patientId,
      createdBy: req.user._id,
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found or unauthorized access to this patient',
      });
    }

    // Verify doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    // Check for existing mapping conflict
    const existingMapping = await PatientDoctorMapping.findOne({
      patient: patientId,
      doctor: doctorId,
    });

    if (existingMapping) {
      return res.status(409).json({
        success: false,
        message: 'This doctor is already assigned to this patient',
      });
    }

    const mapping = await PatientDoctorMapping.create({
      patient: patientId,
      doctor: doctorId,
    });

    const populatedMapping = await PatientDoctorMapping.findById(mapping._id)
      .populate('patient', 'name age gender contactInfo address')
      .populate('doctor', 'name specialization contactInfo');

    res.status(201).json({
      success: true,
      message: 'Doctor assigned to patient successfully',
      data: populatedMapping,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Retrieve all mappings belonging to patients owned by the user
// @route   GET /api/mappings
// @access  Private
exports.getMappings = async (req, res, next) => {
  try {
    // Find all patient IDs owned by the authenticated user
    const userPatients = await Patient.find({ createdBy: req.user._id }).select('_id');
    const patientIds = userPatients.map(p => p._id);

    const mappings = await PatientDoctorMapping.find({ patient: { $in: patientIds } })
      .populate('patient', 'name age gender contactInfo address')
      .populate('doctor', 'name specialization contactInfo');

    res.status(200).json({
      success: true,
      count: mappings.length,
      data: mappings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all doctors assigned to a specific patient
// @route   GET /api/mappings/:patientId
// @access  Private
exports.getDoctorsByPatient = async (req, res, next) => {
  try {
    const { patientId } = req.params;

    // Verify patient ownership
    const patient = await Patient.findOne({
      _id: patientId,
      createdBy: req.user._id,
    });

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found or unauthorized' });
    }

    const mappings = await PatientDoctorMapping.find({ patient: patientId })
      .populate('doctor', 'name specialization contactInfo');

    res.status(200).json({
      success: true,
      patient,
      count: mappings.length,
      doctors: mappings.map(m => m.doctor),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove a doctor assignment
// @route   DELETE /api/mappings/:id
// @access  Private
exports.deleteMapping = async (req, res, next) => {
  try {
    const mapping = await PatientDoctorMapping.findById(req.params.id);

    if (!mapping) {
      return res.status(404).json({ success: false, message: 'Mapping not found' });
    }

    // Verify patient ownership
    const patient = await Patient.findOne({
      _id: mapping.patient,
      createdBy: req.user._id,
    });

    if (!patient) {
      return res.status(403).json({ success: false, message: 'Unauthorized to delete this mapping' });
    }

    await mapping.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Patient-doctor mapping removed successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};