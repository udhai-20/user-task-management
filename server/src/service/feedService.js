const UserFeedModel = require("../model/feedModel");


class FeedService {
    // Create a new task
    async createPost(payload) {
        try {
            const newTask = new UserFeedModel({ ...payload });
            await newTask.save();
            return newTask;
        } catch (err) {
            console.log('err:', err);
            throw new Error('Error creating task');
        }
    }
    async getAllFeeds() {
        try {
            const tasks = await UserFeedModel.find({}).populate("user", "name").sort({ createdAt: -1 });
            if (!tasks) {
                throw new Error('No tasks found');
            }
            return tasks;

        } catch (error) {
            console.log('error:', error);
            if (error.message === 'No tasks found') {
                throw new Error('No tasks found');
            }
            throw new Error('Error fetching all feeds');
        }
    }
}

module.exports = FeedService;