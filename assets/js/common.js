
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
/**
 *
 * 加载公共头部和尾部
 * */
$("#footer").load('footer.html');
$("#header").load('header.html');


/*
*
* 拷贝执行粘贴板加版权
* */
document.addEventListener('copy', function (event) {
    var clipboardData = event.clipboardData || window.clipboardData;
    if (!clipboardData) { return; }
    var text = window.getSelection().toString();
    if (text) {
        event.preventDefault();
        clipboardData.setData('text/plain', text + '\n\n瀚海云涛个人网站版权所有\nwww.hanhaityntao.top');
    }
});


/*
* 鼠标点击显示文字
* */
var fnTextPopup = function (arr, options) {
    // arr参数是必须的
    if (!arr || !arr.length) {
        return;
    }
    // 主逻辑
    var index = 0;
    document.documentElement.addEventListener('click', function (event) {
        var x = event.pageX, y = event.pageY;
        var eleText = document.createElement('span');
        eleText.className = 'text-popup';
        this.appendChild(eleText);
        if (arr[index]) {
            eleText.innerHTML = arr[index];
        } else {
            index = 0;
            eleText.innerHTML = arr[0];
        }
        // 动画结束后删除自己
        eleText.addEventListener('animationend', function () {
            eleText.parentNode.removeChild(eleText);
        });
        // 位置
        eleText.style.left = (x - eleText.clientWidth / 2) + 'px';
        eleText.style.top = (y - eleText.clientHeight) + 'px';
        // index递增
        index++;
    });
};

fnTextPopup(['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善']);
