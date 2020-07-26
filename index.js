const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const logger = require('morgan');

const app = express();
const port = 5000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

const url='mongodb://localhost:27017/HMS';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('connected to the server perfectly');
}, (err) => {
    console.log(err);
});

app.use(logger('dev'));
app.use(express.json());

const adminRoute = require('./routes/adminRoute');
const securityRoute = require('./routes/securityRoute');
const doctorRoute = require('./routes/doctorRoute');
const pharmacyRoute = require('./routes/pharmacyRoute');

app.use('/admin', adminRoute);
app.use('/security', securityRoute);
app.use('/doctor',doctorRoute);
app.use('/pharmacy',pharmacyRoute);