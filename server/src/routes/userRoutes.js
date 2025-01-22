
const express = require('express');
const UserController = require('../controller/userController');
const validateRequest = require('../utils/dtoValidator');
const UserRegisterDTO = require('../dto/userRegister.dto');
const authMiddleWare = require('../authMiddleware/authMiddleWare');
const UserLoginDTO = require('../dto/userLogin.dto');
const UserService = require('../service/userService');
const UserFrgetPaswdDTO = require('../dto/userFrgetPaswd.dto');
const UserRestPaswdDTO = require('../dto/userRestPaswd.dto');
const passport = require('passport');

// Create the instance of the controller
const userController = new UserController(new UserService());
class UserRoutes{

    static routes(){
        const router=express.Router();
        router.get('/google', passport.authenticate('google', {
            scope: ['profile', 'email']
        }));
        router.get('/google/callback',
            passport.authenticate('google', { failureRedirect: '/' }),
            async (req, res) => {
                const { email, name } = req.user;           
                const payload = {
                    id: req.user._id,
                    name,
                    email
                };
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
          
                // Set the JWT token in a cookie
                res.cookie('accessToken', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', 
                    sameSite: 'None'
                });          
                // Redirect the user to the dashboard or main page after authentication
                res.redirect('/dashboard');
                // need to update clientUr
            });
        router.post("/register",(req,res,next)=>{
            const errors = validateRequest(UserRegisterDTO, req.body);
            if (errors) {
                return res.status(400).json({ message: "Validation failed", errors });
            }
            next();
        }, userController.register.bind(userController));

        router.post("/login",(req,res,next)=>{
            const errors = validateRequest(UserLoginDTO, req.body);
            if (errors) {
                return res.status(400).json({ message: "Validation failed", errors });
            }
             next()
            },userController.login.bind(userController));
            router.post("/forgetpassword",(req,res,next)=>{
                const errors = validateRequest(UserFrgetPaswdDTO, req.body);
                if (errors) {
                    return res.status(400).json({ message: "Validation failed", errors });
                }
                 next()
                }
                ,userController.forgotPassword.bind(userController));

                router.put("/reset-password/:resetToken",(req,res,next)=>{
                    const errors = validateRequest(UserRestPaswdDTO, req.body);
                    const paramsCheck=validateRequest({resetToken:{type:"string",required:true}},req.params);
                    console.log('paramsCheck:', paramsCheck);
                    if (errors || paramsCheck) {
                        return res.status(400).json({ message: "Validation failed", errors });
                    }
                     next()
                    }
                    ,userController.resetPassword.bind(userController));

        router.use(authMiddleWare.auth);

        router.post("/resetPassword",userController.forgotPassword.bind(userController));
        return router;
    }
}

module.exports=UserRoutes;