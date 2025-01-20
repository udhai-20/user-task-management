const express = require('express');
const UserRoutes = require('./userRoutes');


class MainRoutes{
    static init() {
        const router = express.Router();
        router.use('/user', UserRoutes.routes());

        return router;
    }
}

module.exports = MainRoutes;