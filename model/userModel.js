const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    avatar: {
        type: String,
    },
    avatarID: {
        type: String,
    },
    // verified: {
    //     type: String,
    // },
    // verifiedToken: {
    //     type: String,
    // },
    item: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "items",
        },
    ]
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);