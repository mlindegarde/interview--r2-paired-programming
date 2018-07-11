var mongo = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

class Database {
    constructor() {
        this.db = undefined;
    }

    connect(url, done) {
        mongo.connect(url, {useNewUrlParser: true}, (err, client) => {
            if(err)
                return done(err);

            this.db = client.db();
            done();
        })
    }

    async getCard(id) {
        return await this.db.collection('cards').findOne({_id: new ObjectId(id)});
    }

    async getCards() {
        return await (await this.db.collection('cards').find({})).toArray();
    }

    async getCards(query) {
        Object.keys(query)
            .filter(k => query.hasOwnProperty(k) && typeof(query[k]) === 'string')
            .forEach(k => query[k] = query[k].toUpperCase());

        return await (await this.db.collection('cards').find(query)).toArray();
    }

    async getCardsByPlayerClass(playerClass) {
        return await (await this.db.collection('cards').find({playerClass: playerClass.toUpperCase()})).toArray();
    }
}

module.exports = new Database();