const express = require('express');
const router = express.Router();
const {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} = require('../controllers/doctor.controller');
const { doctorValidator, doctorIdValidator } = require('../validators/doctor.validator');
const validate = require('../middleware/validate.middleware');
const { protect } = require('../middleware/auth.middleware');

router.route('/')
  .get(getDoctors)
  .post(protect, doctorValidator, validate, createDoctor);

router.route('/:id')
  .get(doctorIdValidator, validate, getDoctorById)
  .put(protect, doctorIdValidator, doctorValidator, validate, updateDoctor)
  .delete(protect, doctorIdValidator, validate, deleteDoctor);

module.exports = router;