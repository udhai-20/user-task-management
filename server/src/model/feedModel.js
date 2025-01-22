const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  caption: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const UserFeedModel = mongoose.model('Post', postSchema);
UserFeedModel.createIndexes({user: 1, createdAt: -1});

module.exports = UserFeedModel;
