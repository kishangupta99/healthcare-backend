const { body, param } = require('express-validator');

exports.mappingValidator = [
  body('patient').isMongoId().withMessage('Valid patient ID is required'),
  body('doctor').isMongoId().withMessage('Valid doctor ID is required'),
];

exports.patientParamValidator = [
  param('patientId').isMongoId().withMessage('Valid patient ID format is required'),
];

exports.mappingIdValidator = [
  param('id').isMongoId().withMessage('Invalid mapping ID format'),
];