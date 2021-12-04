const express = require('express');

const router = express.Router();

var PassContainers = require('../modules/passContainers');
var LockManager = require('../modules/lockManager');


let passCons = new PassContainers();
let lockManager = new LockManager();

const data_file = './dat/cpdat.priv';


var AUTH_CON = -1;
var ERR = '';
var INIT = false;


router.get('/', async function(req, res){

    AUTH_CON = -1;

    if(!INIT){
        passCons.cons = await lockManager.loadFromFile(data_file);
        passCons.initAfterLoad();

        INIT = true;
    }

    res.render('index', {containers: passCons.getAll(), error: ERR});
    ERR = '';
})

router.post('/subCon', (req, res) => {

    let data = req.body;

    if(data.name.length == 0) ERR = '*Name field can\'t be empty';
    else if(data.passwd.length < 5) ERR = '*Password is to short, this app keeps all your other passwords!';
    else if(data.passwd != data.repasswd) ERR = '*Passwords doesn\'t match';
    else passCons.add(data.name, data.passwd);
        
    res.redirect('/');
})

router.post('/subPass', (req, res) => {

    let data = req.body;

    passCons.addPassword(AUTH_CON, data.title, data.passwd);
    lockManager.saveToFile(data_file, passCons.getAll());

    res.redirect('/authorizedOpen');
})


router.post('/passwords', (req, res) => {

    let data = req.body;

    let container = passCons.getIndex(data.con_index);
})


router.post('/passChange', (req, res) => {

    let data = req.body;

    passCons.editPassword(AUTH_CON, data.id, data.change);
    lockManager.saveToFile(data_file, passCons.getAll());
    res.end();
})


router.post('/passDel', (req, res) => {

    let data = req.body;

    passCons.deletePassword(AUTH_CON, data.id);
    lockManager.saveToFile(data_file, passCons.getAll());

    res.end()
})

router.get('/conDel', (req, res) => {

    passCons.deleteContainer(AUTH_CON);
    AUTH_CON = -1;

    lockManager.saveToFile(data_file, passCons.getAll());

    res.end();
})

router.get('/authorizedOpen', (req, res) => {

    if(AUTH_CON > -1){ res.render('passwords', {pass_con: passCons.getIndex(AUTH_CON), error: ''}); }
})

router.post('/unlockCon', (req, res) => {

    let ID = req.body.ID;
    AUTH_CON = ID;

    res.end();
})


router.get('/lockCon', (req, res) => {

    lockManager.encodeContainer(passCons.getIndex(AUTH_CON));
    res.end();
})

router.post('/authorize', (req, res) => {

    let pass = req.body.pass; 
    let decoded_passwords = lockManager.decodeContainer(passCons.getIndex(AUTH_CON), pass);


    if(decoded_passwords.length > 0) { passCons.applyDecoded(AUTH_CON, decoded_passwords); res.send({err: 'OK'}); }
    else res.send({err: 'INCP'}); 
})


module.exports = router;

