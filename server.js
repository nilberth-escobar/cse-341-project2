const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const app = express();


const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log('Failed to connect to the database:', err);
    } 
    else {
        app.listen(PORT, () => {
        console.log(`Database connected, and Server started on port ${PORT}`)});
}
});