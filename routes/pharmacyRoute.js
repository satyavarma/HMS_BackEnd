const express = require('express');
const pharmacyRoute = express.Router();

const pharmacyCollection = require('../models/pharmacy');
const studentsInCollection = require('../models/studentsIn');

const bodyParser = require('body-parser');

const cors = require('./cors');

pharmacyRoute.route('/login')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, (req, res) => {    console.log('pharmacy log in ------------------');
    console.log(req.body.username+'    '+req.body.password);
    pharmacyCollection.findOne({username: req.body.username})
    .then((pharmacist) => {
        console.log(pharmacist);
        if(pharmacist === null) {
            console.log('user null-----------');
            res.statusCode=200;
            res.setHeader('content-Type', 'application/json');
            res.json({info:'username not found', success: false});
        }
        else if(pharmacist.password !== req.body.password) {
            console.log('wrong password -----------');
            res.statusCode=200;
            res.setHeader('content-Type', 'application/json');
            res.json({info:'wrong Password', success: false});
        }
        else if (pharmacist.username === req.body.username && pharmacist.password === req.body.password) {
            console.log('= = ')
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({info:'login sucess', success: true, 'pharmacist': pharmacist.username});
        }
    })
    .catch((err) => {
        console.log('catch pharmacy login');
        console.log(err);
        res.statusCode('403');
        res.setHeader('Content-Type', 'application/json');
        res.json({info:'something went wrong', success: false, error: err});
    });
})

pharmacyRoute.route('/search')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, (req, res) => {    console.log('/pharmacy search');
    console.log(req.body.id);
    studentsInCollection.findOne({id: req.body.id})
    .then((student) => {
        console.log(student);
        if(student == null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({info:'student should enter at security point', success: true});
        }
        else if( student != null && !student.dConf){
            console.log('------------entered');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({info:'prescription not forwarded', success: true});
        }
        else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({info:'found', success: true, prescription: student.prescription});
        
        }
    })
    .catch((err) => {
        console.log('catch pharmacy search');
        console.log(err);
        res.statusCode=403;
        res.setHeader('Content-Type', 'application/json');
        res.json({info:'something went wrong', success: false, error: err});
    });
})

pharmacyRoute.route('/done')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, (req, res) => {    console.log('   pharmacy done');
    studentsInCollection.findOne({id: req.body.id})
    .then((student) => {
        console.log(student);
        if(student == null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({info:'not found', success: true});
        }
        else{
            student.pConf = req.body.pConf ? req.body.pConf : null;
            student.save()
            .then((student) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({info:'completed', success: true, id: student.id});
            })
        }
    })
    .catch(err => {
        console.log('catch pharmacy done');
        console.log(err);
        res.statusCode('403');
        res.setHeader('Content-Type', 'application/json');
        res.json({info:'something went wrong', success: false, error: err});
    })
})

module.exports = pharmacyRoute;