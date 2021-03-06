import { axios, handleFailure } from './util/default';
import {telnetUrl , exitUrl} from './util/url';
import {getConnection} from "../sessionConfig";

const telnet = (router_id , handleSuccess)=>{
    axios.post(telnetUrl,null ,{params: {router_id}})
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};

const exit = (handleSuccess)=>{
    const connection_id = getConnection();
    axios.post(exitUrl, null ,{params: {connection_id}})
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};
export {telnet , exit};
