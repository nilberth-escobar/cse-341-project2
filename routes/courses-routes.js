const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/courses-controller');
const { courseValidationRules, validate } = require('../middleware/validate');
const isAuthenticated = require('../middleware/authenticate');

// GET all courses
router.get('/', coursesController.getAllCourses);

// GET a single course by id
router.get('/:id', coursesController.getSingleCourse);

// POST a new course with validation
router.post('/', isAuthenticated, courseValidationRules(), validate, coursesController.createCourse);

// PUT (update) a course by id with validation
router.put('/:id', isAuthenticated, courseValidationRules(), validate, coursesController.updateCourse);

// DELETE a course by id
router.delete('/:id', isAuthenticated, coursesController.deleteCourse);

module.exports = router;