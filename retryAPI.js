function apiCall() {
    return new Promise((resolve, reject) => {
        // let resp = Math.random() > 0.5;
        let resp = false;


        setTimeout(() => {
            if(resp) {
                 resolve('API call successful');
            }
             reject('API call failed');
        }, 1000);
    })
}

async function retryApiCall(apiFunc, nRetries, delay) {
    try{
        const apiResponse = await apiFunc();
        console.log(apiResponse);
        return apiResponse;
    }catch(error) {
        console.log('catch block',error);
        if(nRetries > 1) {
            setTimeout(() => {
                retryApiCall(apiFunc, nRetries - 1, delay);
            }, delay);
        }
    }
}

let nRetries = 3;
let delay = 2000;
retryApiCall(apiCall, nRetries, delay);