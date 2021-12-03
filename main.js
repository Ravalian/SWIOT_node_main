'use strict';
const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios');
const cors = require('cors');

const api = express()

const HOST = 'localhost'
const PORT = 5600;

api.use(cors());
api.listen(PORT, () => console.log('API running at '+HOST+':'+PORT+'!'));

// create application/json parser
var jsonParser = bodyParser.json()

//Initial page - API
api.get('/', (req, res) => {
    res.send('Welcome to this API');
})

//Disko balls - Hardcoded for now
//Plan is to make the code look for nearby devices
var Discoball1 = {ipAddress: "192.168.43.149", portNr: "8888"};
var Discoball2 = {ipAddress: "192.168.43.196", portNr: "8889"};

var DiscoBalls = [Discoball1, Discoball2];

//GET - Sends Disco Balls IP adress to frontend
api.get('/getDiscoBalls', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(DiscoBalls)
});

//Motor Controller
api.put('/turn_On_Off_Motor', jsonParser, (req, res) => {
    var ip = req.body.ipAddress
    var port = req.body.portNr

    if(ip == Discoball1 || Discoball2 && port != null){
        console.log("ip: " + ip + " //// port: " + port)
        axios.get('http://' + ip + ':' + port + '/Motor_on_off')
        res.status(200).send("Motor started for " + ip)
    }
    else if (ip != Discoball1 || Discoball2){
        res.status(404).send("ip does not exist");;
    }
    else{
        res.status(400);
    }
});

//LED controller
api.put('/turn_On_Off_LED', jsonParser, (req, res) => {
    var ip = req.body.ipAddress
    var port = req.body.portNr

    if(ip == Discoball1 || Discoball2 && port != null){
        console.log("ip: " + ip + " //// port: " + port)
        axios.get('http://' + ip + ':' + port + '/LED_on_off')
        res.status(200).send("LED started for " + ip)
    }
    else if (ip != Discoball1 || Discoball2) {
        res.status(400).send("ip does not exist");
    }
    else{
        res.status(400);
    }
});

//Temp Sensor controller
api.put('/Turn_On_Off_Temp_Sensor', jsonParser, (req, res) => {
    var ip = req.body.ipAddress
    var port = req.body.portNr

    if(ip == Discoball1 || Discoball2 && port != null){
        console.log("ip: " + ip + " //// port: " + port)
        axios.get('http://' + ip + ':' + port + '/temp_sensor_on_off')
        res.status(200).send("Temp Sensor controller started for " + ip)
    }
    else if (ip != Discoball1 || Discoball2) {
        res.status(400).send("ip does not exist");
    }
    else{
        res.status(400);
    }
})