import { axios, handleFailure } from './util/default';
import {staticNatUrl} from './util/url';
import { getConnection } from '../sessionConfig';

const setStaticNat = (handleSuccess) => {
    const connectionId = getConnection();
    axios.post(staticNatUrl, null,{ params: { connectionId } })
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};

const delStaticNat = (handleSuccess) => {
    const connectionId = getConnection();
    axios.delete(staticNatUrl,{params:{connectionId}})
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
}

export {setStaticNat , delStaticNat}