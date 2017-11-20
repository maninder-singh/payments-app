((_hb) => {

    let eq = () => {
        _hb.registerHelper('eq',(first,second,options) => {
            return (first == second) ? options.fn(this) : options.inverse(this);
        });
    };
    
    let comma = () => {
        // comma in number after every thousand
        _hb.registerHelper("comma",(value,options) => {
            if(!value){
                return "";
            }
            return value.toLocaleString();
        });
    };
    
    let registerHelpers = () => {
        eq();
        comma();
    }

    registerHelpers();
})(Handlebars);