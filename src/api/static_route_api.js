import { axios, handleFailure } from './util/default';
import { staticRouteUrl} from './util/url';
import { getConnection } from '../sessionConfig';

const setStaticRoute = (handleSuccess) =>{
    const connectionId = getConnection();
    axios.post( staticRouteUrl, { params: { connectionId } })
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};

export {setStaticRoute}