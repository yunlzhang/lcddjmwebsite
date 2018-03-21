window.util = {
	addHandler: function (ele, type, handler) {
		if (ele.attachEvent) {
			//IE
			ele.attachEvent('on' + type, handler)
		} else {
			ele.addEventListener(type, handler, false)
		}
	},
	removeHandler: function (ele, type, cb) {
		if (ele.detachEvent) {
			ele.detachEvent('on' + type, cb)
		} else {
			ele.removeEventListener(type, cb, false);
		}
		ele['on' + type] = null; //防止内存泄漏
	},
	getEvent: function (event) {
		return event ? event : window.event;
	},
	getTarget: function (event) {
		return event.target || event.srcElement;
	},
	preventDefault: function (event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnVauel = false;
		}
	},
	stopPropagation: function (event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancleBubble = true;
		}
	},
	parseDom:function (str) {
	　　 var objE = document.createElement("div");
	　　 objE.innerHTML = str;
	　　 return objE.childNodes;
	},
	scrollTopAnimate(selector){
		let timer;
		scrollTop();
		function scrollTop(){
			timer = setTimeout(function(){
				let top = document.querySelector(selector).scrollTop;
				let speed = Math.floor(-top / 7);
				document.querySelector(selector).scrollTop = top + speed;
				if(top == 0){
					clearTimeout(timer);
				}else{
					scrollTop();
				}
			},30);
		}   
	}
}