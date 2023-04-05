const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// or, we can write in a single line
    // const Schema = require('mongoose').Schema;



// categories => field => ['type', 'color']
const categoriesModel = new Schema({
    type: {type: String, default: "Expense"},
    color: {type: String, default: "#FCBE44"}
})

// transactions => field => ['name', 'type', 'amount', 'date']
const transactionsModel = new Schema({
    name: {type: String, default: "Anonymous"},
    type: {type: String, default: "Expense"},
    amount: {type: Number},
    date: {type: Date, default: Date.now}
})

const Categories = mongoose.model('categories', categoriesModel);
const Transactions = mongoose.model('transactions', transactionsModel);

exports.default = Transactions;
module.exports = {
    Categories,
    Transactions
}