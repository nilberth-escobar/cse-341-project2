const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students');
const { studentValidationRules, validate } = require('../middleware/validate');

// GET all students
router.get('/', studentsController.getAllStudents);

// GET a single student by id
router.get('/:id', studentsController.getSingleStudent);

// POST a new student with validation
router.post('/', studentValidationRules(), validate, studentsController.createStudent);

// PUT (update) a student by id with validation
router.put('/:id', studentValidationRules(), validate, studentsController.updateStudent);

// DELETE a student by id
router.delete('/:id', studentsController.deleteStudent);

module.exports = router;