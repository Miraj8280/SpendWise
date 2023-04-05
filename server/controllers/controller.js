const model = require('../models/model');

// post:http://localhost:8080/api/categories
async function createCategories(req, res) {
    const Create = new model.Categories({
        type: "Expense",
        color: "rgb(255, 99, 132)",
    });

    // old version 
    // gives error: MongooseError: Model.prototype.save() no longer accepts a callback
    /*
    await Create.save(function(err){
        if(!err) return res.json(Create);
        return res.status(400).json({message: `Error while creating categories ${err}`});
    })
    */
    // corrected new version
    try {
        await Create.save();
        return res.json(Create);
    } catch(err) {
        return res.status(400).json({message: `Error while creating categories ${err}`});
    }   
}

// get:http://localhost:8080/api/categories
async function getCategories(req, res) {

    let data = await model.Categories.find({})

    // filter only type and color
    let filter = await data.map(v => Object.assign({}, {type: v.type, color: v.color}));

    return res.json(filter);
}

// post:http://localhost:8080/api/transactions
async function createTransactions(req, res) {
    if(!req.body) return res.status(400).json("Post HTTP Data not Provided");
    let {name, type, amount} = req.body;

    const Create = new model.Transactions(
        {
            name,
            type,
            amount,
            date: new Date()
        }
    );

    // old version (error)
    /*
    Create.save(function(err){
        if(!err) return res.json(Create);
        return res.status(400).json({ message : `Error while creating transaction ${err}`});
    });
    */

    // new corrected version
    try{
        Create.save();
        return res.json(Create);
    } catch(err) {
        return res.status(400).json({ message : `Error while creating transaction ${err}`});
    }
}

// get:http://localhost:8080/api/transactions
async function getTransactions(req, res) {
    let data = await model.Transactions.find({});
    return res.json(data);
}

// delete:http://localhost:8080/api/transactions
async function deleteTransaction(req, res) {
    if(!req.body) return res.status(400).json({message: "Request Body not Found"});

    try {
        const result = await model.Transactions.deleteOne(req.body);
        if (result.deletedCount > 0) {
            return res.json("Record Deleted..!");
        } else {
            return res.json("No matching record found");
        }
    } catch(err) {
        console.error(err);
        res.json("Error while deleting transaction record");
    }
}

// get:http://localhost:8080/api/labels
async function getLables(req, res) {
    model.Transactions.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "type",
                foreignField: "type",
                as: "categoriesInfo"
            }
        },
        {
            $unwind: "$categoriesInfo"
        }
    ]).then(result => {
        let data = result.map(v => Object.assign({}, {_id: v._id, name: v.name, type: v.type, amount: v.amount, color: v.categoriesInfo['color']}));
        res.json(data);
    }).catch(error => {
        res.status(400).json("Lookup Collection Error");
    })
}

module.exports = {
    createCategories,
    getCategories,
    createTransactions,
    getTransactions,
    deleteTransaction,
    getLables
}