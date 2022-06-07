const express = require('express');
const router = express.Router();

const Manufacturer = require("../model/Manufacturer");
const ResponseUtil = require("../util/ResponseUtil");

const responseUtil = new ResponseUtil();

router.post('/', async (req, res) => {
    try{
        const reqBody = req.body;
        if(reqBody != null){
            const resp = await Manufacturer.create(reqBody);
            responseUtil.sendResultOfQuery(res, resp.dataValues);
        }
    }catch (e) {
        console.log(e);
        responseUtil.sendResultOfQuery(res, null);
    }
});

router.get('/:manufacturerName', async (req, res) => {
    try{
        const key = req.params.manufacturerName;
        const resp = await Manufacturer.findByPk(key);
        responseUtil.sendResultOfQuery(res, resp.dataValues);
    }catch (e) {
        console.log(e);
        responseUtil.sendResultOfQuery(res, null);
    }
});

router.get('/', async (req, res) => {
    try{
        const resp = await Manufacturer.findAll();
        responseUtil.sendResultOfQuery(res, responseUtil.getDataValues(resp));
    }catch (e) {
        console.log(e);
        responseUtil.sendResultOfQuery(res, null);
    }
});

router.delete('/:manufacturerName', async (req, res) => {
    try{
        const key = req.params.manufacturerName;
        if(key != null){
            const resp = await Manufacturer.destroy({ where: { manufacturerName: key } });
            responseUtil.sendResultOfQuery(res, resp > 0);
        }
    }catch (e) {
        console.log(e);
        responseUtil.sendResultOfQuery(res, null);
    }
});

module.exports = router;