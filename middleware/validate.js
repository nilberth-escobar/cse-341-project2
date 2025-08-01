// middleware/validate.js

const { body, validationResult } = require('express-validator');

const studentValidationRules = () => {
  return [
    // full_name must be a non-empty string
    body('full_name').isString().notEmpty().withMessage('Full name is required and must be a string.'),
    // email must be a valid email
    body('email').isEmail().withMessage('A valid email is required.'),
    // enrollment_date must be a valid date
    body('enrollment_date').isISO8601().toDate().withMessage('Enrollment date must be a valid date.'),
    // gpa must be a number
    body('gpa').isFloat({ min: 0, max: 4.0 }).withMessage('GPA must be a number between 0.0 and 4.0.'),
    // academic_info must be an object with major and current_year
    body('academic_info.major').isString().notEmpty().withMessage('Major is required.'),
    body('academic_info.current_year').isString().notEmpty().withMessage('Current year is required.'),
    // enrolled_courses must be an array of strings
    body('enrolled_courses').isArray().withMessage('Enrolled courses must be an array.'),
    body('enrolled_courses.*').isString().withMessage('Each course must be a string.'),
    // contact_info must be an object with phone and address
    body('contact_info.phone').isString().notEmpty().withMessage('Phone number is required.'),
    body('contact_info.address').isString().notEmpty().withMessage('Address is required.'),
  ];
};

const courseValidationRules = () => {
    return [
      body('course_code').isString().notEmpty().withMessage('Course code is required.'),
      body('course_name').isString().notEmpty().withMessage('Course name is required.'),
      body('course_description').isString().notEmpty().withMessage('Description is required.'),
      body('instructor_name').isString().notEmpty().withMessage('Instructor name is required.'),
      body('department').isString().notEmpty().withMessage('Department is required.'),
      body('semester').isString().notEmpty().withMessage('Semester is required.'),
      body('credits').isInt({ min: 1 }).withMessage('Credits must be a positive integer.'),
    ];
  };

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

  // If validation fails, return a 400 Bad Request with the errors.
  return res.status(400).json({
    errors: extractedErrors,
  });
};

module.exports = {
  studentValidationRules,
  courseValidationRules,
  validate,
};
