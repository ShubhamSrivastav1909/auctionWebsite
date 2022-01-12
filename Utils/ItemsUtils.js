export function initialiseObjectBooleanValues(payload, booleanValue){
    for(var key in payload){
        payload[key]=booleanValue;
    };
    return payload;
};