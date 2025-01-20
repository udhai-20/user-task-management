
const express = require('express');
const UserController = require('../controller/userController');


class UserRoutes{
    static routes(){
        const router=express.Router();
        router.post("/register",UserController.register);   
        return router;
    }
}

module.exports=UserRoutes;