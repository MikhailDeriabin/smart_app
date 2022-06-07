/**
 * The class has functionality for setting responses to the client side
 */
class ResponseUtil {
    /**
     * The method sends result of the executed operation or response data to the client side request, which can be anything
     * @param res response objects
     * @param {*} result result need to be sent
     */
    sendResultOfQuery(res, result) {
        res.json(result);
        res.end();
    }

    /**
     * The method gets all the data values from Sequelize ORM response, i.e. get all data related only to the object(address, client etc.) without extra data
     * @param {Array} respArr response array from Sequelize ORM
     * @returns {null|*[]} array with ORM objects
     */
    getDataValues(respArr){
        if(respArr != null){
            let result = [];
            for(let i=0; i<respArr.length; i++){
                result[i] = respArr[i].dataValues;
            }
            return result;
        } else {
            return null;
        }
    }
}

module.exports = ResponseUtil;