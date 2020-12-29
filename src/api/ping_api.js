import { axios, handleFailure } from './util/default';
import { pingUrl } from './util/url';
import { getConnection } from '../sessionConfig';

const ping = (target, source, handleSuccess) =>{
    const connection_id = getConnection();
    axios.get(pingUrl, { params: { connection_id, target, source } })
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};

export {ping};
