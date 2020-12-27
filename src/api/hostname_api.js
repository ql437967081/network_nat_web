import { axios, handleFailure } from './util/default';
import {hostnameUrl} from './util/url';
import { getConnection } from '../sessionConfig';

const getHostname = (handleSuccess) => {
    const connectionId = getConnection();
    axios.get(hostnameUrl, { params: { connectionId } })
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};

const setHostname = (hostname , handleSuccess) => {
    const connectionId = getConnection();
    axios.post(hostnameUrl, {hostname} ,{params:{connectionId}})
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
}

export {getHostname ,setHostname}