const mongoose = require('mongoose');
const Tip = mongoose.model('Tip');
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
    const tip = new Tip();
    tip.title = req.body.title;
    tip.content = req.body.content;
    console.log(req.body)

    User.findOne({username: req.body.username}, (err, user) => {

        if (err) { 
            return getErrorMessage(err); 
        }
        req.id = user._id;
        console.log('user._id',req.id);

    }).then( function () 
    {
        tip.creator = req.id
        console.log('req.user._id',req.id);

        tip.save((err) => {
            if (err) {
                console.log('error', getErrorMessage(err))

                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(tip);
            }
        });
    });
};

exports.list = function (req, res) {
    tip.find().sort('-created').populate('creator', 'firstName lastName fullName').exec((err, tips) => {
    if (err) {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    } else {
        res.status(200).json(tips);
    }
});
};

exports.tipByID = function (req, res, next, id) {
    tip.findById(id).populate('creator', 'firstName lastName fullName').exec((err, tip) => {if (err) return next(err);
    if (!tip) return next(new Error('Failed to load tip '
            + id));
        req.tip = tip;
        console.log('in tipById:', req.tip)
        next();
    });
};

exports.read = function (req, res) {
    res.status(200).json(req.tip);
};

exports.update = function (req, res) {
    console.log('in update:', req.tip)
    const tip = req.tip;
    tip.title = req.body.title;
    tip.content = req.body.content;
    tip.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(tip);
        }
    });
};

exports.delete = function (req, res) {
    const tip = req.tip;
    tip.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(tip);
        }
    });
};

exports.hasAuthorization = function (req, res, next) {
    console.log('in hasAuthorization - creator: ',req.tip.creator)
    console.log('in hasAuthorization - user: ',req.id)
 
    if (req.tip.creator.id !== req.id) {
        return res.status(403).send({
            message: 'User is not authorized.'
        });
    }
    next();
};