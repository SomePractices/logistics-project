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
//调用modules
var Staff = require('./modules/staff');
//链接数据库
mongoose.connect('mongodb://localhost/logistics');
// 设置根目录及模板引擎
app.set('views', './views/pages');
app.set('view engine', 'jade');

// 调用bodyParser，及bootstrap等
app.use(bodyParser.urlencoded({extend: true}));
app.use(serveStatic('bower_components'));
app.use(serveStatic('public'));
// 调用是时间框架
app.locals.moment = require('moment');

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
app.get('/staffs/list', function (req, res) {
    Staff.fetch(function (err, staffs) {
        if (err) {
            console.log(err);
        }

        res.render('staff-information', {
            title: '员工信息列表',
            staffs: staffs
        })
    });
});
// 员工详情
app.get('/staffs/:id', function (req, res) {
    var id = req.params.id;
    Staff.findById(id, function (err, staff) {
        res.render('staff-detail', {
            title: '员工：' + staff._id,
            staff: staff
        })
    });
});
// 员工录入
app.get('/admin/staff', function (req, res) {
    res.render('staff-add', {
        title: '员工信息录入页',
        staff: {
            _id: '',
            name: '',
            sex: '',
            department: '',
            tel: '',
            native: '',
            other: ''
        }
    })
});
// 添加员工
app.post('/admin/staff/new', function (req, res) {
    var id = req.body.staff._id;
    var staffObj = req.body.staff;
    var _staff;

    Staff.findById(id, function (err, staff) {
        if(staff == undefined) {
            staff = new Staff({
                _id:staffObj._id,
                name:staffObj.name,
                sex:staffObj.sex,
                department:staffObj.department,
                tel: staffObj.tel,
                native:staffObj.native,
                other: staffObj.other
            });
        }
        _staff = _.extend(staff, staffObj);
        _staff.save(function (err, staff) {
            if (err) {
                console.log(err);
            }
            res.redirect('/staffs/list');
        })
    })

});

// 商品信息页面
app.get('/goods/list', function (req, res) {
    res.render('goods-information', {
        title: '商品信息列表',
        goods: [{
            _id: '20161010001',
            name: '冰箱',
            type: '电器',
            number: 100,
            warehouse: '01库',
            other: ''
        }, {
            _id: '20161010002',
            name: '四级单词',
            number: '200',
            type: '图书',
            warehouse: '02库',
            other: ''
        }]
    })
});
// 仓库信息页面
app.get('/warehouses/list', function (req, res) {
    res.render('warehouse-information', {
        title: '仓库信息列表',
        warehouses: [{
            _id: '0001',
            name: '城南仓库',
            address: '陕西省西安市城南...',
            manager: '张三',
            other: ''
        }, {
            _id: '0002',
            name: '城北仓库',
            address: '陕西省西安市城北...',
            manager: '李四',
            other: ''
        }]
    })
});

app.listen(port);
console.log('the process start on port ' + port);

