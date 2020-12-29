import { axios, handleFailure } from './util/default';
import {accessListUrl} from './util/url';
import { getConnection } from '../sessionConfig';

const setAccessList = (handleSuccess) => {
    const connection_id = getConnection();
    axios.post(accessListUrl, null ,{params:{connection_id}})
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};

export {setAccessList};
