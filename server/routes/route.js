const routes = require('express').Router();
const controller = require('../controllers/controller');

routes.route('/api/categories')
    .post(controller.createCategories)
    .get(controller.getCategories)

routes.route('/api/transactions')
    .post(controller.createTransactions)
    .get(controller.getTransactions)
    .delete(controller.deleteTransaction)

routes.route('/api/labels')
    .get(controller.getLables)

module.exports = routes;