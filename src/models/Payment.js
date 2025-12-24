import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    courseName: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    amountUSD: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: 'USD',
    },
    paymentMethod: {
        type: String,
        enum: ['paypal', 'bank_transfer', 'upi', 'card', 'cash', 'other'],
        default: 'paypal',
    },
    transactionId: {
        type: String,
    },
    paypalOrderId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded', 'cancelled'],
        default: 'pending',
    },
    notes: {
        type: String,
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

// Update timestamp on save
PaymentSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
