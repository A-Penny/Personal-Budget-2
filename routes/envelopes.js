const express = require('express');
const db = require('../db/config');
const envRouter = express.Router();

envRouter.get('/', (req, res, next) => {
    const text = 'SELECT * FROM envelopes ORDER BY id ASC';

    db.query(text, (error, results) => {
        if (error) {
            res.send(error.stack)
        }
        res.status(200).json(results.rows)
    })
});

envRouter.post('/', (req, res) => {
    const { name, start_balance, current_balance, spent } = req.body;
    const text = 'INSERT INTO envelopes (name, start_balance, current_balance, spent) VALUES ($1, $2, $3, $4) RETURNING *'

    if (!name || !start_balance || !current_balance || !spent) {
        return res.status(400).json('envelope not created')
    }
    db.query(text, [name, start_balance, current_balance, spent], (error, results) => {
                    if (error) {
                        res.send(error.detail)
                    } else {
                    res.status(200).send(`User added with ID: ${results.rows[0].id}`)
                }
            })
});

envRouter.get('/:id', (req, res) => {
    const text = 'SELECT * FROM envelopes WHERE id = $1'

    db.query(text, [id], (error, results) => {
        if (error) {
           return res.send(error.stack)
        }
        if (!results.rows[0]) {
            return res.status(404).json('envelope not found')
        }
        res.status(200).json(results.rows)
    })
});

envRouter.delete('/:id', (req, res) => {
    const name = req.body.name;
    const text = 'DELETE FROM envelopes WHERE id = $1';

    db.query(text, [id], (error, results) => {
        if (error) {
            res.send(error.detail);
        } else {
        res.status(200).send(`Envelope '${name}' with id: ${id} has been deleted`)};
    })
});

envRouter.put('/:id', (req, res) => {
    const { name, start_balance, current_balance, spent } = req.body;
    const text = 'UPDATE envelopes SET name = $1, start_balance = $2, current_balance = $3, spent = $4 WHERE id = $5 RETURNING *';

    db.query(text, [name, start_balance, current_balance, spent, id], (err, results) => {
        if (err) {
            res.send(err.detail)
        }
        res.status(200).send(`Envelope with ID:${id} has been updated`)
    })
});

envRouter.patch('/:id', (req, res) => {
    const { spent } = req.body;
    const text = 'UPDATE envelopes SET current_balance = current_balance - $1, spent = spent + $1 WHERE id = $2 RETURNING *';

    db.query(text, [spent, id], (err, results) => {
        if (err) {
            res.send(err.details)
        };
        res.status(200).send(`${spent} spent on envelope ID:${id}.`)
    })
})

module.exports = envRouter;

