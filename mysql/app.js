// app.js
var express = require('express');
var body_parser = require('body-parser');
var app = express();

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

function getDb() {
    var mysql = require('mysql');
    var conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'whtdb'
    });
    conn.connect();
    return conn;
}
var db = getDb();
app.use(body_parser.urlencoded({
    extended: false
}));
/*
* 初始化列表
* */
app.post('/user', function (req, res) {
    var db = getDb();
    db.query('select * from expressdb;', null, function (error, result) {
        var obj = {
            status: 200,
            data: result
        };
        if(result!= null||result!='null'||result!=''){
            obj.data = result;
            obj.msg='请求成功';
            obj.code='200';
            res.json(obj);
        }else{
            obj.msg=error;
            obj.code='500';
            res.json(obj);
        }

    })
});

/**
 * 查询数据
 * */
app.post('/search', function (req, res) {
    var shopname = req.body.name;
    var shopintro = req.body.intro;
    var sql = 'select * from expressdb where 1=1 ';
    if(shopname!=null &&  shopname!='' && shopintro!= null &&shopintro!='')
    {
        sql += " and  (shopname like  '%"+ shopname +"%' or shopintro like  '%"+ shopintro +"%')"
    }else
    {
        if(shopname!=null &&  shopname!=''){
            sql += " and  shopname like  '%"+ shopname +"%'"
        }
        if(shopintro!= null &&shopintro!=''){
            sql += " and  shopintro like  '%"+ shopintro +"%'"
        }
    }
    db.query(sql, null, function (error, result) {
        if(result!= null||result!='null'||result!=''){
            var obj = {
                code: 200,
                data: result
            };
            //console.log(obj);
            res.json(obj);
        }else{
            console.log(error);
        }

    })
});


/*
* *刷新表
* */
function applySql(sql,obj){
    db.query(sql, null, function (error, result) {
        if(result!= null||result!='null'||result!=''&&result.affectedRows==1){
            obj.msg='请求数据成功'
            obj.code=200;
            obj.data=result;
        }else{
            obj.code=500
            obj.msg='服务器内部错误';
        }
        return obj;
    });

}

/*
*
* 新增商品
*
* */
app.post('/add', function (req, res) {
    var shopname = req.body.name;
    var shopintro = req.body.intro;
    var shopprice = req.body.price;
    var obj = {};
    if(shopname!=null&&shopintro!=null&&shopprice!=null&&shopname!=''&&shopintro!=''&&shopprice!=''){
        var sql = 'insert into expressdb(shopname,shopintro,shopprice,shopnum) value("'+shopname+'","'+shopintro+'","'+shopprice+'",0)';
        applySql(sql,obj);
    }else{
        obj.msg='请求参数错误缺失';
        obj.code='500';
    }
    console.log(sql);
});



/*
 *
 * 编辑商品
 * */
app.post('/edit', function (req, res) {
    var shopid = req.body.id;
    var shopname = req.body.name;
    var shopintro = req.body.intro;
    var shopprice = req.body.price;
    var obj = {
    };
    if(shopname!=null&&shopintro!=null&&shopprice!=null&&shopname!=''&&shopintro!=''&&shopprice!=''){
        var sql = 'update expressdb set shopname="'+shopname+'",shopintro="'+shopintro+'",shopprice="'+shopprice+'" where shopid="'+shopid+'"';
        applySql(sql,obj);
    }else{
        obj.msg='请求参数错误缺失';
        obj.code='500';
    }
    console.log(sql);

});

/*
 *
 * 删除商品
 * */
app.post('/delete', function (req, res) {
    var shopid = req.body.id;
    var obj = {
    };
    if(shopid!=null&&shopid!=''){
        var sql = 'delete from expressdb where shopid="'+shopid+'"';
    }else{
        obj.msg='请求参数错误缺失';
        obj.code='500';
    }
    console.log(sql);
    applySql(sql,obj);
});



var server = app.listen(8081, function () {
    console.log('run http://localhost:8081');
});
