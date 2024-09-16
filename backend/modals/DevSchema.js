const mongoose = require('mongoose');

const DevSchema = new mongoose.Schema({
    projectTitle: {
        type: String,
        required: true,
    },
    pushedUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    websiteUrl: {
        type: String,
        required: true,
    },
    githubUrl: {
        type: String,
    },
    projectRelatedTo: {
        type: String,
        required: true,
    },
    frontImage: {
        type: String,
    },
    likes: {
        // array of user id
        type: [mongoose.Schema.Types.ObjectId],
        ref: "user",
        default: [],
    },
    noOfView: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

module.exports = mongoose.model("devspace", DevSchema);