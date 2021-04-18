const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AlertSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    responder: {
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
    status: {
        type: String, default: '',
        trim: true
    }
});
mongoose.model('Alert', AlertSchema);