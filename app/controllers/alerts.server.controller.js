const mongoose = require('mongoose');
const Alert = mongoose.model('Alert');
const User = require('mongoose').model('User');

function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error.';
    }
};

exports.create = function (req, res) {
    const alert = new Alert();
    alert.title = req.body.title;
    alert.content = req.body.content;
    console.log(req.body)

    User.findOne({username: req.body.username}, (err, user) => {

        if (err) { 
            return getErrorMessage(err); 
        }
        req.id = user._id;
        console.log('user._id',req.id);

    }).then( function () 
    {
        alert.creator = req.id
        console.log('req.user._id',req.id);

        alert.save((err) => {
            if (err) {
                console.log('error', getErrorMessage(err))

                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(alert);
            }
        });
    });
};

exports.list = function (req, res) {
    alert.find().sort('-created').populate('creator', 'firstName lastName fullName').exec((err, alerts) => {
    if (err) {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    } else {
        res.status(200).json(alerts);
    }
});
};

exports.alertByID = function (req, res, next, id) {
    alert.findById(id).populate('creator', 'firstName lastName fullName').exec((err, alert) => {if (err) return next(err);
    if (!alert) return next(new Error('Failed to load alert '
            + id));
        req.alert = alert;
        console.log('in alertById:', req.alert)
        next();
    });
};

exports.read = function (req, res) {
    res.status(200).json(req.alert);
};

exports.update = function (req, res) {
    console.log('in update:', req.alert)
    const alert = req.alert;
    alert.title = req.body.title;
    alert.content = req.body.content;
    alert.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(alert);
        }
    });
};

exports.delete = function (req, res) {
    const alert = req.alert;
    alert.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(alert);
        }
    });
};

exports.hasAuthorization = function (req, res, next) {
    console.log('in hasAuthorization - creator: ',req.alert.creator)
    console.log('in hasAuthorization - user: ',req.id)
 
    if (req.alert.creator.id !== req.id) {
        return res.status(403).send({
            message: 'User is not authorized.'
        });
    }
    next();
};