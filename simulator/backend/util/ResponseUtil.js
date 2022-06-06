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
}

module.exports.ResponseUtil = ResponseUtil;