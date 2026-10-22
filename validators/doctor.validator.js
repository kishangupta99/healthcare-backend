const { body, param } = require('express-validator');

exports.doctorValidator = [
  body('name').notEmpty().withMessage('Doctor name is required').trim(),
  body('specialization').notEmpty().withMessage('Specialization is required').trim(),
  body('contactInfo').notEmpty().withMessage('Contact info is required').trim(),
];

exports.doctorIdValidator = [
  param('id').isMongoId().withMessage('Invalid doctor ID format'),
];