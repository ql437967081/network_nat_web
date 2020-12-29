import { axios, handleFailure } from './util/default';
import {hostnameUrl} from './util/url';
import { getConnection } from '../sessionConfig';

const getHostname = (handleSuccess) => {
    const connection_id = getConnection();
    axios.get(hostnameUrl, { params: { connection_id } })
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};

const setHostname = (hostname , handleSuccess) => {
    const connection_id = getConnection();
    axios.post(hostnameUrl, {hostname} ,{params:{connection_id}})
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};

export {getHostname ,setHostname};
