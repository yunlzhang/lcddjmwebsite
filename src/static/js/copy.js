util.addHandler(document.querySelector('body'),'copy',function(){
    if (typeof window.getSelection == "undefined") return; //IE8 or earlier...
			
    var body_element = document.getElementsByTagName('body')[0];
    var selection = window.getSelection();
    
    //if the selection is short let's not annoy our users
    if (("" + selection).length < 30) return;

    //create a div outside of the visible area
    //and fill it with the selected text
    var newdiv = document.createElement('div');
    newdiv.style.position = 'absolute';
    newdiv.style.left = '-99999px';
    body_element.appendChild(newdiv);
    newdiv.appendChild(selection.getRangeAt(0).cloneContents());
    
    //we need a <pre> tag workaround
    //otherwise the text inside "pre" loses all the line breaks!
    if (selection.getRangeAt(0).commonAncestorContainer.nodeName == "PRE") {
        newdiv.innerHTML = "<pre>" + newdiv.innerHTML + "</pre>";
    }
    
    newdiv.innerHTML += "著作权归作者所有。<br />商业转载请联系作者获得授权,非商业转载请注明出处。<br />原文: <a href='"
    + document.location.href + "'>"
    + document.location.href + "</a> &copy; <a href='//www.lcddjm.com'>www.lcddjm.com</a>";
            
    selection.selectAllChildren(newdiv);
    window.setTimeout(function () { body_element.removeChild(newdiv); }, 200);
})