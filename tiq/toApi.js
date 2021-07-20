const axios = require('axios');
const mqttConf = require('../config/mqtt.config.js');
const apiConf = require('../config/api.config.js');
//const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYwZjIyMTQ1M2E1ODMxMjIyNDU3OTEyNSIsIm5hbWUiOiJNYXJjZWxvIENhc3RlbGxvIiwiZW1haWwiOiJjYXN0ZWxsby5tYXJjZWxvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJDBZWlFOVEhiRDZCTHVzZ0Z4RG50N3VORjdISzFOZC9zb0tMbGtLWE1hY2hWdjlQdXZ1NmVhIiwiX192IjowfSwiaWF0IjoxNjI2NzM4OTEzLCJleHAiOjE2MjczNDM3MTN9.x1vS0XnZwrKJw9mP8L35njeN8iXEPY32L54V574IwnE'
/*const configAxios = { 
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token
    } 
  }*/


exports.toApi = (topic, message) => {
  //const token=message.token
  const configAxios = { 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': message.token
      } 
    }
  //console.log('topico:',topic);
  //console.log('mensaje:',message.toString());
  if (topic==mqttConf.telemetryTopic){
    put('http://'+apiConf.url+':'+apiConf.port+apiConf.telemetryRoute, message.toString(),configAxios);
  }
  if (topic==mqttConf.attributeTopic){
    put('http://'+apiConf.url+':'+apiConf.port+apiConf.attributeRoute, message.toString(),configAxios);
  }
  if (topic==mqttConf.commandTopic){
    //console.log('toApi:',apiConf.actionRoute,message);
    post('http://'+apiConf.url+':'+apiConf.port+apiConf.actionRoute, message,configAxios);
  }
}  

async function put(url, body, configAxios) {
    try {
        const response = await axios.put(url, body, configAxios);
        return response.data;
    } 
    catch (err) {
        return (err);
    }
}

async function post(url, body, configAxios) {
  try {
      const response = await axios.post(url, body, configAxios);
      return response.data;
  } 
  catch (err) {
      return (err);
  }
}

