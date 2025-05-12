import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['tweet', 'debate'],
      required: true
    },
    // For tweet generation
    tweetPrompt: {
      type: String,
      required: function() { return this.type === 'tweet'; }
    },
    tweetStyle: {
      type: String,
      enum: ['professional', 'casual', 'funny', 'inspirational', 'provocative'],
      required: function() { return this.type === 'tweet'; }
    },
    generatedTweet: {
      type: String,
      required: function() { return this.type === 'tweet'; }
    },
    // For debate generation
    debateTopic: {
      type: String,
      required: function() { return this.type === 'debate'; }
    },
    debateFormat: {
      type: String,
      enum: ['formal', 'academic', 'casual', 'humorous'],
      required: function() { return this.type === 'debate'; }
    },
    generatedDebate: {
      type: String,
      required: function() { return this.type === 'debate'; }
    },
    // Common fields
    title: {
      type: String,
      default: function() {
        if (this.type === 'tweet') {
          return `Tweet: ${this.tweetPrompt?.substring(0, 30)}...`;
        } else {
          return `Debate: ${this.debateTopic?.substring(0, 30)}...`;
        }
      }
    }
  },
  { timestamps: true }
);

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;