const express = require('express');
const router = express.Router();

const Status = require("../model/Status");
const ResponseUtil = require("../util/ResponseUtil");
const AsTypeStatus = require("../model/AsTypeStatus");
const Type = require("../model/Type");

const responseUtil = new ResponseUtil();

router.post('/', async (req, res) => {
    try{
        const reqBody = req.body;
        if(reqBody != null){
            const resp = await Status.create(reqBody);

            const type = reqBody.type;
            if(type != null)
                await addAsTypeStatus(resp.dataValues.status, type);

            responseUtil.sendResultOfQuery(res, resp.dataValues);
        }
    }catch (e) {
        console.log(e);
        responseUtil.sendResultOfQuery(res, null);
    }
});

router.get('/:status', async (req, res) => {
    try{
        const key = req.params.status;
        const resp = await Status.findByPk(key, { include: { model: Type, as: 'Type', through: { attributes: [] } } });
        responseUtil.sendResultOfQuery(res, resp.dataValues);
    }catch (e) {
        console.log(e);
        responseUtil.sendResultOfQuery(res, null);
    }
});

router.get('/', async (req, res) => {
    try{
        const resp = await Status.findAll({ include: { model: Type, as: 'Type', through: { attributes: [] } } });
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
            const {status, typeAdd, typeDelete} = reqBody;
            if(status != null && (typeAdd != null || typeDelete != null)){
                if(typeDelete != null){
                    await deleteAsTypeStatus(status, typeDelete);
                }

                if(typeAdd != null){
                    await addAsTypeStatus(status, typeAdd).then((resp) => {
                        responseUtil.sendResultOfQuery(res, resp != null);
                    });
                }
            }
        }
    }catch (e) {
        console.log(e);
        responseUtil.sendResultOfQuery(res, null);
    }
});

router.delete('/:status', async (req, res) => {
    try{
        const key = req.params.status;
        if(key != null){
            await AsTypeStatus.destroy({ where: { status: key } });
            const resp = await Status.destroy({ where: { status: key } });
            responseUtil.sendResultOfQuery(res, resp > 0);
        }
    }catch (e) {
        console.log(e);
        responseUtil.sendResultOfQuery(res, null);
    }
});

module.exports = router;

async function addAsTypeStatus(status, type) {
    if(typeof type === 'string'){
        return await AsTypeStatus.create({status: status, type: type});
    } else if(Array.isArray(type)){
        const AsTypeStatuses = [];
        for(let i=0; i<type.length; i++){
            AsTypeStatuses.push({
                status: status,
                type: type[i]
            });
        }
        return await AsTypeStatus.bulkCreate(AsTypeStatuses);
    }

    return null;
}

async function deleteAsTypeStatus(status, type) {
    if(typeof type === 'string'){
        await AsTypeStatus.destroy({ where: {type: type, status: status} });
    } else if(Array.isArray(type)){
        for(let i=0; i<type.length; i++){
            await AsTypeStatus.destroy({ where: {status: status, type: type[i]} });
        }
    }
}