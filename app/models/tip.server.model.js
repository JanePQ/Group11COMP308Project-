const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TipSchema = new Schema({
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
    }
});
mongoose.model('Tip', TipSchema);