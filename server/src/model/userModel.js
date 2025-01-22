
const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        index: true,
        required: true,
        unique: true,
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
UserModel.createIndexes({ email: 1,unique:true });
module.exports = UserModel;