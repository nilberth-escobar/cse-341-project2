const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.send('API for mananaging students and courses.');
});

// Route to serve Swagger UI documentation
router.use("/api-docs", require("./swagger"));

// Routes for the 'students' collection
router.use("/students", require("./students-routes"));

// Routes for the 'courses' collection
router.use("/courses", require("./courses-routes"));

module.exports = router;
