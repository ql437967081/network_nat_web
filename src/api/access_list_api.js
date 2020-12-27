import { axios, handleFailure } from './util/default';
import {accessListUrl} from './util/url';
import { getConnection } from '../sessionConfig';

const setAccessList = (handleSuccess) => {
    const connectionId = getConnection();
    axios.post(accessListUrl, null ,{params:{connectionId}})
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
}

export {setAccessList}