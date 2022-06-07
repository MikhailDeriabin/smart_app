const express = require('express');
const router = express.Router();

const Device = require("../model/Device");
const ResponseUtil = require("../util/ResponseUtil");

const responseUtil = new ResponseUtil();

router.post('/', async (req, res) => {
    try{
        const reqBody = req.body;
        if(reqBody != null){
            const resp = await Device.create(reqBody);
            responseUtil.sendResultOfQuery(res, resp.dataValues);
        }
    }catch (e) {
        console.log(e);
        responseUtil.sendResultOfQuery(res, null);
    }
});

router.get('/:deviceId', async (req, res) => {
    try{
       const key = req.params.deviceId;
       const resp = await Device.findByPk(key, { include: { all: true } });
       responseUtil.sendResultOfQuery(res, resp.dataValues);
    }catch (e) {
        console.log(e);
        responseUtil.sendResultOfQuery(res, null);
    }
});

router.get('/', async (req, res) => {
    try{
        const resp = await Device.findAll({ include: { all: true } });
        responseUtil.sendResultOfQuery(res, responseUtil.getDataValues(resp));
    }catch (e) {
        console.log(e);
        responseUtil.sendResultOfQuery(res, null);
    }
});

router.put('/', async (req, res) => {
    try{
        const reqBody = req.body;
        if(reqBody != null){
            const status = reqBody.status;
            const key = reqBody.deviceId;
            if(key != null && status != null){
                const resp = await Device.update({status: status}, {
                    where: { deviceId: key }
                });
                responseUtil.sendResultOfQuery(res, resp[0] > 0);
            } else{
                responseUtil.sendResultOfQuery(res, null);
            }
        } else{
            responseUtil.sendResultOfQuery(res, null);
        }
    }catch (e) {
        console.log(e);
        responseUtil.sendResultOfQuery(res, null);
    }
});

router.delete('/:deviceId', async (req, res) => {
    try{
        const key = req.params.deviceId;
        if(key != null){
            const resp = await Device.destroy({ where: { deviceId: key } });
            responseUtil.sendResultOfQuery(res, resp > 0);
        }
    }catch (e) {
        console.log(e);
        responseUtil.sendResultOfQuery(res, null);
    }
});

module.exports = router;