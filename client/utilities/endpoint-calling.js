

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
        return fetch('/tournament',  {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: payload
        })
        .then(this.validateFetchResponse)
        .then(this.getApiResponse, this.apiCallingError)
        .catch(this.apiCallingError);

    }


    getApiData(endpoint, params, cache="default"){
        const url = endpoint + "?" + this.encodeParams(params);
        return fetch(url,  {
            method: 'GET',
            cache: 'force-cache'
        })
        .then(this.validateFetchResponse)
        .then(this.getApiResponse, this.apiCallingError)
        .catch(this.apiCallingError);
    }


    validateFetchResponse(response){
        if(response.ok){
            console.log("Validating Fetch Response", response);
            // return response.json();
        }

        return response.json();
    }

    getApiResponse(response){
        // console.log("@ level", response);
        return response;
    }

    apiCallingError(error){
        console.log("ISSUE:", error);
    }

}


       // }).then(res => {
        //    console.log("Success In CALL", resolve(res.json())); 
        // //    return resolve(res.json());
        // },function(error){
        //     console.log("Error in calling", error);
        // });



            //     this.bodyParams = this.encodeParams(params);
    //     console.log('bodyParams', this.bodyParams);


    //     const makeRequest = async () => {
    //         await this.getJSON();
    //           return "data";
    //       }

    //       makeRequest().
    //       then(res => {console.log("mr success",res)},
    //       error => { console.log('mr error', error)}
    //     );
    // }