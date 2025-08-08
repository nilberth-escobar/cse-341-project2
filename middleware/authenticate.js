const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
    return res.status(401).json("You dont have permission to access this resource","Please login first");
    }
    next();
};

module.exports = isAuthenticated;
