var express = require ('express')
var bodyParser = require('body-parser');
var util = require('util');
var futil = require('./utility.js');

var auth = require('./auth.js')
var encrypt = require('./encrypt.js')
var decrypt = require('./decrypt.js')

var user = require('./users.js')
var joblist = require('./joblist.js')

var app = express()
var router = express.Router()

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




router.get('/api/dans',function (req, res, next) {
    res.send({message:'Welcome Dans'})
    res.end()
})

// ================= ENCRYPT & DECRYPT =============

router.post('/api/dans/encrypt',function(req,res){
    encrypt.EncryptData(req,res)
})

router.post('/api/dans/decrypt',function(req,res){
    decrypt.DecryptRequestBody(req,res)
})
// ================= ENCRYPT & DECRYPT =============

// ================= LOGIN =========================
router.post('/api/dans/auth',function(req,res){
    auth.Login(req,res)
    
})
// ================= LOGIN =========================

// ================= USER ==========================

router.route('/api/dans/users')
.get(auth.authAccessToken, (req, res) => {
    user.Read(req,res)
})
// ================= USER ==========================

// ================= JOB LIST ======================

router.route('/api/dans/joblists')
.get(auth.authAccessToken, (req, res) => {
    joblist.Read(req,res)
})

router.route('/api/dans/joblists/:param')
.get(auth.authAccessToken, (req, res) => {
    joblist.ReadParam(req,res)
})

router.route('/api/dans/joblists/page/:page')
.get(auth.authAccessToken, (req, res) => {
    joblist.ReadByPage(req,res)
})
// ================= JOB LIST ======================
router.route('/api/dans/job_detail/:id')
.get(auth.authAccessToken, (req, res) => {
    joblist.ReadDetail(req,res)
})
// ================= JOB DETAIL ======================
app.use(router)

var server = app.listen(process.env.SERVER_PORT, function () {
    var host = server.address().address;
    var port = server.address().port;

    futil.logger.debug('\n' + futil.shtm() + '- [ W A K E   U P ] | STARTING ' + util.inspect(process.env.TITLE));
    futil.logger.debug(futil.shtm() + '- [ W A K E   U P ] | RUN AT PATH: /api/controller/pattern, PORT: ' + port);
});
