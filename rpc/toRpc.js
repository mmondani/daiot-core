const mqttHandler = require('../mqtt/mqttHandler.js');


exports.toRpc = (req,res) => {
    mqttHandler.sendMessage(req.body.message);
    res.status(200).send("Mensaje enviado al broker: "+req.body.message);
    //--Poner acá la grabacion de la accion en la bd 
};