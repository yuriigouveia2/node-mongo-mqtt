
var mqtt    = require('mqtt');

//var client  = mqtt.connect('mqtt://test.mosquitto.org');
var client  = mqtt.connect('mqtt://localhost:1884');
client.subscribe('presence')
client.publish('presence', 'Hello mqtt')

client.on('message', function (topic, message) {
  console.log(message.toString())
})

client.end()