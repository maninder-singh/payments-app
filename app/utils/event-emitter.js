((utils) => {
    let _eventsObj = {},
        _events = {};

    _events.on = (eventName,callback) => {
        if(!_eventsObj.hasOwnProperty(eventName)){
            // new event 
            _eventsObj[eventName] = [];
        }
        _eventsObj[eventName].push(callback);
    };

    _events.off = (eventName) => {
        delete _eventsObj[eventName];
    };

    _events.emit = (eventName,data) => {
        let events = _eventsObj[eventName];
        if(events){
            events.forEach(function(event) {
                event({"data":data});
            });
        }
    }

    utils.events = _events;
})(window.PaymentsApp.utils);