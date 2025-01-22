const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();


class UserController {
    constructor(userService) {
        this.userService = userService;
    }
     async register(req, res) {
        const { password } = req.body;
        req.body.password = await bcrypt.hash(password, 8);
        return await this.userService.registerUser(req, res);
    }
     async login(req, res) {
        const { email, password } = req.body;
        const user = await this.userService.findUserByEmail(email,res);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        console.log('user:', user);
        const checkPassword = await this.comparePassword(password, user.password);
        console.log('checkPassword:', checkPassword);
        if (!checkPassword) {
            return res.status(400).send({ message: "Invalid email or password" });
        }       
        const payload = {
            id: user._id,
            name: user.name,
            email: user.email
        }
        const token = await this.getSignedToken(payload);
        this.setCookie(res, token);
        return res.status(200).send({ message: "Login successful", user: payload });
    }

    async googleLogin(req, res) {
        
    }

     setCookie(res, accessToken) {
        const cookieOptions = {
            maxAge: process.env.JWT_COOKIE_EXPIRES_IN,
            httpOnly: true,
            sameSite: 'None',
            secure: true

        }
        res.cookie('accessToken', accessToken, cookieOptions);
    }

     async comparePassword(password, savedPassword) {
        return await bcrypt.compare(password, savedPassword);
    }

     async getSignedToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
    }

    // static async logout(req, res) {
    //     return res.status(200).send({ message: "Account created" })
    // }
     async forgotPassword(req, res) {
        const { email } = req.body;
        const user = await this.userService.findUserByEmail(email,res);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const resetToken = await this.createPasswordResetTokenAndSave(user);
        await this.sendPasswordResetEmail(req,res,resetToken, user.email);
        // return res.status(200).send({ message: "Password reset token sent to email" });
    }
    async createPasswordResetTokenAndSave(user) {
        const resetToken = crypto.randomBytes(32).toString('hex');
        // console.log('resetToken:', resetToken)
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        // console.log('hashedToken:', hashedToken);
        user.passwordResetToken = hashedToken;
        user.passwordResetExpires = Date.now() + 10 * 60 * 1000;//10 minutes
        await user.save();
        return resetToken;
    }
     async resetPassword(req, res) {
        const { resetToken } = req.params;
        const { password } = req.body;
        const user = await this.userService.findUserByToken(resetToken,res);
        if (!user) {
            return res.status(400).send({ message: "Token is invalid or has expired" });
        }
        user.password = password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        return res.status(200).send({ message: "Password reset successful" });
    }
    async sendPasswordResetEmail(req,res,resetToken, email) {
        const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
        const message = `Forgot your password?Please Follow the link it,s valid Up to 10 mints. New password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
        try {
            await this.sendEmail({
                email: email,
                subject: 'Your password reset token (valid for 10 min)',
                message
            },res);
            return res.status(200).send({ message: "Token sent to email" });
        } catch (err) {
            console.log(err);
            //  res.status(500).send({ message: "Internal server error" });
        }
    }

    async sendEmail(options,res) {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587, 
            secure: false, 
            auth: {
                user: process.env.EMAIL_USERNAME, 
                pass: process.env.EMAIL_PASSWORD 
            }
    
        });
        const mailOptions = {
            from:  '"hey👻" <abc@gmail.com>',
            to: options.email,
            subject: options.subject,
            text: options.message
        };
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log("Email sent successfully!");
            console.log("Message ID:", info.messageId);
        } catch (error) {
            res.status(500).send({ message: "Internal server error" });
            console.error("Error sending email:", error);
        }
    }

    async resetPassword(req, res) {
        try {
            const { resetToken } = req.params;
            const { password } = req.body;
            const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
            // console.log('hashedToken:', hashedToken);    
            const user = await this.userService.findUserByToken(hashedToken);            
            if (!user) {
                return res.status(400).json({ message: "Invalid or expired token" });
            }    
            const passwordHash = await bcrypt.hash(password, 8);//hash the password            
            user.password = passwordHash;
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;    
            await user.save();    
            return res.status(200).json({ message: "Password reset successful" });
        } catch (err) {
            console.error("Error resetting password:", err);
            return res.status(500).json({ message: err.message || "Internal server error" });
        }
    }


    // static async changePassword(req, res) {
    //     return res.status(200).send({ message: "Account created" })
    // }
    // static async verifyEmail(req, res) {
    //     return res.status(200).send({ message: "Account created" })
    // }

    // static async resendVerificationEmail(req, res) {
    //     return res.status(200).send({ message: "Account created" })
    // }

}

module.exports = UserController;