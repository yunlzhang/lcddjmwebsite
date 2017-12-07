function Comment(obj){
    this.result = '';
    var defaultOpts = {
        width:100,
        height:100,
        font:'16px "PingFang SC"',
        fillStyle:'#000',
        text:''
    }
    this.util = {
        getMost:function(arr){
            //获取数组中出现次数最多的元素
            var temp  = {};
            var tempArr = [];
            var result = '';
            for(var i = 0,len = arr.length; i<len;i++){
                if(!temp[arr[i]]){
                    temp[arr[i]] = 1;
                }else{
                    temp[arr[i]]++;
                }
            }
            for(var key in temp){
                tempArr.push(temp[key]);
            }
            tempArr.sort(function(a,b){
                return a - b; 
            })
            for(var key in temp){
                if(temp[key] === tempArr[tempArr.length - 1]) return key;
            }
        }
    } 
    this.opts = Object.assign({},defaultOpts,obj);
    var c;
    if(Object.prototype.toString.call(obj.ele) === '[object HTMLCanvasElement]'){
        this.c = obj.ele;
    }else{
        this.init();
    }
    var ctx = this.c.getContext('2d');
    this.c.width = this.opts.width;
    this.c.height = this.opts.height;
    ctx.font = this.opts.font;
    ctx.fillStyle = this.opts.fillStyle;
    this.ctx = ctx;
    this.fillText();
    this.generate();

}
Comment.prototype.init = function(){
    var body = document.querySelector('body');
    var canvas = document.createElement('canvas');
    body.appendChild(canvas);
    // canvas.style.display = 'none';
    this.c = canvas;
}
Comment.prototype.fillText = function(){
    this.ctx.fillText(this.opts.text,0,this.c.height-8);
}
Comment.prototype.drawImage = function(){
    var _this = this;
    var file = document.createElement('input');
    file.type = 'file';
    document.body.appendChild(file);
    file.click();
    file.onchange = function(e){
        var reader = new FileReader();
        reader.onload = (function (file) {
            return function(){
                var src = this.result;                      
                var newImg = new Image();
                newImg.onload = function(){
                    _this.c.width  = this.width/10;
                    _this.c.height = this.height/10;
                    _this.ctx.drawImage(newImg,0,0,this.width/10,this.height/10);
                    _this.generate();
                }
                newImg.src = this.result;
            }   
        })(e.target.files[0]);
        reader.readAsDataURL(e.target.files[0]);
    }
}
Comment.prototype.generate  = function(){
    var data = Array.prototype.slice.call(this.ctx.getImageData(0,0,this.c.width,this.c.height).data);
    var tempArr = [];
    var html = '';
    for(var i = 0,len = data.length/4;i < len; i++){
        tempArr.push(data.slice(4*i,4*i+4).join(''));
    }
    var normalSpot = this.util.getMost(tempArr);
    for(var j = 0,len = tempArr.length;j<len;j++){
        if(tempArr[j] !== normalSpot){
            html += '*';   
        }else{
            html += ' ';
        }
        if((j+1) % this.c.width === 0){
            html += '\n\r';        
        }
    }
    this.result = html;
}

Comment.prototype.get = function(){
    return this.result;
}

var personComment = new Comment({
    width:70,
    height:30,
    font:'20px "PingFang SC"',
    fillStyle:'#000',
    text:'XXXX'
});