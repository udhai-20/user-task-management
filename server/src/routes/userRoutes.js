
const express = require('express');
const UserController = require('../controller/userController');
const validateRequest = require('../utils/dtoValidator');
const UserRegisterDTO = require('../dto/userRegister.dto');
const authMiddleWare = require('../authMiddleware/authMiddleWare');
const UserLoginDTO = require('../dto/userLogin.dto');

class UserRoutes{
    static routes(){
        const router=express.Router();
        router.post("/register",(req,res,next)=>{
            const errors = validateRequest(UserRegisterDTO, req.body);
            if (errors) {
                return res.status(400).json({ message: "Validation failed", errors });
            }
            next();
        }, UserController.register);

        router.post("/login",(req,res,next)=>{
            const errors = validateRequest(UserLoginDTO, req.body);
            if (errors) {
                return res.status(400).json({ message: "Validation failed", errors });
            }
             next()
            },UserController.login);
        router.use(authMiddleWare.auth);
        return router;
    }
}

module.exports=UserRoutes;