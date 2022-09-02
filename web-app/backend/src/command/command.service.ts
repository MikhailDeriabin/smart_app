import { Injectable } from '@nestjs/common';
const mqtt = require('mqtt');
import {MqttClient} from "mqtt";
import axios from "axios";
import {Command} from "./command";

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

    async create(commandObject: Command): Promise<object | void> {
        let topic = commandObject.boardId + '/' + commandObject.deviceId;

        let message = commandObject.command + ';';
        if(commandObject.params != null){
            const paramKeys = Object.keys(commandObject.params);
            for(let i=0; i<paramKeys.length; i++){
                const paramKey = paramKeys[i];
                const paramValue = commandObject.params[paramKeys[i]];
                message += paramKey[i] + ':' + paramValue;
                if(i !== paramKeys.length-1)
                    message += ',';
            }
        }

        //TODO: env variables
        const statusesResp = await axios.get('http://localhost:3000/status');
        const statuses = statusesResp.data;
        const measureEnum = 'MEASURE';
        let measureEnumValue;
        for(let i=0; i<statuses.length; i++) {
            if (statuses[i].status === measureEnum)
                measureEnumValue = statuses[i].id;
        }

        this.client.publish(topic, message);
        if(measureEnumValue === commandObject.command){
            this.client.subscribe(topic);

            const that = this;
            const p = new Promise<object>(function(resolve, reject) {
                that.client.on('message', function (topic, message) {
                    const messageStr = message.toString();
                    that.client.unsubscribe(topic);
                    const respObj = that.sensorStrToObj(messageStr);
                    resolve(respObj);
                });
            });

            return p.then( (obj) =>  obj  );
        }
    }

    sensorStrToObj(str: string): object{
        const obj = {};
        let currentKey = '';
        for(let i=0; i<str.length; i++){
            if(str[i] === ':'){
                i++;
                let currentValue = '';
                for(;i<str.length; i++){
                    if(str[i] === ',' || i === str.length-1 ){
                        if(i === str.length-1)
                            currentValue += str[i];
                        obj[currentKey] = currentValue;
                        currentKey = '';
                        break;
                    } else
                        currentValue += str[i];
                }
            } else
                currentKey += str[i];
        }

        return obj;
    }
}
