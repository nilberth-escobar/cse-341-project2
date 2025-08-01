const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all students
const getAllStudents = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('students').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single student by ID
const getSingleStudent = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('students').find({ _id: userId });
    const lists = await result.toArray();
    if (lists.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST (create) a new student
const createStudent = async (req, res) => {
  try {
    const student = {
      full_name: req.body.full_name,
      email: req.body.email,
      enrollment_date: req.body.enrollment_date,
      gpa: req.body.gpa,
      academic_info: req.body.academic_info,
      enrolled_courses: req.body.enrolled_courses,
      contact_info: req.body.contact_info
    };
    const response = await mongodb.getDb().db().collection('students').insertOne(student);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the student.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT (update) a student by ID
const updateStudent = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const student = {
      full_name: req.body.full_name,
      email: req.body.email,
      enrollment_date: req.body.enrollment_date,
      gpa: req.body.gpa,
      academic_info: req.body.academic_info,
      enrolled_courses: req.body.enrolled_courses,
      contact_info: req.body.contact_info
    };
    const response = await mongodb.getDb().db().collection('students').replaceOne({ _id: userId }, student);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Student not found or no changes made' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE a student by ID
const deleteStudent = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('students').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  getAllStudents,
  getSingleStudent,
  createStudent,
  updateStudent,
  deleteStudent
};