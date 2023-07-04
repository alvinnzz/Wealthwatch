const mongoose = require("mongoose");

// Schema for transaction
const transactionSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    }
});


const transaction = mongoose.model('Transaction', transactionSchema);

module.exports = transaction;