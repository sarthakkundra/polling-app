const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    created: {
        type: Date,
        default: Date.now()
    },

    polls: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poll'
    }]
})

module.exports = mongoose.model('User', userSchema);