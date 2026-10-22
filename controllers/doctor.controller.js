const Doctor = require('../models/Doctor');



exports.createDoctor = async (req, res, next) => {
  try {
    const { name, specialization, contactInfo } = req.body;

    const doctor = await Doctor.create({
      name,
      specialization,
      contactInfo,
    });

    res.status(201).json({
      success: true,
      message: 'Doctor created successfully',
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};





exports.getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    next(error);
  }
};






exports.getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};






exports.updateDoctor = async (req, res, next) => {
  try {
    let doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Doctor updated successfully',
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};





exports.deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    await doctor.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Doctor deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
