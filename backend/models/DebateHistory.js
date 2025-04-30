// models/DebateHistory.js
import mongoose from 'mongoose';

const debateHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    stance: {
      type: String,
      required: true,
    },
    counterArgument: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const DebateHistory = mongoose.model('DebateHistory', debateHistorySchema);
export default DebateHistory;
