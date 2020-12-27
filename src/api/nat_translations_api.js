import { axios, handleFailure } from './util/default';
import {natTranslationsUrl} from './util/url';
import { getConnection } from '../sessionConfig';

const getTranslations = (handleSuccess) => {
    const connectionId = getConnection();
    axios.get(natTranslationsUrl, { params: { connectionId } })
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
};

const delTranslations = (handleSuccess) => {
    const connectionId = getConnection();
    axios.delete(natTranslationsUrl , {params: {connectionId}})
        .then(function (response) {
            console.log(response);
            handleSuccess(response.data);
        })
        .catch(handleFailure);
}

export {getTranslations , delTranslations}