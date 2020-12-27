import { axios, handleFailure } from './util/default';
import {telnetUrl , exitUrl} from './util/url';
import {getConnection} from "../sessionConfig";

const telnet = (route_id , handleSuccess)=>{
    axios.post(telnetUrl,null ,{params: {route_id}})
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};

const exit = (handleSuccess)=>{
    const connectionId = getConnection();
    axios.post(exitUrl, null ,{params: {connectionId}})
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};
export {telnet , exit};