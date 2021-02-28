const express = require('express');
const securityRoute = express.Router();

const securityCollection = require('../models/security');
const studentsInCollection = require('../models/studentsIn');
const studentsOutCollection = require('../models/studentsOut');

const bodyParser = require('body-parser');

const cors = require('./cors');

securityRoute.route('/login')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, (req, res) => {
    console.log('security log in ------------------');
    console.log(req.body.username+'    '+req.body.password);
    securityCollection.findOne({username: req.body.username})
    .then((security) => {
        console.log(security);
        if(security == null) {
            console.log('user null-----------');
            res.statusCode=200;
            res.setHeader('content-Type', 'application/json');
            res.json({info:'username not found', success: false});
        }
        else if(security.password != req.body.password) {
            console.log('wrong password -----------');
            res.statusCode=200;
            res.setHeader('content-Type', 'application/json');
            res.json({info:'wrong Password', success: false});
        }
        else if (security.username == req.body.username && security.password == req.body.password) {
            console.log('= = ')
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({info:'login sucess', success: true, 'security': security.username});
        }
    })
    .catch((err) => {
        console.log('catch security login');
        console.log(err);
        res.statusCode('403');
        res.setHeader('Content-Type', 'application/json');
        res.json({info:'something went wrong', success: false, error: err});
    });
})

securityRoute.route('/in')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, (req, res) => {
    console.log('------------------------studentIn');
    console.log(req.body.id);
    studentsInCollection.findOne({id:req.body.id})
    .then((student) => {
        console.log(student);
        if(student != null){
            console.log('!=null');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({info:'student already in hospital',success: false});
        }
        else{
            console.log('================null');
            studentsInCollection.create({
                id: req.body.id,
                inDetails: req.body.inDetails,
            })
            .then((student) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({info: 'Added Successfully', success: true, student: student.id});
            })
        }
    })
    .catch(err => {
        console.log('---------studentIn catch');
        console.log(err);
        res.statusCode=403;
        res.setHeader('Content-Type', 'application/json');
        res.json({info:'something went wrong', success: false, error: err});
    });
})

securityRoute.route('/out')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, (req, res) => {
    console.log('------------student out');
    console.log(req.body.id);
    studentsInCollection.findOne({id: req.body.id})
    .then((student) => {
        console.log(student);
        if(student == null){
            console.log('================null');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({info:'student was not inside the hospital',success: false});
        }
        else{
            console.log('!===null');
            studentsOutCollection.create({
                id: student.id+student.inDetails,
                college_id:student.id,
                inDetails: student.inDetails,
                outDetails: req.body.outDetails,
                treatedBy: student.treatedBy,
                dConf: student.dConf,
                prescription: student.prescription,
                pConf: student.pConf
            })
            .then((stOut) =>{
                studentsInCollection.findOneAndDelete({id: req.body.id})
                .then((stOutFinal) => {
                    res.statusCode =200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({info:'Successfully Completed', success: true});
                })
            })
        }
    })
    .catch(err => {
        console.log('-------catch student out');
        console.log(err);
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.json({info:'something went wrong', success: false, error: err})
    })
})

module.exports = securityRoute;