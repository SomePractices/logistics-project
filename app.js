// 加载 express
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var _ = require('underscore');
var serveStatic = require('serve-static');
// 设置端口号
var port = process.env.PORT || 3000;
var app = express();

// 设置根目录及模板引擎
app.set('views', './views/pages');
app.set('view engine', 'jade');

// 调用bodyParser，及bootstrap等
app.use(bodyParser.urlencoded({extend: true}));
app.use(serveStatic('bower_components'));
app.use(serveStatic('public'));
// 首页 index.jade
app.get('/', function (req, res) {
    res.render('index', {
        title: '首页'
    })
});

// 基本信息管理
app.get('/basic', function (req, res) {
    res.render('basic-information', {
        title: '基本信息管理'
    })
});
// 员工信息页面
app.get('/users/list',function (req,res) {
    res.render('staff-information',{
        title: '员工信息列表',
        users:[{
            _id:'20161010001',
            name:'张三',
            sex:'男',
            department:'01部',
            tel:'12345678909',
            native:'陕西',
            other:''
        },{
            _id:'20161010002',
            name:'李四',
            sex:'男',
            department:'02部',
            tel:'12345678945',
            native:'山西',
            other:''
        }]
    })
});
// 商品信息页面
app.get('/goods/list',function (req,res) {
    res.render('goods-information',{
        title: '商品信息列表',
        goods:[{
            _id:'20161010001',
            type:'电器',
            warehouse:'01库',
            other:''
        },{
            _id:'20161010002',
            type:'图书',
            warehouse:'02库',
            other:''
        }]
    })
});

app.listen(port);
console.log('the process start on port ' + port);

