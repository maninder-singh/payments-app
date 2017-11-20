(function(utils){
    let _http = {},
        REQUEST_METHOD = {
            "GET":"GET",
            "POST":"POST",
            "PUT":"PUT",
            "DELETE":"DELETE"
        };

    let _httpObject = (xhr) => {
        let data;
        try{
            data = JSON.parse(xhr.responseText);
        }catch(e){
            data = xhr.responseText;
        }
        return {
            "status":xhr.status,
            "data":data,
            "xhrResponse":xhr
        };
    };

    let _xhrRequest = (url,options) => {
        return new Promise((resolve,reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(options.method,url,options.async);
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4 && xhr.status === 200){
                        resolve(_httpObject(xhr));
                }

                if(xhr.readyState === 4 && xhr.status >= 400 && xhr.status <= 599){
                    reject(_httpObject(xhr));
                }
            }
            xhr.send();    
        });
    }

    _http.get = (url,options) => {
        if(!options){
            options = {
                "method" : REQUEST_METHOD.GET
            };
        }

        if(!options.async){
            options.async = true;
        }
        return _xhrRequest(url,options);
    };

    utils.http = _http;
    
})(window.PaymentsApp.utils);