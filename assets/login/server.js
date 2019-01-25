/**
 * Created by 24028 on 2019/1/3.
 */
/**
 * Created by 24028 on 2018/12/27.
 */
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
        host: '101.201.108.63',
        port:3308,
        user: 'root',
        password: 'root',
        database: 'whtdb'
    });
    conn.connect();
    return conn;
}

// 响应一个JSON数据
var responseJSON = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '-200',
            msg: '操作失败'
        });
    } else {
        console.log(ret)
        res.json(ret);
        console.log("反馈前端成功")
    }
};
var db = getDb();
app.use(body_parser.urlencoded({
    extended: false
}));



function applySql(sql,obj){
    db.query(sql, null, function (error, result) {
        if(result!= null||result!='null'||result!=''&&result.affectedRows==1){
            console.log("影响成功")
            obj.msg='请求数据成功'
            obj.code=200;
            obj.data=result;

        }else{
            obj.code=500
            obj.msg='服务器内部错误';
            console.log(error)
        }
        return obj;
    });

}

app.post('/reg',function(req,res){
    var param = req.body;
    var name = param.uname;
    var psw = param.upsw;
    var _res = res;
    var sql = 'select * from user where 1=1'
    db.query(sql, null, function (error,result) {
        if(result!= null||result!='null'||result!=''){
            var isTrue = false;
            if(res){
                for(var i = 0;i<result.length;i++){
                    if(result[i].name ==name&& result[i].psw == psw){
                        isTrue = true;
                    }
                }
            }
            var obj = {};
            obj.isreg = !isTrue;
            if(isTrue){
                console.log("用户存在");
                obj = {
                    code:300,
                    msg:'用户已存在',
                    data:''
                }
            }else{
                console.log("插入成功")
                var insertSql = 'insert into user(name,psw) value("'+name+'","'+psw+'")';
                applySql(insertSql,obj);

            }
            // 以json形式，把操作结果返回给前台页面
            setTimeout(function () {
                responseJSON(_res, obj);
            },300);
        }else{
            console.log(error);
        }

    })
});

app.post("/login",function(req,res){
    var param = req.body;
    var loginname = param.uname;
    var password = param.upsw;
    var _res = res;
    var sql = 'select * from user where 1=1'
    db.query(sql, null, function (error, result) {
        if(result!= null||result!='null'||result!=''){
            var isTrue = false;
            if(_res){
                for(var i = 0;i<result.length;i++){
                    if(result[i].name ==loginname&& result[i].psw == password){
                        isTrue = true;
                    }else{
                        isTrue = false;
                    }
                }
            }
            var obj = {};
            obj.isreg = !isTrue;
            if(isTrue){
                obj.userInfo = {};
                obj.userInfo.loginname = loginname;
                obj.userInfo.password = password;
                console.log("进入存在")

                if(result){
                    result = {
                        code : 200,
                        msg:'用户登录成功'
                    }
                    obj.result = result;
                    // 以json形式，把操作结果返回给前台页面
                    setTimeout(function () {
                        responseJSON(_res, obj);
                    },300);
                }
            }else{

                result = {
                    code : 301,
                    msg:'用户不存在或密码错误'
                }
                obj.result = result;
                setTimeout(function () {
                    responseJSON(_res, obj);
                },300);
            }


        }else{
            console.log(error);
        }

    })
});




var server = app.listen(6005, function () {
    console.log('run http://localhost:6005');
});
