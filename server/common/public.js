function arrayCurry(arr){
    if(Object.prototype.toString.call(arr) !== '[object Array]') return;
    let result = [];
    for(let i  = 0,len = arr.length ; i < len; i++){
        if(Object.prototype.toString.call(arr[i]) === '[object Array]'){
            if(arr[i].length === 0) result.push({_id:''});
            for(let j = 0,lenj = arr[i].length; j < lenj ;j++){
                result.push(arr[i][j]);
            }
        }else{
            result.push(arr[i]);
        }
    }

    return result;

}

function objectIdToTimestamp(objectId) {
    try { objectId = objectId.toString(); } catch (e) {}
    if (!/^[0-9a-z]{24}$/.test(objectId)) {
      throw new TypeError('Invalid objectId, got ' + JSON.stringify(objectId));
    }
    return parseInt(objectId.slice(0, 8), 16) * 1000 + Math.floor(parseInt(objectId.slice(-6), 16) / 16777.217); // convert 0x000000 ~ 0xffffff to 0 ~ 999
};


module.exports = {
    arrayCurry,
    objectIdToTimestamp
}