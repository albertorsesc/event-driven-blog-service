const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (request, response) => {});

app.post('/events', (request, response) => {});

app.listen(4002, () => {
    console.log('Listening on 4002');
});