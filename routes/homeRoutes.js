const Page = require('./page');
const express = require('express');
const { Sequelize } = require('sequelize');
const router  = express.Router();
const { models } = require('../sequelize');


class homeRoutes extends Page {


    constructor(){
        router.get('/', async (req, res, next) => {
            let randomBooks = await models.Book.findAll({ order: Sequelize.literal('rand()')})
            res.render('home',{books: randomBooks});
        });
        super(router)

    }
    router() { return router; }


}


module.exports = homeRoutes;