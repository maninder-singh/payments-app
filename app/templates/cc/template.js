((modules) => {
    let _cc = {},
        constants = {
            "CC_FORM_QRY":"form[name=\"ccForm\"]",
            "CC_SUBMIT_BTN":"button[id=\"submit\"]"
        };

    let _submitCcForm = () => {

    }

    let _attachEventOnCcForm = () => {
        let ccForm = document.querySelector(constants.CC_FORM_QRY),
            button = ccForm.querySelector(constants.CC_SUBMIT_BTN);
        
        if(button){
            button.addEventListener("click", (event) => {
                console.log("Submit button click",event);
                console.log(ccForm);
            });
        }
    };

    _cc.init = () => {
        _attachEventOnCcForm();
    };

    modules.cc = _cc;
})(window.PaymentsApp.modules);