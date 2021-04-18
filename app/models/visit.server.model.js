const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VisitSchema = new Schema({
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
    reason: {
        type: String, default: '',
        trim: true
    },
    notes: {
        type: String, default: '',
        trim: true
    }
});
mongoose.model('Visit', VisitSchema);