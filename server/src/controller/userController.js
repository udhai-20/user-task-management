const UserService = require("../service/userService");
const bcrypt = require('bcrypt');


class UserController {
    static async register(req, res) {
        const {  password } = req.body;
        req.body.password = await bcrypt.hash(password, 8);
        return await UserService.registerUser(req, res);

    }
    static async login(req, res) {
        const { email, password } = req.body;
        const checkPassword = await this.comparePassword(password, user.password);
        if (!checkPassword) {
            return res.status(400).send({ message: "Invalid email or password" });
        }
        const user = await UserService.findUserByEmail(email);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
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

    static setCookie(res, accessToken) {
        const cookieOptions = {
            maxAge: process.env.JWT_COOKIE_EXPIRES_IN,
            httpOnly: true,
            sameSite: 'None',
            secure: true

        }
        res.cookie('accessToken', accessToken, cookieOptions);
    }

    static async comparePassword(password, savedPassword) {
        return await bcrypt.compare(password, savedPassword);
    }

    static async getSignedToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
    }

    static async logout(req, res) {
        return res.status(200).send({ message: "Account created" })
    }
    static async forgotPassword(req, res) {
        return res.status(200).send({ message: "Account created" })
    }
    static async resetPassword(req, res) {
        return res.status(200).send({ message: "Account created" })
    }

    static async changePassword(req, res) {
        return res.status(200).send({ message: "Account created" })
    }
    static async verifyEmail(req, res) {
        return res.status(200).send({ message: "Account created" })
    }

    static async resendVerificationEmail(req, res) {
        return res.status(200).send({ message: "Account created" })
    }


}
module.exports = UserController;