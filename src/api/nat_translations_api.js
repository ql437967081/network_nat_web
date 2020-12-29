import { axios, handleFailure } from './util/default';
import {natTranslationsUrl} from './util/url';
import { getConnection } from '../sessionConfig';

const getTranslations = (handleSuccess) => {
    const connection_id = getConnection();
    axios.get(natTranslationsUrl, { params: { connection_id } })
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};

const delTranslations = (handleSuccess) => {
    const connection_id = getConnection();
    axios.delete(natTranslationsUrl , {params: {connection_id}})
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};

export {getTranslations , delTranslations};
