const mqtt = require('mqtt');
const out = require('../tiq/tiq.js');
const rpc = require('../rpc/rpc.js');
const mqttConf = require('../config/mqtt.config.js');



  exports.connect = () => {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    mqttClient = mqtt.connect(mqttConf.host, { username: mqttConf.username, password: mqttConf.password });

    // Mqtt error calback
    mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    mqttClient.on('connect', () => {
      console.log(`Conectado a broker`);
    });

    // mqtt subscriptions
    mqttClient.subscribe(mqttConf.telemetryTopic, {qos: 0});
    mqttClient.subscribe(mqttConf.attributeTopic, {qos: 0});

    // When a message arrives, console.log it
    mqttClient.on('message', out.toApi);


    mqttClient.on('close', () => {
      console.log(`Cliente mqtt desconectado`);
    });
  }

  // Sends a mqtt message to topic: mytopic
  exports.sendMessage = (topic, message) => {
    //rpc.toRpc();
    mqttClient.publish(topic, message);
  }


//module.exports;