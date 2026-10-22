const express = require('express');
const router = express.Router();
const {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} = require('../controllers/patient.controller');
const { patientValidator, patientIdValidator } = require('../validators/patient.validator');
const validate = require('../middleware/validate.middleware');
const { protect } = require('../middleware/auth.middleware');

router.use(protect); // All patient routes require authentication

router.route('/')
  .post(patientValidator, validate, createPatient)
  .get(getPatients);

router.route('/:id')
  .get(patientIdValidator, validate, getPatientById)
  .put(patientIdValidator, patientValidator, validate, updatePatient)
  .delete(patientIdValidator, validate, deletePatient);

module.exports = router;