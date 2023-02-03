import axios from "axios";
import logger from "./logger";



axios.defaults.baseURL = process.env.REACT_APP_API_URL;


function setJwt(jwt) {
    axios.defaults.headers.common["x-auth-token"] = jwt;
}

axios.interceptors.response.use(null, (error) => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;


    if (!expectedError) {

        logger.log(error);
    }

    return Promise.reject(error);
});

const obj = {
    get: axios.get,
    put: axios.put,
    post: axios.post,
    delete: axios.delete,
    setJwt,
};
export default obj;
