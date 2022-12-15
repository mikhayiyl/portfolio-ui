import logger from "../services/logger";

function asyncErrors(handler) {
    return async (req, res) => {
        try {
            await handler(req, res);
        } catch (error) {
            logger.log(error)
        }
    };
};


export default asyncErrors;