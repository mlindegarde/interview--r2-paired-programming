var express = require('express');
var router = express.Router();

var database = require('../modules/database');

router.get('/:playerClass/cards', async function(req, res, next) {
    res.format({
        'text/html': async function() {
            res.render('cards/list', {cards: await database.getCardsByPlayerClass(req.params.playerClass)})
        },

        'application/json': async function() {
            res.send(await database.getCardsByPlayerClass(req.params.playerClass));
        }
    })
});

module.exports = router;