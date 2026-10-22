const { body, param } = require('express-validator');

exports.patientValidator = [
  body('name').notEmpty().withMessage('Patient name is required').trim(),
  body('age').isInt({ min: 0, max: 150 }).withMessage('Valid age between 0 and 150 is required'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other'),
  body('contactInfo').notEmpty().withMessage('Contact info is required').trim(),
  body('address').notEmpty().withMessage('Address is required').trim(),
];

exports.patientIdValidator = [
  param('id').isMongoId().withMessage('Invalid patient ID format'),
];