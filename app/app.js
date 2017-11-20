((_w,hb,utils,modules) => {
    let events = utils.events,
        http = utils.http,
        payments = modules.payments;

    let _loadPaymentData = (url) => {
        payments.fetchPaymentsData(url);
    };
    let init = () => {
        _loadPaymentData("/api/payment-data.json");
        utils.loadTemplates(["payments","header","footer","cc","dc","nb","wallet","paymentDetails"]);
        events.on("TEMPLATE_LOADED",() => {
            utils.renderHTML("header",{},"#header");
            utils.renderHTML("footer",{},"#footer");
            utils.renderHTML("payments",modules.data,"#payments");
            payments.init();
        });
    }
    init();
})(window,Handlebars,window.PaymentsApp.utils,window.PaymentsApp.modules);