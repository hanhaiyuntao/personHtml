/**
 * Created by 24028 on 2018/12/29.
 */
window.onload = function () {
    proTable();
};
/*
 * 二次ajax封装
 * */
var ajaxFun =  function(url,param){
    $.ajax({
        type:'post',
        url:url,
        dataType:'json',
        data:param,
        success:function(data){
            const result = data.data;
            console.log(data);
            var con = ''
            if(result !=null && result!='' && result.length>0){
                for(var i = 0;i<result.length;i++){
                    con +=`<tr>
                            <td>${result[i].shopname}</td>
                            <td>${result[i].shopintro}</td>
                            <td>${result[i].shopprice}</td>
                            <td>${result[i].shopnum}</td>
                            <td><button onclick="deleteList(${result[i].shopid})">删除</button><button onclick="editModel(${result[i].shopid},'${result[i].shopname}','${result[i].shopintro}','${result[i].shopprice}')">编辑</button></td>
                            </tr>`
                }
            }
            $("#sqlTable").html(con);
        },
        error:function(err){
            console.log(err);
        }
    })
}

/*
* 初始化表格
* */
function proTable(){
    ajaxFun('http://127.0.0.1:8081/user',null);
}

//查询表格
function search(){
    var name = $("#search").val();
    var intro = $("#intro").val();
    var obj={
        name:name,
        intro:intro
    };
    ajaxFun('http://127.0.0.1:8081/search',obj);
}


/*
*
* 新增数据
* */
function proList(){
    var proId = $("#proId").val();
    var proName = $("#proName").val();
    var proIntro= $("#proIntro").val();
    var proPrice= $("#proPrice").val();
    if(proName==null||proName==''){
        alert("商品名称不能为空")
        return
    }
    if(proIntro==null||proIntro==''){
       alert("商品介绍不能为空")
        return
    }
    if(proPrice==null||proPrice==''){
        alert("商品价格不能为空")
        return
    }

    var obj = {
        name:proName,
        intro:proIntro,
        price:proPrice,
    };
    if(proId!=null&&proId!=''){
        $("#model-title").html("修改商品");
        obj.id=proId;
        ajaxFun('http://127.0.0.1:8081/edit',obj);
        proTable();
    }else{
        $("#model-title").html("添加商品");
        ajaxFun('http://127.0.0.1:8081/add',obj);
        proTable();
    }

}
/*删除
* */
function deleteList(id){
    var obj = {
        id:id
    }
    if(id!=null&&id!=""){
        ajaxFun('http://127.0.0.1:8081/delete',obj);
        proTable();
    }
}

/*
* 添加出现
* */
function addModel(){
    $("#model-title").html("添加商品");
    $("#proId").val("");
    $("#proName").val("");
    $("#proIntro").val("");
    $("#proPrice").val("");
    $(".modal").show();
}
/*
* 编辑出现
* */
function editModel(id,name,intro,price){
    $("#model-title").html("编辑商品");
    $("#proId").val(id);
    $("#proName").val(name);
    $("#proIntro").val(intro);
    $("#proPrice").val(price);
    $(".modal").show();
}

/**
 * 确认添加或编辑
 * */
function addSure(){
    event.stopPropagation();
    proList();
    $(".modal").hide();
}
function addCancel(){
    $(".modal").hide();
}











