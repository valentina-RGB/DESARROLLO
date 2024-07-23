const express = require('express');
const router = express.Router();
const {request,response} = require('express');

router
    .get('/categories', (request,response) => {})
    .get('/categories:id', (request,response) => {})
    .post('/categories:id', (request,response) =>{})
    .patch('/categories:id', (request,response) =>{})
    .delete('/categories:id', (request,response) =>{})


module.exports = router;
