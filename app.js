const express = require('express');
const app = express();
const apiRouter = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.use(express.static('public'));

const envRouter = require('./routes/envelopes');
const transRouter = require('./routes/transactions');

// intercept requests at 'id' and parse the id string into a number
apiRouter.param('id', (req, res, next) => {
    req.params.id = parseInt(req.params.id);
    next();
})

app.use('/envelopes', envRouter);
app.use('/transactions', transRouter);

app.listen(port, () => console.log(`listening on port ${port}`));