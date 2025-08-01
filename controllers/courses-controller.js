const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all courses
const getAllCourses = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('courses').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single course by ID
const getSingleCourse = async (req, res) => {
  try {
    const courseId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('courses').find({ _id: courseId });
    const lists = await result.toArray();
    if (lists.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST (create) a new course
const createCourse = async (req, res) => {
  try {
    const course = {
      course_code: req.body.course_code,
      course_name: req.body.course_name,
      course_description: req.body.course_description,
      instructor_name: req.body.instructor_name,
      department: req.body.department,
      semester: req.body.semester,
      credits: req.body.credits,
      assignments: req.body.assignments || [] // Optional field
    };
    const response = await mongodb.getDb().db().collection('courses').insertOne(course);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the course.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT (update) a course by ID
const updateCourse = async (req, res) => {
  try {
    const courseId = new ObjectId(req.params.id);
    const course = {
        course_code: req.body.course_code,
        course_name: req.body.course_name,
        course_description: req.body.course_description,
        instructor_name: req.body.instructor_name,
        department: req.body.department,
        semester: req.body.semester,
        credits: req.body.credits,
        assignments: req.body.assignments || []
    };
    const response = await mongodb.getDb().db().collection('courses').replaceOne({ _id: courseId }, course);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Course not found or no changes made' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE a course by ID
const deleteCourse = async (req, res) => {
  try {
    const courseId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('courses').deleteOne({ _id: courseId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  getAllCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse
};