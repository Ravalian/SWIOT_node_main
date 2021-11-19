'use strict';
const http = require( 'http' );
const httpStatus = require( 'http-status-codes' );
const express = require('express');
const axios = require('axios');
const { json } = require('express');

const port = 4000;

const api = express()
const api_pi = express()

const HOST = 'localhost'
const PORT = 5600;

api.listen(PORT, () => console.log('API running at '+HOST+':'+PORT+'!'));


//Raspberry pi's
const HOST_pi = '192.168.43.149'
const PORT_pi = 8888;

api.get('/', (reg, res) => {
    res.send('Welcome to this API');
})


var data = {test: "test", test2: "test2"}
var test = JSON.stringify(data)

api.post('/send_data', (req, res) => {
    axios.post('http://192.168.43.149:8888/turn_on_led_from_api', {todo: 'buy milk'})
    res.send(test)
})

api.post('/send_not_data', (req, res) => {
    axios.post('http://192.168.43.149:8888/turn_off_led_from_api', {todo: 'buy milk'})
    res.send(test)
})

api.get('/test', (req, res) => {
    var test = req.body 
    axios.get('http://192.168.43.149:8888/LED_on_off')
    res.send(test);
})
// api.get('/turn_on', (reg, res) => {
//     led.writeSync(1);
//     led1.writeSync(1);
//     res.send('Turning on LED');
// })

// api.get('/turn_off', (reg, res) => {
//     led.writeSync(0);
//     led1.writeSync(0);
//     res.send('Turning off LED');
// })