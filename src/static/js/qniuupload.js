function uploadImg(id,path,cb){
    var _this = this;
    var uploader = Qiniu.uploader({
        disable_statistics_report: false, // 禁止自动发送上传统计信息到七牛，默认允许发送
        runtimes: 'html5,flash,html4', // 上传模式,依次退化
        browse_button: 'qiniu-upload', // 上传选择的点选按钮，**必需**
        get_new_uptoken: true, // 设置上传文件的时候是否每次都重新获取新的 uptoken                
        uptoken_url: '/api/gettoken',         // Ajax 请求 uptoken 的 Url，**强烈建议设置**（服务端提供）
        unique_names: false,
        save_key: false,
        domain: 'http://oy02r7jyx.bkt.clouddn.com', // bucket 域名，下载资源时用到，如：'http://xxx.bkt.clouddn.com/' **必需**
        container: id, // 上传区域 DOM ID，默认是 browser_button 的父元素，
        max_file_size: '100mb', // 最大文件体积限制
        flash_swf_url: '../static/js/plupload/Moxie.swf', //引入 flash,相对路径
        max_retries: 3, // 上传失败最大重试次数
        dragdrop: true, // 开启可拖曳上传
        drop_element: id, // 拖曳上传区域元素的 ID，拖曳文件或文件夹后可触发上传
        chunk_size: '4mb', // 分块上传时，每块的体积
        auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
        init: {
            'FilesAdded': function (up, files) {
                plupload.each(files, function (file) {
                    // 文件添加进队列后,处理相关的事情
                });
            },
            'FileUploaded': function (up, file, info) {
                var res = JSON.parse(info.response);
                var sourceLink = 'https://image.lcddjm.com' +'/'+ res.key; //获取上传成功后的文件的Url
                if(typeof cb == 'function'){
                    cb(_this,sourceLink);
                }
            },  
            'Error': function (up, err, errTip) {
            },
            'Key': function (up, file) {
                return path+file.name
            }
        }
    });
}