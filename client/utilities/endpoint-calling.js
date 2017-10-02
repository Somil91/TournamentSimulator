/**
 * Utility Class for Endpoint Calling and Error handling.
 */
class EndpointService{
    constructor(){
    }

    /**
     * helper function to create encoded payload.
     * @param {object with keys; payload or query parameters required for a api call} params 
     */
    createPayload(params){
        const encodedParams = Object.keys(params).map((prop) => {
            if(Array.isArray(params[prop])){
                return params[prop].map( np => encodeURIComponent(prop) + "=" + encodeURIComponent(np)).join('&');
            } else
                return encodeURIComponent(prop) + "=" + encodeURIComponent(params[prop]);
        }).join('&');

        return encodedParams;
    }

    /**
     * Helper function to create encoded payload
     * @param {paylod or query parameters} params 
     */
    encodeParams(params){
        const urlEncodedParams = !params ? '' : this.createPayload(params); 
        return urlEncodedParams;
    }

    /**
     * Post api call handler
     * @param {api path} endpoint 
     * @param {parameters to be passed} params 
     */
    postApiData(endpoint, params){
        const payload = this.encodeParams(params);
        console.log("Payload", payload);
        return fetch(endpoint,  {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: payload
        })
        .then(this.validateFetchResponse)
        .then(this.getApiResponse);

    }


    /**
     * Get Call handler
     * @param {api path} endpoint 
     * @param {query parameters} params 
     * @param {cache policy, works in firefox only} cache 
     */
    getApiData(endpoint, params, cache="default"){
        const url = endpoint + "?" + this.encodeParams(params);
        return fetch(url,  {
            method: 'GET',
            cache: cache
        })
        .then(this.validateFetchResponse)
        .then(this.getApiResponse)
        .catch(this.logError);
    }

    /**
     * this return the response.json() promise for fetch api and logs if network fails or api call fails.
     * @param {response from fetch api call} response 
     */
    validateFetchResponse(response){
        if(!response.ok){
            console.log("Error in api calling");
        } 

        return response.json();
    }

    /**
     * This return the actual response object from an api call
     * @param {resolved response object} response 
     */
    getApiResponse(response){
        if(response.hasOwnProperty('error')){
            throw new Error(response.message);
        }
        return response;
    }

    /**
     * This handles api calling error and show case a message on the UI.
     * @param {error message} error 
     */
    apiCallingError(error){
        console.log(error);
        const messageService = new MessageService('details-form-error', error);
        messageService.renderMsg(true);
    }

    /**
     * This logs any other exception not required to be shown on UI
     * @param {error message} error 
     */
    logError(error){
        console.log("Error:", error);
    }

}