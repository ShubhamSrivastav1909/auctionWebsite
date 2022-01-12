const endpointItems="http://localhost:8080/items";

export async function getItemDetails(itemType,itemID){
        const response=await fetch(`${endpointItems}/${itemType}/getItemDetails/${itemID}`);
        const responseJson = await response.json();
        return responseJson;
};

export async function postItemDetails(itemType, payload){
        const endpoint=`${endpointItems}/${itemType}/postItemDetails`;
        
        const options={
            method : "post",
            headers: {'Content-Type':'application/json',
                       'Accept': 'application/xml'},
            body : JSON.stringify(payload)
        };
        const response=await fetch(endpoint,options);
        const responseJson = await response.text();
        return responseJson;
}


export async function postBidDetails(payload){
        const endpoint=`${endpointItems}/watch/postBidDetails`;
        
        const options={
            method : "post",
            headers: {'Content-Type':'application/json',
                       'Accept': 'application/xml'},
            body : JSON.stringify(payload)
        };
        const response=await fetch(endpoint,options);
        const responseJson = await response.text();
        return responseJson;
}