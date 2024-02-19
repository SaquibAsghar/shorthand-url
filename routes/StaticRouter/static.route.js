const express = require('express');
const staticeRoute = express.Router();

staticeRoute.get('/', (req, res) => {
    res.render('home', {
        randomUser: {
            name: 'syed Saquib Asghar',
            age: 27,
            gender: 'Male',
            country: 'Berlin',
        }
    });
})

module.exports = staticeRoute;