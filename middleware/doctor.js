const Doctor = require('../models/Doctor');


module.exports = async (req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    req.user = await Doctor.findById(req.session.user._id);
    next();
};