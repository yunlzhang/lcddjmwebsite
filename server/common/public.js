function arrayCurry(arr){
    if(Object.prototype.toString.call(arr) !== '[object Array]') return;
    var result = [];
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


module.exports = {
    arrayCurry
}