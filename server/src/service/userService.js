const e = require("express");
const UserModel = require("../model/userModel");
const crypto = require('crypto');

class UserService {
    async registerUser(req, res) {
        try {
            const { name, email, password } = req.body;
            const result = await UserModel.create({ name, email, password });
            const response = {
                name: result.name,
                email: result.email
            }
            return res.status(200).send({ message: "Account created", user: response });

        } catch (err) {
            if (err.code === 11000) {
                return res.status(400).send({ message: "Email already exists" });
            } else {

                return res.status(500).send({ message: "Internal server error" });
            }
        }
    }
    async findUserByEmail(email, res) {
        try {
            const user = await UserModel.findOne({ email: email });
            console.log('user:------', user);
            return user;
        } catch (err) {
            return res.status(500).send({ message: "Internal server error" });
        }
    }

    async findbyUserIdAndUpdate(userId, update,res) {
        try {
            const user = await UserModel.findByIdAndUpdate(userId, {...update}, { new: true });
            if(!user){
                return res.status(404).send({ message: "User not found" });
            }
            return user;
        }
        catch (err) {
            return res.status(500).send({ message: "Internal server error" });
        }   
    }
    async findUserByToken(hashedToken) {
        try {
            const user = await UserModel.findOne({
                passwordResetToken: hashedToken,
                passwordResetExpires: { $gt: Date.now() },
            });
            if (!user) {
                throw new Error("Invalid token, please try again");
            }
            return user;
        } catch (err) {
            if(err.message){
                throw new Error(err.message);
            }
            throw new Error("Internal server Error, please try again");
        }
    }
   





}

module.exports = UserService;