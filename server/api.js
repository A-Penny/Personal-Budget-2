const express = require('express');
const { updateEnvelopeById } = require('./db');
const app = express();
const apiRouter = express.Router();
const db = require('./db')

// intercept requests at 'id' and parse the id string into a number
apiRouter.param('id', (req, res, next) => {
    req.params.id = parseInt(req.params.id);
    next();
})


// GET all budget envelope balances
apiRouter.get('/', (req, res, next) => {
    let envelopes = db.getAllEnvelopes();
    res.status(200).send(envelopes)
})

// GET budget envelope balance by ID
apiRouter.get('/:id', (req, res, next) => {
    let envelope = db.getEnvelopeById(req.params.id);
    if (envelope) {
        res.status(200).send(envelope)
    } else {
        res.status(404).send('There is no envelope with that Id')
    }
})

// POST new budget envelope and balance item
apiRouter.post('/', (req, res, next) => {
    budg = parseInt(req.query.budget);
    let env = db.createNewEnvelope(req.query.name, budg);
    res.status(202).send(env)
})

// PUT budget envelope balance by ID
apiRouter.put('/:id', (req, res, next) => {
    
    oldEnv = db.getEnvelopeById(req.query.id);
    if (!req.query.name) {
        req.query.name = oldEnv.name;
    }
    if (!req.query.budget && req.query.budget) {
        req.query.budget = oldEnv.budget;
    } else {
        req.query.budget = parseInt(req.query.budget);
    }
    if (!req.query.balance) {
        req.query.balance = oldEnv.balance
    } else {
        req.query.balance = parseInt(req.query.balance)
    }
    if (!req.query.spent) {
        req.query.spent = oldEnv.spent
    } else {
        req.query.spent = parseInt(req.query.spent);
    }
    let updated = updateEnvelopeById(req.params.id, req.query);
    res.status(200).send(updated)
})
module.exports = apiRouter;





// DELETE budget envelope item by ID