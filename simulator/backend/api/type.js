const express = require('express');
const router = express.Router();

const Type = require("../model/Type");
const ResponseUtil = require("../util/ResponseUtil");
const AsTypeStatus = require("../model/AsTypeStatus");
const Status = require("../model/Status");
const Device = require("../model/Device");

const responseUtil = new ResponseUtil();

router.post('/', async (req, res) => {
    try{
        const reqBody = req.body;
        if(reqBody != null){
            const resp = await Type.create(reqBody);

            const status = reqBody.status;
            if(status != null && status.length > 0)
                await addAsTypeStatus(resp.dataValues.type, status);
            else{
                await addAsTypeStatus(resp.dataValues.type, ['OFF', 'ON']);
            }
            responseUtil.sendResultOfQuery(res, resp.dataValues);
        }
    }catch (e) {
        console.log(e);
        responseUtil.sendResultOfQuery(res, null);
    }
});

router.get('/:type', async (req, res) => {
    try{
        const key = req.params.type;
        const resp = await Type.findByPk(key, { include: { model: Status, as: 'Status', through: { attributes: [] } } });
        responseUtil.sendResultOfQuery(res, resp.dataValues);
    }catch (e) {
        console.log(e);
        responseUtil.sendResultOfQuery(res, null);
    }
});

router.get('/', async (req, res) => {
    try{
        const resp = await Type.findAll({ include: { model: Status, as: 'Status', through: { attributes: [] } } });
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
            const {type, statusAdd, statusDelete, statusUpdate} = reqBody;
            if(type != null && (statusAdd != null || statusDelete != null || statusUpdate != null)){
                if(statusDelete != null){
                    await deleteAsTypeStatus(type, statusDelete);
                }

                if(statusAdd != null){
                    await addAsTypeStatus(type, statusAdd).then((resp) => {
                        responseUtil.sendResultOfQuery(res, resp != null);
                    });
                }

                if(statusUpdate != null){
                    await deleteAsTypeStatus(type, statusUpdate);
                    await addAsTypeStatus(type, statusUpdate).then((resp) => {
                        responseUtil.sendResultOfQuery(res, resp != null);
                    });;
                }
            }
        }
    }catch (e) {
        console.log(e);
        responseUtil.sendResultOfQuery(res, null);
    }
});

router.delete('/:type', async (req, res) => {
    try{
        const key = req.params.type;
        if(key != null){
            await Device.destroy({ where: { type: key } });
            await AsTypeStatus.destroy({ where: { type: key } });
            const resp = await Type.destroy({ where: { type: key } });
            responseUtil.sendResultOfQuery(res, resp > 0);
        }
    }catch (e) {
        console.log(e);
        responseUtil.sendResultOfQuery(res, null);
    }
});

module.exports = router;

async function addAsTypeStatus(type, status) {
    if(typeof status === 'string'){
        return await AsTypeStatus.create({type: type, status: status});
    } else if(Array.isArray(status)){
        const AsTypeStatuses = [];
        for(let i=0; i<status.length; i++){
            AsTypeStatuses.push({
                type: type,
                status: status[i]
            });
        }
        return await AsTypeStatus.bulkCreate(AsTypeStatuses);
    }

    return null;
}

async function deleteAsTypeStatus(type, status) {
    if(typeof status === 'string'){
        await AsTypeStatus.destroy({ where: {type: type, status: status} });
    } else if(Array.isArray(status)){
        for(let i=0; i<status.length; i++){
            await AsTypeStatus.destroy({ where: {type: type, status: status[i]} });
        }
    }
}