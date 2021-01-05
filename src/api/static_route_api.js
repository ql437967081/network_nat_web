import { axios, handleFailure } from './util/default';
import { staticRouteUrl} from './util/url';
import { getConnection } from '../sessionConfig';

const setStaticRoute = (handleSuccess) =>{
    const connection_id = getConnection();
    axios.post( staticRouteUrl, null, { params: { connection_id } })
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};

export {setStaticRoute};
