import { axios, handleFailure } from './util/default';
import { pingUrl} from './util/url';
import { getConnection } from '../sessionConfig';

const ping = (target, source=undefined, handleSuccess) =>{
    const connectionId = getConnection();
    axios.get(pingUrl , { params: { connectionId , target, source } })
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};

export {ping}