import React from 'react';
import axios from 'axios';

export const HttpRequest = (url, requestType = "get", values, processResponse, isProcessing) => {
    // set form url
    let formUrl = url;

    // get token from session
    const token = sessionStorage.getItem('token');

    // if there's a token
    if (token) {
        return request()(formUrl, values, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(function (response) {
                if (processResponse) {
                    return processResponse(response, 'success', isProcessing);
                }
            })
            .catch(function (error) {
                if (processResponse) {
                    return processResponse(error, 'error' , isProcessing);
                }
            });
        // if no token
    } else {
        return request()(formUrl, values)
            .then(function (response) {
                if (processResponse) {
                    return processResponse(response, 'success', isProcessing);
                }
            })
            .catch(function (error) {
                if (processResponse) {
                    return processResponse(error, 'error', isProcessing);
                }
            });
    }

    // return proper request type
    function request() {
        return requestType === 'post' ? axios.post : axios.get;
    }
}
