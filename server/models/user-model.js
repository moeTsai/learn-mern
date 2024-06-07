
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['student', 'instructor'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})

userSchema.methods.isStudent = function() {
    return this.role === 'student';
}

userSchema.methods.isInstructor = function() {
    return this.role === 'instructor';
}

userSchema.methods.comparePassword = async function(candidatePassword, cb) {

    let result

    try{
        result = await bcrypt.compare(candidatePassword, this.password);
        return cb(null, result);
    }
    catch(e){
        return cb(e, result);
    }
}

// mongoose middleware
userSchema.pre('save', async function(next) {
    const user = this;
    if(user.isNew || user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
})

module.exports = mongoose.model('User', userSchema);