
/*小屏幕导航点击关闭菜单*/
if (screen.width < 769){
  $(".navbar-collapse a").click(function(){
     $(".navbar-collapse").collapse("hide");
  }); 
}
// 选项卡
$(document).ready(function () {

  $(".tab li").click(function(){
  $(".tab li").eq($(this).index()).addClass("cur").siblings().removeClass('cur');
  $(".tab_details").hide().eq($(this).index()).show();
  });

});

    $("#footer").load('footer.html');
    $("#header").load('header.html');
