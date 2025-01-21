
const mongoose = require('mongoose');

const crypto = require('crypto');
const { Schema } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

},
    { timestamps: true });




const UserModel = mongoose.model('User', userSchema);


module.exports = UserModel;