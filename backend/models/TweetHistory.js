// models/TweetHistory.js
import mongoose from 'mongoose';

const tweetHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    originalPrompt: {
      type: String,
      required: true,
    },
    enhancedTweet: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TweetHistory = mongoose.model('TweetHistory', tweetHistorySchema);
export default TweetHistory;
