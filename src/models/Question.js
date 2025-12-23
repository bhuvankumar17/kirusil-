import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, 'Please specify the subject'],
    enum: ['physics', 'maths'],
  },
  question: {
    type: String,
    required: [true, 'Please provide the question'],
  },
  options: [{
    type: String,
    required: true,
  }],
  correctAnswer: {
    type: Number,
    required: [true, 'Please specify the correct answer index'],
    min: 0,
    max: 3,
  },
  explanation: {
    type: String,
    default: '',
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
QuestionSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Question || mongoose.model('Question', QuestionSchema);
