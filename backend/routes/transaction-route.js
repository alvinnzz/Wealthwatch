const express = require("express");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/user");
const Transaction = require("../models/transaction");


const router = express.Router();

// get a specific transaction by the transactionid
router.get('/:transactionId', async (req, res, next) => {
    const transactionId = req.params.transactionId;

    let transaction;
    try {
        transaction = await Transaction.findById(transactionId);
    } catch (err) {
        console.log("Something went wrong, could not find a transaction");
    }

    if (!transaction) {
        console.log("Could not find the transaction with provided id.");
    }
    console.log("Transaction found!");
    res.status(201).json({ transaction: transaction.toObject({ getters: true }) });
});
// get Transaction of the user
router.get('/user/:uid', async (req, res, next) => {
    const userId = req.params.uid;
    
    let userWithTransactions;
    try {
        userWithTransactions = await User.findById(userId).populate("transactions");
    } catch (err){
        console.log("Fetching transactions failed, please try again later.")
    }

    if(!userWithTransactions || userWithTransactions.transactions.length === 0) {
        console.log("Could not find transactions for the userId.")
    }

    res.status(201).json({
        transactions: userWithTransactions.transactions.map(transaction => 
            transaction.toObject({ getters: true })
        )
    });

});

// create Transaction
router.post('/', async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log("Invalid inputs");
        return next();
    }
    const { description , category, amount, date, creator } = req.body;
    
    const createdTransaction = new Transaction({
        description,
        category,
        amount,
        date,
        creator
    });

    let user;
    try{
        user = await User.findById(creator);
    } catch (err) {
        console.log("Creating transaction failed, please try again");
    }

    if (!user) {
        console.log("Cannot find user for provided id");
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdTransaction.save({ session : sess });
        user.transactions.push(createdTransaction);
        await user.save({ session: sess});
        await sess.commitTransaction();
    } catch (err) {
        console.log(err);
    }
    console.log("Added transaction successfully!");
    res.status(201).json({ transaction: createdTransaction});
})

// update Transaction

// delete Transaction
router.delete("/:transactionId", async (req, res, next) => {
    const transactionId = req.params.transactionId;

    let transaction;
    try{
        transaction = await Transaction.findById(transactionId).populate("creator");
    } catch (err) {
        console.log(err);
    }

    if (!transaction) {
        console.log("Cannot find transaction for this id.")
    }

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await transaction.deleteOne({ session : sess });
        transaction.creator.transactions.pull(transaction);
        await transaction.creator.save({ session: sess});
        await sess.commitTransaction();
    } catch (err) {
        console.log(err);
    }
    console.log("Transaction deleted successfully");
    res.status(200).json({message: "Deleted transaction"});
});

module.exports = router;