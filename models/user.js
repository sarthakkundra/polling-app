const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
        default: Date.now
    },

    polls: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poll'
    }]
})

userSchema.pre('save', async function(next) {

    try {
        if(this.isModified('password')){
            this.password = await bcrypt.hash(this.password, 8);
        }
    
        return next();    
    } catch (e) {
        next(e);
    }
    
})

userSchema.methods.comparePassword = async function(attempt, next){

    try {
        const valid = await bcrypt.compare(attempt, this.password);
        return valid;

    } catch (e) {
        next(e);
    }
}
module.exports = mongoose.model('User', userSchema);