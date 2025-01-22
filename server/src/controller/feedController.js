const multer = require('multer');
const cloudinary = require('../utils/cloudinary');
const { ObjectId } = require('mongodb');

class FeedController {
  constructor(feedService) {
    this.feedService =feedService;
  }


  async createPost(req, res) {
    console.log('req:', req.user);
   try {
    const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }).end(req.file.buffer);
      });
      const imageUrl = result.secure_url;
      const caption = req.body.caption;
        const userId = req.user.id;
        // console.log('photoUrl:', photoUrl,caption);
        const payload={
            user:new ObjectId(userId),
            caption,
            imageUrl
        }
        const post = await this.feedService.createPost(payload);
        res.status(201).json(post);    
   } catch (error) {
    console.log('error:', error);
        res.status(500).json({ message: error.message });
    
   }


  }

  async getFeed(req, res) {
    try {
      const feed = await this.feedService.getAllFeeds();
      res.json(feed);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = FeedController;