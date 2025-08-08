const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students');
const { studentValidationRules, validate } = require('../middleware/validate');
const isAuthenticated = require('../middleware/authenticate');

// GET all students
router.get('/', studentsController.getAllStudents);

// GET a single student by id
router.get('/:id', studentsController.getSingleStudent);

// POST a new student with validation
router.post('/', isAuthenticated, studentValidationRules(), validate, studentsController.createStudent);

// PUT (update) a student by id with validation
router.put('/:id', isAuthenticated, studentValidationRules(), validate, studentsController.updateStudent);

// DELETE a student by id
router.delete('/:id', isAuthenticated, studentsController.deleteStudent);

module.exports = router;