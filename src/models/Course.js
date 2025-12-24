import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a course title'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    topics: [{
        type: String,
    }],
    duration: {
        type: String,
        default: '12 months',
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price'],
    },
    priceUSD: {
        type: Number,
        required: [true, 'Please provide USD price'],
    },
    color: {
        type: String,
        enum: ['blue', 'green', 'purple', 'orange', 'cyan', 'lime'],
        default: 'blue',
    },
    category: {
        type: String,
        enum: ['physics', 'maths', 'jee', 'neet', 'other'],
        default: 'physics',
    },
    features: [{
        type: String,
    }],
    isPopular: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    order: {
        type: Number,
        default: 0,
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
CourseSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);
