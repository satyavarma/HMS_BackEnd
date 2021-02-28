const express = require('express');
const adminRoute = express.Router();

const adminCollection = require('../models/admin');
const securityCollection = require('../models/security');
const doctorCollection = require('../models/doctor');
const pharmacyCollection = require('../models/pharmacy');

const bodyParser = require('body-parser');

const cors = require('./cors');

adminRoute.route('/login')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, (req, res) => {
    console.log('admin log in ------------------');
    console.log(req.body.username+'    '+req.body.password);
    adminCollection.findOne({username: req.body.username})
    .then((admin) => {
        console.log(admin);
        if(admin === null) {
            console.log('user null-----------');
            res.statusCode=200;
            res.setHeader('content-Type', 'application/json');
            res.json({info:'username not found', success: false});
        }
        else if(admin.password !== req.body.password) {
            console.log('wrong password -----------');
            res.statusCode=200;
            res.setHeader('content-Type', 'application/json');
            res.json({info:'wrong Password', success: false});
        }
        else if (admin.username === req.body.username && admin.password === req.body.password) {
            console.log('= = ')
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({info:'login sucess', success: true, admin: admin.username});
        }
    })
    .catch((err) => {
        console.log('catch admin login');
        console.log(err);
        res.statusCode('403');
        res.setHeader('Content-Type', 'application/json');
        res.json({info:'something went wrong', success: false});
    });
})

adminRoute.route('/securityadd')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, (req, res) => {
    console.log('------------add sec');
    console.log(req.body.username);
    securityCollection.findOne({username:req.body.username})
    .then((security) => {
        console.log(security)
        if(security != null){
            console.log('!=null');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({info:'Username already exists', success: false});
        }
        else{
            console.log('=========null');
            securityCollection.create({
                username: req.body.username,
                password: req.body.password
            })
            .then((security) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({info: 'Added Successfully', success:true, security: security.username});
            });
        }
    })
    .catch((err) => {
        console.log('-------catch secuirty add');
        console.log(err);
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.json({info:'something went wrong', success: false, error: err})
    })
})

adminRoute.route('/securityremove')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, (req, res) => {
    console.log('---------------remove sec');
    console.log(req.body.username);
    securityCollection.findOne({username:req.body.username})
    .then((security) => {
        console.log(security);
        if( security == null){
            console.log('======null');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({info:'Username not found', success: false});
        }
        else{
            securityCollection.findOneAndDelete({username:req.body.username})
            .then(() => {
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json({info:'account removed successfully', success:true});
            })
            .catch((err) => {
                res.statusCode=403;
                res.setHeader('Content-Type', 'application/json');
                res.json({info:'something went wrong', success:false});
            })
        }
    })
})

adminRoute.route('/doctoradd')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, (req, res) => {
    console.log('------------add doc');
    console.log(req.body.username);
    doctorCollection.findOne({username:req.body.username})
    .then((doctor) => {
        console.log(doctor)
        if(doctor != null){
            console.log('!=null');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({info:'Username already exists', success: false});
        }
        else{
            console.log('=========null');
            doctorCollection.create({
                username: req.body.username,
                password: req.body.password
            })
            .then((doctor) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({info: 'Added Successfully', success:true, doctor:doctor.username});
            });
        }
    })
    .catch((err) => {
        console.log('-------catch doctor add');
        console.log(err);
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.json({info:'something went wrong', success: false, error: err})
    })
})

adminRoute.route('/doctorremove')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, (req, res) => {
    console.log('---------------remove doc');
    console.log(req.body.username);
    doctorCollection.findOne({username:req.body.username})
    .then((doctor) => {
        console.log(doctor);
        if( doctor == null){
            console.log('======null');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({info:'Username not found', success: false});
        }
        else{
            doctorCollection.findOneAndDelete({username:req.body.username})
            .then(() => {
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json({info:'account removed successfully', success:true});
            })
            .catch((err) => {
                res.statusCode=403;
                res.setHeader('Content-Type', 'application/json');
                res.json({info:'something went wrong', success:false});
            })
        }
    })
})

adminRoute.route('/pharmacyadd')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, (req, res) => {
    console.log('------------add phar');
    console.log(req.body.username);
    pharmacyCollection.findOne({username:req.body.username})
    .then((pharmacist) => {
        console.log(pharmacist)
        if(pharmacist != null){
            console.log('!=null');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({info:'Username already exists', success: false});
        }
        else{
            console.log('=========null');
            pharmacyCollection.create({
                username: req.body.username,
                password: req.body.password
            })
            .then((pharmacist) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({info: 'Added Successfully', success:true, pharmacist: pharmacist.username});
            });
        }
    })
    .catch((err) => {
        console.log('-------catch pharmacist add');
        console.log(err);
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.json({info:'something went wrong', success: false, error: err})
    })
})

adminRoute.route('/pharmacyremove')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, (req, res) => {
    console.log('---------------remove phar');
    console.log(req.body.username);
    pharmacyCollection.findOne({username:req.body.username})
    .then((pharmacist) => {
        console.log(pharmacist);
        if( pharmacist == null){
            console.log('======null');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({info:'Username not found', success: false});
        }
        else{
            pharmacyCollection.findOneAndDelete({username:req.body.username})
            .then(() => {
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json({info:'account removed successfully', success:true});
            })
            .catch((err) => {
                res.statusCode=403;
                res.setHeader('Content-Type', 'application/json');
                res.json({info:'something went wrong', success:false});
            })
        }
    })
})

module.exports = adminRoute;