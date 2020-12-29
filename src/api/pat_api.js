import { axios, handleFailure } from './util/default';
import {patUrl} from './util/url';
import { getConnection } from '../sessionConfig';

const setPat = (handleSuccess) => {
    const connection_id = getConnection();
    axios.post(patUrl, null,{ params: { connection_id } })
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};

export {setPat};
