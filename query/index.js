const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvents = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] };
    }
    
    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;

        const post = posts[postId];
        post.comments.push({ id, content, status });
    }

    if (type === 'CommentUpdated') {
        const { id, postId, content, status } = data;
        
        const post = posts[postId];
        const comment = post.comments.find(comment => {
            return comment.id === id;
        });

        comment.content = content;
        comment.status = status;
    }
};

app.get('/posts', (request, response) => {
    response.send(posts);
});

app.post('/events', (request, response) => {
    const { type, data } = request.body;

    handleEvents(type, data);

    response.send({});
});

app.listen(4002, async () => {
    console.log('Listening on 4002');

    const response = await axios.get('http://localhost:4005/events');

    for (let event of response.data) {
        console.log('Processing event: ', event.type);

        handleEvents(event.type, event.data);
    }
});