const express = require('express');

const db = require('../db/config');

const transRouter = express.Router();

transRouter.get('/', (req, res) => {
    const text = 'SELECT * FROM transactions';

    db.query(text, (error, results) => {
        if (error) {
            res.send(error.stack)
        }
        res.status(200).json(results.rows)
    })
});

transRouter.get('/:id', (req, res) => {
    
    const text = 'SELECT * FROM transactions WHERE id = $1';

    db.query(text, [id], (error, results) => {
        if (error) {
            res.send(error.stack)
        }
        res.status(200).json(results.rows)
    })
});

transRouter.post('/', (req, res) => {
    const { amount, recipient } = req.body;
    const text = 'INSERT INTO transactions (amount, date, recipient) VALUES($1, NOW(), $2) RETURNING * '

    db.query(text, [amount, recipient], (error, results) => {
        if (error) {
            res.send(error.stack)
        }
        res.status(200).send('Created new transaction')
    })
});

transRouter.put('/:id', (req, res) => {
    
    const { amount, recipient } =req.body;
    const text = 'UPDATE transactions SET amount = $1, date = transaction_timestamp(), recipient = $2 WHERE id = $3 RETURNING *';

    db.query(text, [amount, recipient, id], (err, results) => {
        if (err) {
            res.send(err.details)
        }
        res.status(200).send(results.rows)
    })
});

transRouter.delete('/:id', (req, res) => {
    
    const text = 'DELETE FROM transactions WHERE id = $1';

    db.query(text, [id], (err, results) => {
        if (err) {
            res.send(err.details)
        }
        res.status(200).send(`Transaction with ID:${id} has been deleted`)
    })
});

module.exports = transRouter;