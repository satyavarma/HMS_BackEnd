const express = require('express');
const doctorRoute = express.Router();

const doctorCollection = require('../models/doctor');
const studentsInCollection = require('../models/studentsIn');

const bodyParser = require('body-parser');

const cors = require('./cors');

doctorRoute.route('/login')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, (req, res) => {   
    console.log('doctor log in ------------------');
    console.log(req.body.username+'    '+req.body.password);
    doctorCollection.findOne({username: req.body.username})
    .then((doctor) => {
        console.log(doctor);
        if(doctor === null) {
            console.log('user null-----------');
            res.statusCode=200;
            res.setHeader('content-Type', 'application/json');
            res.json({info:'username not found', success: false});
        }
        else if(doctor.password !== req.body.password) {
            console.log('wrong password -----------');
            res.statusCode=200;
            res.setHeader('content-Type', 'application/json');
            res.json({info:'wrong Password', success: false});
        }
        else if (doctor.username === req.body.username && doctor.password === req.body.password) {
            console.log('= = ')
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({info:'login sucess', success: true, 'dcotor': doctor.username});
        }
    })
    .catch((err) => {
        console.log('catch doctor login');
        console.log(err);
        res.statusCode('403');
        res.setHeader('Content-Type', 'application/json');
        res.json({info:'something went wrong', success: false, error: err});
    });
})

doctorRoute.route('/prescription')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, (req, res) => {    
    console.log('-------------------------doctor prescription');
    console.log(req.body.id);
    studentsInCollection.findOne({id:req.body.id})
    .then((student) => {
        console.log(student);
        if(student == null){
            console.log('============null');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({info:'Did not entered at security point', success: false});
        }
        else{
            console.log('!===========null');
            student.treatedBy = req.body.treatedBy ? req.body.treatedBy : null;
            student.prescription = req.body.prescription ? req.body.prescription : null ;
            student.dConf = req.body.dConf ? req.body.dConf : null ;
            student.save()
            .then((student) => {
                console.log(student);
                res.statusCode=200;
                res.setHeader('Content-Type', 'application/json');
                res.json({info: 'Successfully forwarded to pharmacy', success: true});
            })
        }
    })
    .catch(err => {
        console.log('catch doctor prescription');
        res.statusCode=403;
        res.setHeader('Content-Type', 'application/json');
        res.json({info:'cannot forward', success: false, error:err});  
    })
})


module.exports = doctorRoute;