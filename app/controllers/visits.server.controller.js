const mongoose = require('mongoose');
const Visit = mongoose.model('Visit');
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
    const visit = new Visit();
    visit.title = req.body.title;
    visit.content = req.body.content;
    console.log(req.body)

    User.findOne({username: req.body.username}, (err, user) => {

        if (err) { 
            return getErrorMessage(err); 
        }
        req.id = user._id;
        console.log('user._id',req.id);

    }).then( function () 
    {
        visit.creator = req.id
        console.log('req.user._id',req.id);

        visit.save((err) => {
            if (err) {
                console.log('error', getErrorMessage(err))

                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(visit);
            }
        });
    });
};

exports.list = function (req, res) {
    visit.find().sort('-created').populate('creator', 'firstName lastName fullName').exec((err, visits) => {
    if (err) {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    } else {
        res.status(200).json(visits);
    }
});
};

exports.visitByID = function (req, res, next, id) {
    visit.findById(id).populate('creator', 'firstName lastName fullName').exec((err, visit) => {if (err) return next(err);
    if (!visit) return next(new Error('Failed to load visit '
            + id));
        req.visit = visit;
        console.log('in visitById:', req.visit)
        next();
    });
};

exports.read = function (req, res) {
    res.status(200).json(req.visit);
};

exports.update = function (req, res) {
    console.log('in update:', req.visit)
    const visit = req.visit;
    visit.title = req.body.title;
    visit.content = req.body.content;
    visit.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(visit);
        }
    });
};

exports.delete = function (req, res) {
    const visit = req.visit;
    visit.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(visit);
        }
    });
};

exports.hasAuthorization = function (req, res, next) {
    console.log('in hasAuthorization - creator: ',req.visit.creator)
    console.log('in hasAuthorization - user: ',req.id)
 
    if (req.visit.creator.id !== req.id) {
        return res.status(403).send({
            message: 'User is not authorized.'
        });
    }
    next();
};