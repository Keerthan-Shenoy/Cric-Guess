const express = require('express');
const app = express();
const port = 5000;

const cors = require('cors');
app.use(cors());

// Handle preflight OPTIONS request
app.options('*', cors());

app.get('/', (req, res) => {
    const name = req.query.name;
    console.log(`Hello ${name}!`);
    res.send(`Hello ${name}!`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});