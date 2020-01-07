const express = require('express');
const bodyParser = require('body-parser');
const authKey = require('./lib/auth-key');
const app = express();

app.use(bodyParser.json());
app.use(authKey('abcd'));

app.get('/', (req, res) => {
    res.json({ message: 'Hello, Express' });
});

// curl -H "Content-Type: application/json" --request POST http://localhost:3000/test -d '{ "name": "toto" }'
app.post('/test', (req, res) => {
    res.json({ message: 'Yo ' + req.body.name });
});

app.listen(3000, () => {
    console.log('Server is running.');
});
