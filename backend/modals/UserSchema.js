const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String }, // image URL
        resumeOriginalName: { type: String },
        location: { type: String },
        websiteURL: { type: String },
        githubURL: { type: String },
        profilePic: {
            type: String,
            default: ""
        },
    },
    streakDateDetails: {
        type: [String],
        default: []
    },
    totalSolved: {
        type: Number,
        default: 0,
    },
    reputation: {
        type: Number,
        default: 0,
    },
    submissions: [
        {
            problemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Problem',
                required: true,
            },
            language: {
                type: String,
                required: true,
            },
            code: {
                type: String,
                required: true,
            },
            status: {
                type: String,
                enum: ['Pending', 'Accepted', 'Wrong Answer', 'Runtime Error', 'Compilation Error'],
                default: 'Pending',
            },
            submissionDate: {
                type: Date,
                default: Date.now,
            },
            timeTaken: {
                type: Number, // Execution time in ms
            },
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model("user", UserSchema)
