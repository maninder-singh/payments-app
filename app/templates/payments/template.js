((module,utils) => {
    let _payments = {},
        http = utils.http,
        constants = {
            "ACTIVE":"active",
            "GLY_CHE_RGT":"glyphicon-chevron-right",
            "PAYMENT_OPTIONS_ID":"paymentOptionsId",
            "SPAN":"span",
            "PAYMENT_DETAILS_FORM":"paymentDetailsId"
        };

    let _attachedPaymentsEvents = () => {
        // attached click event on payment options
        let paymentsOptions = document.getElementById(constants.PAYMENT_OPTIONS_ID);
        if(paymentsOptions){
            paymentsOptions.addEventListener("click",(event) => {
                selectPaymentOptions(event.target.id,paymentsOptions.children);
                renderPaymentDetailsForm(event.target.id);                
            });
        }
    }; 

    let renderPaymentDetailsForm = (id,data = {}) => {
        utils.renderHTML(id,data,`#${constants.PAYMENT_DETAILS_FORM}`);
        if(module[id] && module[id].init){
            // call init on module
            module[id].init();
        }
    };

    let setGlyCheIcon = (span,isSet) => {
        if(span && span[0]){
            span = span[0];
            if(isSet){
                span.className += ` ${constants.GLY_CHE_RGT}`;
            }else{
                span.className = span.className.replace(constants.GLY_CHE_RGT,"");
            }
        }
    };

    let selectPaymentOptions = (id,list) => {
        for(let i = 0; i < list.length ; i++){
            let span = list[i].getElementsByTagName(constants.SPAN);
            if(list[i].id === event.target.id){
                list[i].className += ` ${constants.ACTIVE}`;
                setGlyCheIcon(span,true);
            }else{
                list[i].className = list[i].className.replace(constants.ACTIVE,"");
                setGlyCheIcon(span,false);
            }
        }
    };

    _payments.init = () => {
        _attachedPaymentsEvents();
        let data = module.data.paymentOptions;
        if(data && data[0]){
            data = data[0];
            renderPaymentDetailsForm(data.id,data);
        }
    };

    _payments.fetchPaymentsData = (url) => {
        http.get(url).then((response) => {
            module.data = response.data;
        },(error) => {
            console.log("Error occur while fetching data");
        });
    };

    module.payments = _payments;
})(window.PaymentsApp.modules,window.PaymentsApp.utils);