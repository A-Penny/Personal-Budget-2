const express = require('express');


const db = require('../db/config');


const envRouter = express.Router();



envRouter.get('/', (req, res) => {
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

    db.query(text, [name, start_balance, current_balance, spent], (error, results) => {
                    if (error) {
                        res.send(error.detail)
                    } else {
                    res.status(201).send(`User added with ID: ${results.rows[0].id}`)
                }
            })
});

envRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const text = 'SELECT * FROM envelopes WHERE id = $1'

    db.query(text, [id], (error, results) => {
        if (error) {
            res.send(error.stack)
        }
        res.status(200).json(results.rows)
    })
});

envRouter.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
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
    const id = req.params.id;
    const { name, start_balance, current_balance, spent } = req.body;
    const text = 'UPDATE envelopes SET name = $1, start_balance = $2, current_balance = $3, spent = $4 WHERE id = $5 RETURNING *';

    db.query(text, [name, start_balance, current_balance, spent, id], (err, results) => {
        if (err) {
            res.send(err.detail)
        }
        res.status(200).send(`Envelope with ID:${id} has been updated`)
    })
});

module.exports = envRouter;

