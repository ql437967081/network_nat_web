import { axios, handleFailure } from './util/default';
import { interfaceUrl } from './util/url';
import { getConnection } from '../sessionConfig';

const getInterface = (abbr, handleSuccess) => {
    const connection_id = getConnection();
    axios.get(interfaceUrl, { params: { connection_id, abbr } })
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};

const setInterface = (data, handleSuccess) => {
    const connection_id = getConnection();
    axios.post(interfaceUrl, data, { params: { connection_id } })
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};

export { getInterface, setInterface };
