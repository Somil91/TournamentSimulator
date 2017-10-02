

/**
 * Endpoint Api's Calling
 */




class EndpointService{
    constructor(){

    }

    createPayload(params){
        const encodedParams = Object.keys(params).map((prop) => {
            if(Array.isArray(params[prop])){
                return params[prop].map( np => encodeURIComponent(prop) + "=" + encodeURIComponent(np)).join('&');
            } else
                return encodeURIComponent(prop) + "=" + encodeURIComponent(params[prop]);
        }).join('&');

        return encodedParams;
    }

    encodeParams(params){
        const urlEncodedParams = !params ? '' : this.createPayload(params); 
        return urlEncodedParams;
    }

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
        // .catch(this.apiCallingError);

    }


    getApiData(endpoint, params, cache="default"){
        const url = endpoint + "?" + this.encodeParams(params);
        return fetch(url,  {
            method: 'GET',
            cache: 'force-cache',
            headers: {
                "Cache-Control": "max-age=31536000"
            }
        })
        .then(this.validateFetchResponse)
        .then(this.getApiResponse, this.apiCallingError)
        .catch(this.logError);
    }


    validateFetchResponse(response){
        if(!response.ok){
            console.log("Error in api calling");
        } 

        return response.json();
    }

    getApiResponse(response){
        if(response.hasOwnProperty('error')){
            throw new Error(response.message);
        }
        return response;
    }

    apiCallingError(error){
        console.log(error);
        const messageService = new MessageService('details-form-error', error);
        messageService.renderMsg(true);
    }

    logError(error){
        console.log("Error:", error);
    }

}