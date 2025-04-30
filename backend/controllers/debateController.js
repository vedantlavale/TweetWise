// controllers/debateController.js
import DebateHistory from '../models/DebateHistory.js';

export const generateDebate = async (req, res) => {
  const { topic, stance, counterArgument } = req.body;

  try {
    // Store the generated debate linked to the logged-in user
    const newDebate = new DebateHistory({
      user: req.userId, // req.userId will come from authMiddleware
      topic,
      stance,
      counterArgument,
    });

    await newDebate.save();

    res.status(201).json({ message: 'Debate saved', debate: newDebate });
  } catch (error) {
    console.error('Error saving debate:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserDebates = async (req, res) => {
  try {
    const debates = await DebateHistory.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(debates);
  } catch (error) {
    console.error('Error fetching debates:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
