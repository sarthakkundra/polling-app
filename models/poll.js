const mongoose = require('mongoose');

const User = require('./user');

const optionSchema = mongoose.Schema({
    option: String,
    votes: {
        type: Number,
        default: 0
    }
})

const pollSchema = mongoose.Schema({
    question: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    created: {
        type: Date,
        default: Date.now()
    },

    options: [optionSchema],

    voted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

module.exports = mongoose.model('Poll', pollSchema);