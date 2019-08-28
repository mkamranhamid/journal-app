
import { getKey, getLocalStorage, toastError } from './common';
import { TOKEN_KEY } from './constants';
import appconfig from '../config/config.json';

var config = appconfig[process.env.NODE_ENV];
console.log("CONFIG: ", config);
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
async function parseJSON(response) {
    let json = await response.json();
    if (json && !json.errors) {
        return json.data;
    }
    throw json.errors[0];
}

function errorHandler(err) {
    let message = err['message'] || 'SOME-ERROR-OCCURED';
    console.log('errorHandler error: ', message);
    toastError(message);
    throw err;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
async function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    let error = { message: response.statusText };
    error['response'] = response;
    throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export function request(queryString, header) {
    let url = createUrl();
    let options = createOptions("POST", header, queryString);   // method will always be POST as graphql only accepts POST method
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .catch(errorHandler)
}

function createOptions(method, header, queryString) {
    let options = {
        method // or [GET,PUT,POST,DELETE]
    }
    let headers = {
        'Content-Type': 'application/json',
        // 'Accept': 'application/json, text/plain, */*'
    }
    if (header) {
        let token = getLocalStorage(TOKEN_KEY);
        headers['Authorization'] = `${token}`;
    }
    if (queryString) {
        const body = { query: queryString };
        options['body'] = JSON.stringify(body);
    }
    options['headers'] = headers;
    return options;
}

function createUrl(path, param) {
    // let url = getKey('api');
    let url = config['api'];
    url = `${url}/graphql`;
    return url;
}