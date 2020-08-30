const express = require('express');
require('./db/mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello polling app');
})



app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})