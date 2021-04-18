const mongoose = require('mongoose');
const Assessment = mongoose.model('Assessment');
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
    const assessment = new Assessment();
    assessment.title = req.body.title;
    assessment.content = req.body.content;
    console.log(req.body)

    User.findOne({username: req.body.username}, (err, user) => {

        if (err) { 
            return getErrorMessage(err); 
        }
        req.id = user._id;
        console.log('user._id',req.id);

    }).then( function () 
    {
        assessment.creator = req.id
        console.log('req.user._id',req.id);

        assessment.save((err) => {
            if (err) {
                console.log('error', getErrorMessage(err))

                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(assessment);
            }
        });
    });
};

exports.list = function (req, res) {
    assessment.find().sort('-created').populate('creator', 'firstName lastName fullName').exec((err, assessments) => {
    if (err) {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    } else {
        res.status(200).json(assessments);
    }
});
};

exports.assessmentByID = function (req, res, next, id) {
    assessment.findById(id).populate('creator', 'firstName lastName fullName').exec((err, assessment) => {if (err) return next(err);
    if (!assessment) return next(new Error('Failed to load assessment '
            + id));
        req.assessment = assessment;
        console.log('in assessmentById:', req.assessment)
        next();
    });
};

exports.read = function (req, res) {
    res.status(200).json(req.assessment);
};

exports.update = function (req, res) {
    console.log('in update:', req.assessment)
    const assessment = req.assessment;
    assessment.title = req.body.title;
    assessment.content = req.body.content;
    assessment.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(assessment);
        }
    });
};

exports.delete = function (req, res) {
    const assessment = req.assessment;
    assessment.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(assessment);
        }
    });
};

exports.hasAuthorization = function (req, res, next) {
    console.log('in hasAuthorization - creator: ',req.assessment.creator)
    console.log('in hasAuthorization - user: ',req.id)
 
    if (req.assessment.creator.id !== req.id) {
        return res.status(403).send({
            message: 'User is not authorized.'
        });
    }
    next();
};