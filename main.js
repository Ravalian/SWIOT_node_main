'use strict';
const http = require( 'http' );
const httpStatus = require( 'http-status-codes' );
const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios');
const cors = require('cors');
const { json } = require('express');
const { appendFile } = require('fs');

const api = express()

const HOST = 'localhost'
const PORT = 5600;

api.use(cors());
api.listen(PORT, () => console.log('API running at '+HOST+':'+PORT+'!'));

// create application/json parser
var jsonParser = bodyParser.json()

//Raspberry pi's
const HOST_pi = '192.168.43.149'
const PORT_pi = 8888;

//Initial page - API
api.get('/', (req, res) => {
    res.send('Welcome to this API');
})

var piPort = "8888";
var ipAddress1 = {ipAddress: "192.168.43.149", portNr: piPort};
var ipAddress2 = {ipAddress: "192.168.43.146", portNr: piPort};

var body = [ipAddress1, ipAddress2];

//GET - Sends Disco Balls IP adress to frontend
api.get('/getDiscoBalls', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(body)
});

var data = {test: "test", test2: "test2"}
var test = JSON.stringify(data)

//Test method
api.post('/send_data', (req, res) => {
    axios.post('http://192.168.43.149:8888/turn_on_led_from_api', {todo: 'buy milk'})
    res.send(test)
})

//Test method
api.post('/send_not_data', (req, res) => {
    axios.post('http://192.168.43.149:8888/turn_off_led_from_api', {todo: 'buy milk'})
    res.send(test)
})

//GET - Test if LEDS can be turn on with GET
api.get('/test', (req, res) => {
    var test = req.body 
    axios.get('http://192.168.43.149:8888/LED_on_off')
    res.send(test);
})

//Put - Turn on Motor from frontend
var reqIpAddress;
api.put('/putTurnOnDiskoMotor', jsonParser, function (req, res) {

    reqIpAddress = req.body
    console.log(JSON.stringify(reqIpAddress))
    res.send(JSON.stringify(reqIpAddress))
})