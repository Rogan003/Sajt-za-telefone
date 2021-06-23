const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const model = require('./sema');
const router = require("./telefoni");

app.use(cors());
app.use(express.json());
app.use('/telefoni',router);
app.listen(9000, function(){
    console.log('SLUSAM!');
});