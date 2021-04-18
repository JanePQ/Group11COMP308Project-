const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AssessmentSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    practitioner: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    patient: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank.'
    },
    content: {
        type: String, default: '',
        trim: true
    },
    bloodPressure: {
        type: Number,
        trim: true
    },
    pulse: {
        type: Number,
        trim: true
    },
    temperature: {
        type: Number,
        trim: true
    },
    respiration: {
        type: Number,
        trim: true
    },
    height: {
        type: Number,
        trim: true
    },
    weight: {
        type: Number,
        trim: true
    }
});
mongoose.model('Assessment', AssessmentSchema);