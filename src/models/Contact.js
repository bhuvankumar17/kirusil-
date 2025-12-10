import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    maxlength: [100, 'Email cannot be more than 100 characters'],
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone cannot be more than 20 characters'],
  },
  subject: {
    type: String,
    maxlength: [100, 'Subject cannot be more than 100 characters'],
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
    maxlength: [1000, 'Message cannot be more than 1000 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
