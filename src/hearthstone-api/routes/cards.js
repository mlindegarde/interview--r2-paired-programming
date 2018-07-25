var express = require('express');
var router = express.Router();

var database = require('../modules/database');

router.get('/', async function(req, res, next) {
    res.format({
        'text/html': async function() {
            res.render('cards/list', {cards: await database.getCards(req.query)});
        },

        'application/json': async function() {
            res.send(await database.getCards(req.query));
        },

        'default': function() {
            res.render('error', {
                message: `Unsupported Accept header: ${req.get('Accept')}`,
                error: {
                    status: undefined,
                    stack: undefined
                }
            });
        },
    });
});

router.get('/:id', async function(req, res, next) {
    res.format({
        'text/html': async function() {
            res.render('cards/detail', {card: await database.getCard(req.params.id)});
        },

        'application/json': async function () {
            res.send(await database.getCard(req.params.id));
        },

        'default': function() {
            res.render('error', {
                message: `Unsupported Accept header: ${req.get('Accept')}`,
                error: {
                    status: undefined,
                    stack: undefined
                }
            });      
        }
    })  
});

module.exports = router;