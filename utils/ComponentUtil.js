let ComponentUtil = {
    //加载后台管理公用的部分(leftMenu,Footer,Header)
    loadSystemCommonHtml:function(){
        $('.wrapper-nav').load('../../../common/admin/left.html',function(){
            var sc =  document.createElement("script");
            sc.src= "../../../../plugins/custom/customMenu/inspinia.js";
            $("body").append(sc);
        });
        $('.header-nav').load('../../../common/admin/head.html',function () {
            var sc =  document.createElement("script");
            sc.src= "../../../../plugins/custom/customMenu/inspinia.js";
            $("body").append(sc);
        });
        $('.footer').load('../../../common/admin/footer.html');
    }
};