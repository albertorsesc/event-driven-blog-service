const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (request, response) => {
    const event = request.body;

    events.push(event);

    // posts
    axios.post('http://localhost:4000/events', event);
    // comments
    axios.post('http://localhost:4001/events', event);
    // query
    axios.post('http://localhost:4002/events', event);
    // comments moderation
    axios.post('http://localhost:4003/events', event);

    response.send({ status: 'OK'});
});

app.get('/events', (request, response) => {
    response.send(events);
});

app.listen(4005, () => {
    console.log('Listening on 4005');
})