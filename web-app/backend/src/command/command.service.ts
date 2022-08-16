import { Injectable } from '@nestjs/common';
const mqtt = require('mqtt');
import url from 'node:url';

@Injectable()
export class CommandService {

    client : any;
    mqttOptions : object = {
        /*servers: [
            {
                host: 'localhost',
                port: 1884
            }
        ]*/
    }

    constructor() {
        const address = url.parse('192.168.50.93:1884');
        this.client = mqtt.connect(address, this.mqttOptions);
    }

    async create(commandObject: JSON): Promise<void> {
        console.log('POST request');

        this.client = mqtt.connect('mqtt://localhost:1884', this.mqttOptions);

        this.client.publish('presence', 'Hello world!');

        this.client.on('connect', function () {
            this.client.subscribe('presence', function (err) {
                if (!err) {
                    this.client.publish('presence', 'Hello world!');
                } else{
                    console.log(err);
                }
            })
        })

        this.client.on('message', function (topic, message) {
            // message is Buffer
            console.log(message.toString());
            this.client.end();
        })
    }
}
