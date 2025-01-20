
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

userSchema.pre('save', async function (next) {
    const user = this;
    console.log('user:', user);
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.methods.matchPassword = async function (password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
}

userSchema.methods.getSignedToken = function () {
    return crypto.randomBytes(20).toString('hex');
};

userSchema.methods.createPaswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; //10 minutes
    return resetToken;
};







const UserModel = mongoose.model('User', userSchema);


module.exports = UserModel;