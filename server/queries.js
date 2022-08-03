const Pool = require('pg').Pool;
const pool = new Pool ({
    user: 'me',
    host: 'localhost',
    database: 'budget',
    password: 'password',
    port: 5432
});

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
};


const getAllEnvelopes = (req, res) => {
    poolquery('SELECT * FROM envelopes ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
};


module.exports = {
    getUsers
}