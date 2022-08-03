const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')
const db = require('./server/queries');

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());

app.use(express.static('public'));
app.get('/users', db.getUsers);



const port = process.env.PORT || 3000;

const apiRouter = require('./server/api');
app.use('/api', apiRouter);

app.listen(port, () => console.log(`listening on port ${port}`));