const UserModel = require("../model/userModel");

class UserService {
    // constructor() {
    //     this.userModel = UserModel
    // }
    static async registerUser(req, res) {
        try {
            // console.log('req:', req);
            const { name, email, password } = req.body;
            const user = await UserModel.findOneAndUpdate({ email: email }, { $setOnInsert: { name, email, password } }, { upsert: true, new: true });
            if(user){
                return res.status(400).send({ message: "User already exists" });
            }
            const response={
                name:user.name,
                email:user.email
            }
            return res.status(200).send({ message: "Account created",user:response });

        } catch (err) {
            console.log('err:', err);
            return res.status(500).send({ message: "Internal server error" });
        }
    }
    static async findUserByEmail(email) {
        try {
            const user = await this.userModel.findOne({ email: email });
            return user;
        } catch (err) {
            return res.status(500).send({ message: "Internal server error" });
        }
    }
}

module.exports = UserService;