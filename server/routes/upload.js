var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })


router.post('/upload', upload.array(),function(req,res,next){
    console
});