const mqtt = require('mqtt');
const tim = require('../tim/tim.js');
const mqttConf = require('../config/mqtt.config.js');


  exports.connect = () => {
    // Connect mqtt with certificates
    mqttClient = mqtt.connect(mqttConf.host, { username: mqttConf.username, password: mqttConf.password, ca:mqttConf.ca, cert:mqttConf.cert, key:mqttConf.key,rejectUnauthorized: false });

    // Mqtt error calback
    mqttClient.on('error', (err) => {
      console.log(err);
    });

    // Connection callback
    mqttClient.on('connect', () => {
      console.log(`Connected to broker`);
    });

    // mqtt subscriptions
    mqttClient.subscribe(mqttConf.telemetryTopic, {qos: 0});
    mqttClient.subscribe(mqttConf.attributeTopic, {qos: 0});
    mqttClient.subscribe(mqttConf.actionTopic, {qos: 0});
    mqttClient.subscribe(mqttConf.statusTopic, {qos: 0});

    // When a message arrives, send to TIM
    mqttClient.on('message', tim.timProc);


    mqttClient.on('close', () => {
      console.log('Close event. Client MQTT disconnected');
    });
  }

  // Sends a mqtt message to topic
  exports.sendMessage = (topic, message) => {
    if (mqttClient.connected==true){
      mqttClient.publish(topic, message);
      return true;
    }else{
      console.log('Publish fail. No connection to MQTT');
      return false;
    }
  }