import { axios, handleFailure } from './util/default';
import { interfaceUrl } from './util/url';
import { getConnection } from '../sessionConfig';

const getInterface = (abbr, handleSuccess) => {
    const connectionId = getConnection();
    axios.get(interfaceUrl, { params: { connectionId, abbr } })
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};

const setInterface = (data, handleSuccess) => {
    const connectionId = getConnection();
    axios.post(interfaceUrl, data, { params: { connectionId } })
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};

export { getInterface, setInterface };
