const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function(req, res, next) {
    req.logout(function(err){
        if (err) { return next(err); }
        res.redirect('/');
    });
});



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
