import { axios, handleFailure } from './util/default';
import {staticNatUrl} from './util/url';
import { getConnection } from '../sessionConfig';

const setStaticNat = (handleSuccess) => {
    const connection_id = getConnection();
    axios.post(staticNatUrl, null,{ params: { connection_id } })
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};

const delStaticNat = (handleSuccess) => {
    const connection_id = getConnection();
    axios.delete(staticNatUrl,{params:{connection_id}})
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};

export {setStaticNat , delStaticNat};
