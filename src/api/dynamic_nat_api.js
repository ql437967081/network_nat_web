import { axios, handleFailure } from './util/default';
import {dynamicNatUrl} from './util/url';
import { getConnection } from '../sessionConfig';

const setDynamicNat = (handleSuccess) => {
    const connectionId = getConnection();
    axios.post(dynamicNatUrl, null,{ params: { connectionId } })
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};

const delDynamicNat = (handleSuccess) => {
    const connectionId = getConnection();
    axios.delete(dynamicNatUrl,{params:{connectionId}})
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
}

export {setDynamicNat, delDynamicNat}