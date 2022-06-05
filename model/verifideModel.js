const mongoose = require('mongoose');

const verifiedSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },

    token: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('verified', verifiedSchema);