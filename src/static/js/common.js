/**
 * 防抖函数 表单验证（input 等）
 * @param {*} func 
 * @param {*} wait 
 * @param {*} immediate 
 */
function debounce(func, wait, immediate) {

    var timeout, result;

    var debounced = function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            if (callNow) result = func.apply(context, args)
        }
        else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
        return result;
    };

    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}
/**
 * 节流函数 应用 scroll,resize
 * @param {*} func 
 * @param {*} wait 
 * @param {*} options 
 */
function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function() {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };
    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = null;
    }

    return throttled;
}

function returnTop(time=500){
    let timer = null;
    cancelAnimationFrame(timer);
    //获取当前毫秒数
    let startTime = +new Date();     
    //获取当前页面的滚动高度
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    timer = requestAnimationFrame(function func(){
        let account = time - Math.max(0,startTime - (+new Date()) + time);
        document.documentElement.scrollTop = document.body.scrollTop = account * (-scrollTop) / time + scrollTop;
        timer = requestAnimationFrame(func);
        if(account == time){
            cancelAnimationFrame(timer);
        }
    });
}

export {
    debounce,
    throttle,
    returnTop
}