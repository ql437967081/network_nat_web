import { axios, handleFailure } from './util/default';
import {dynamicNatUrl} from './util/url';
import { getConnection } from '../sessionConfig';

const setDynamicNat = (handleSuccess) => {
    const connection_id = getConnection();
    axios.post(dynamicNatUrl, null,{ params: { connection_id } })
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};

const delDynamicNat = (handleSuccess) => {
    const connection_id = getConnection();
    axios.delete(dynamicNatUrl,{params:{connection_id}})
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};

export {setDynamicNat, delDynamicNat};
