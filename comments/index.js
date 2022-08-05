const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {
    
};

app.get('/posts/:id/comments', (request, response) => {
    response.send(
        commentsByPostId[request.params.id] || []
    );
});

app.post('/posts/:id/comments', async (request, response) => {
    const commentId = randomBytes(4).toString('hex');
    const postId = request.params.id;
    const { content } = request.body;

    const comments = commentsByPostId[postId] || [];

    comments.push({id: commentId, content});

    commentsByPostId[postId] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: request.params.id
        }
    })

    response.status(201).send(comments);
});

app.post('/events', (request, response) => {
    console.log('ReceivedEvent', request.body.type);

    response.send({});
});

app.listen(4001, () => {
    console.log('Listening on 4001');
})