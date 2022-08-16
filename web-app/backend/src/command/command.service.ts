import { Injectable } from '@nestjs/common';
const mqtt = require('mqtt');
import {MqttClient} from "mqtt";

@Injectable()
export class CommandService {

    client : MqttClient;
    mqttOptions : object = {
        servers: [
            {
                host: '192.168.50.93',
                port: 1884
            }
        ]
    }

    constructor() {
        this.client = mqtt.connect(this.mqttOptions);
    }

    async create(commandObject: any): Promise<void> {
        let topic = commandObject.boardId + '/' + commandObject.deviceId;

        let message = commandObject.command + ';';
        const paramKeys = Object.keys(commandObject.params);
        for(let i=0; i<paramKeys.length; i++){
            const paramKey = paramKeys[i];
            const paramValue = commandObject.params[paramKeys[i]];
            message += paramKey[i] + ':' + paramValue;
            if(i !== paramKeys.length-1)
                message += ',';
        }

        this.client.publish(topic, message);
    }
}
