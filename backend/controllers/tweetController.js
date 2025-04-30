// controllers/tweetController.js
import TweetHistory from '../models/TweetHistory.js';

export const generateTweet = async (req, res) => {
  const { originalPrompt, enhancedTweet } = req.body;

  try {
    const newTweet = new TweetHistory({
      user: req.userId,
      originalPrompt,
      enhancedTweet,
    });

    await newTweet.save();

    res.status(201).json({ message: 'Tweet saved', tweet: newTweet });
  } catch (error) {
    console.error('Error saving tweet:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserTweets = async (req, res) => {
  try {
    const tweets = await TweetHistory.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(tweets);
  } catch (error) {
    console.error('Error fetching tweets:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
