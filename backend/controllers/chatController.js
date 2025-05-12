import Chat from '../models/Chat.js';

// Create a new chat
export const createChat = async (req, res) => {
  try {
    const { title } = req.body;
    const chat = new Chat({
      userId: req.user._id,
      title: title || 'New Chat',
      messages: []
    });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    console.error('Create chat error:', error);
    res.status(500).json({ message: 'Error creating chat' });
  }
};

// Get all chats for a user
export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user._id })
      .select('title messages createdAt')
      .sort({ updatedAt: -1 });
    res.status(200).json(chats);
  } catch (error) {
    console.error('Get chats error:', error);
    res.status(500).json({ message: 'Error fetching chats' });
  }
};

// Add a message to a chat
export const addMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { role, content } = req.body;

    const chat = await Chat.findOne({ _id: chatId, userId: req.user._id });
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    chat.messages.push({ role, content });
    await chat.save();
    res.status(200).json(chat);
  } catch (error) {
    console.error('Add message error:', error);
    res.status(500).json({ message: 'Error adding message' });
  }
};

// Delete a chat
export const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findOneAndDelete({ _id: chatId, userId: req.user._id });
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    res.status(200).json({ message: 'Chat deleted successfully' });
  } catch (error) {
    console.error('Delete chat error:', error);
    res.status(500).json({ message: 'Error deleting chat' });
  }
};

// Create a new tweet generation history
export const createTweetHistory = async (req, res) => {
  try {
    const { tweetPrompt, tweetStyle, generatedTweet } = req.body;
    const chat = new Chat({
      userId: req.user._id,
      type: 'tweet',
      tweetPrompt,
      tweetStyle,
      generatedTweet
    });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    console.error('Create tweet history error:', error);
    res.status(500).json({ message: 'Error creating tweet history' });
  }
};

// Create a new debate generation history
export const createDebateHistory = async (req, res) => {
  try {
    const { debateTopic, debateFormat, generatedDebate } = req.body;
    const chat = new Chat({
      userId: req.user._id,
      type: 'debate',
      debateTopic,
      debateFormat,
      generatedDebate
    });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    console.error('Create debate history error:', error);
    res.status(500).json({ message: 'Error creating debate history' });
  }
};

// Get all history for a user
export const getHistory = async (req, res) => {
  try {
    const { type } = req.query;
    const query = { userId: req.user._id };
    if (type) {
      query.type = type;
    }
    
    const history = await Chat.find(query)
      .select('type title tweetPrompt tweetStyle generatedTweet debateTopic debateFormat generatedDebate createdAt')
      .sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ message: 'Error fetching history' });
  }
};

// Delete a history item
export const deleteHistory = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findOneAndDelete({ _id: chatId, userId: req.user._id });
    
    if (!chat) {
      return res.status(404).json({ message: 'History item not found' });
    }
    
    res.status(200).json({ message: 'History item deleted successfully' });
  } catch (error) {
    console.error('Delete history error:', error);
    res.status(500).json({ message: 'Error deleting history item' });
  }
}; 