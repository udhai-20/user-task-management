const express = require('express');
const authMiddleWare = require('../authMiddleware/authMiddleWare');
const FeedController = require('../controller/feedController');
const FeedService = require('../service/feedService');
const multer = require('multer');
const feedController=new FeedController(new FeedService());
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});


class FeedRoutes {    

static routes() {
    const router = express.Router();
    router.post("/",authMiddleWare.auth, upload.single("photo"), feedController.createPost.bind(feedController));
    router.get("/", authMiddleWare.auth, feedController.getFeed.bind(feedController));
    return router;
  }
}
module.exports = FeedRoutes;