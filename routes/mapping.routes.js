const express = require('express');
const router = express.Router();
const {
  createMapping,
  getMappings,
  getDoctorsByPatient,
  deleteMapping,
} = require('../controllers/mapping.controller');
const {
  mappingValidator,
  patientParamValidator,
  mappingIdValidator,
} = require('../validators/mapping.validator');
const validate = require('../middleware/validate.middleware');
const { protect } = require('../middleware/auth.middleware');

router.use(protect); // All mapping operations require authentication

router.route('/')
  .post(mappingValidator, validate, createMapping)
  .get(getMappings);

router.get('/:patientId', patientParamValidator, validate, getDoctorsByPatient);
router.delete('/:id', mappingIdValidator, validate, deleteMapping);

module.exports = router;