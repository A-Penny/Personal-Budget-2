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
    const id = parseInt(req.params.id);
    const text = 'SELECT * FROM transactions WHERE id = $1';

    db.query(text, [id], (error, results) => {
        if (error) {
            res.send(error.stack)
        }
        res.status(200).json(results.rows)
    })
});

transRouter.post('/', (req, res) => {
    const { amount, date, recipient } = req.body;
    const text = 'INSERT INTO transactions (amount, date, recipient) VALUES($1, $2, $3) RETURNING * '

    db.query(text, [amount, date, recipient], (error, results) => {
        if (error) {
            res.send(error.stack)
        }
        res.status(200).send('Created new transaction')
    })
});

module.exports = transRouter;