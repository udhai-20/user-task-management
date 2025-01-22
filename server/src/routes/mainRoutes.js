const express = require('express');
const UserRoutes = require('./userRoutes');
const TaskRoutes = require('./tasksRoutes');
const FeedRoutes = require('./feedRoutes');
// const FeedRoutes = require('./feedRoutes');


class MainRoutes{
    static init() {
        const router = express.Router();
        router.use('/user', UserRoutes.routes());
        router.use('/task', TaskRoutes.routes());
        router.use('/feed', FeedRoutes.routes());

        
        

        return router;
    }
}

module.exports = MainRoutes;