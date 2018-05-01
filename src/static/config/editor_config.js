const editorConfig = {
    debug: false,
    modules: {
        toolbar: [['bold', 'italic'],[{ 'header': [1, 2, 3, 4, 5, 6, false] },'blockquote', 'code-block',{ 'list': 'ordered'}, { 'list': 'bullet' }], ['link', 'image'],['clean']]
    },
    // placeholder: 'write something here ......',
    theme: 'snow',
    scrollingContainer:'body'
};

export default editorConfig;