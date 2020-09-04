const express = require('express');
require('./db/mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello polling app');
})

app.use('/api/users', require('./routes/auth'));
app.use('/api/poll', require('./routes/poll'));
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})