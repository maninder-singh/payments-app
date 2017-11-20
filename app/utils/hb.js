(function(_window,utils,_hb){
    let templates = {},
        http = utils.http,
        events = utils.events,
        ERROR_MSG = {
            "NULL_EMPTY": "cannot be null or empty",
            "URL_STRING_ARRAY":"urls should be either string or array of string"
        },
        SELECTOR = {
            "HASH":"#",
            "DOT":"."
        },
        constants = {
            "SUFFIX_URL":"/template.hbs",
            "PREFIX_URL":"templates/",
            "HOST":_window.location.href
        };

    let _fetchEle = (qry) => {
        if(!qry){
            throw new Error(`qry selector ${ERROR_MSG.NULL_EMPTY}`);
        }

        if(qry.indexOf(SELECTOR.HASH) !== -1){
            // select element by id
            return document.getElementById(qry.substring(1));
        }else if(qry.indexOf(SELECTOR.DOT) !== -1){
            // select element by class
            return document.getElementsByClassName(qry.substring(1));
        }else{
            // select element by tag
            return document.getElementsByTagName(qry);
        }
    };

    let _getUrl = (url) => {
        return `${constants.HOST}${constants.PREFIX_URL}${url}${constants.SUFFIX_URL}`;
    };

    let _loadTemplateFromAjax = (urls) => {
        let asyncRequestCount = 0; 
        urls.forEach((url) => {
            if(!templates.hasOwnProperty(url)){
                // fetch templates only if it's not in cache
                let u = _getUrl(url),
                promise = http.get(u);
                ++asyncRequestCount;
                promise.then((response) => {
                    templates[url] = _hb.compile(response.data);
                    _hb.registerPartial(url,templates[url]);
                    --asyncRequestCount;
                    if(asyncRequestCount <= 0){
                        events.emit("TEMPLATE_LOADED",{});
                    }
                },(error) => {                    
                    console.log(`unable to load template ${url}`);
                    --asyncRequestCount;
                    if(asyncRequestCount <= 0){
                        events.emit("TEMPLATE_LOADED",{});
                    }
                });
            }
        });
    }

    let _isHTMLElement = (element) => {
        return element instanceof HTMLElement;
    }

    utils.renderHTML = (templateName,data,target) => {
        if(!target){
            throw new Error(`target ${ERROR_MSG.NULL_EMPTY}`);
        }
        if(templates.hasOwnProperty(templateName)){
            let html = templates[templateName](data);
            if(!_isHTMLElement(target)){
                target = _fetchEle(target);
            }
            target.innerHTML = html;
        }
    };
    
    utils.loadTemplates = (urls) => {
        if(!urls){
            throw new Error(`urls {ERROR_MSG.NULL_EMPTY}`);
        }

        if(urls.constructor === String){
            _loadTemplateFromAjax([urls]);
        }else if(urls.constructor === Array){
            _loadTemplateFromAjax(urls);
        }else{
            throw new Error(ERROR_MSG.URL_STRING_ARRAY);
        }
    };

})(window,window.PaymentsApp.utils,Handlebars);