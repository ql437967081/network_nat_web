import { axios, handleFailure } from './util/default';
import {patUrl} from './util/url';
import { getConnection } from '../sessionConfig';

const setPat = (handleSuccess) => {
    const connectionId = getConnection();
    axios.post(patUrl, null,{ params: { connectionId } })
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};

export {setPat}