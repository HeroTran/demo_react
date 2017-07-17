export  function convertJsonToArray(result){
    let data = [];
    for(let key in result){
        result[key].url = result[key].url.substring(0,result[key].url.length - 23) + "/admin";
        const item = {
            siteId: key,
            ...result[key]
        }
        data.push(item);
    }
    return data;
}