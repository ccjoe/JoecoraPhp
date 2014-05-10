
require.config({
    baseUrl: 'js',
    //paths为路径关系
    paths: {
        // 左侧是模块名称,
        // 右侧是模块路径
        // jQuery文件路径与baseUrl相关.
        jquery     : '../../../lib/min/jquery.min',

    },
    //shim为依赖关系
    shim:{
      "coraui.switch.min" : {
        deps : ['jquery']
      },
      "coraui.enswitch.min" : {
        deps : ['jquery','coraui.switch.min']
      },
      "coraui.slide.min":{
        deps : ['jquery','coraui.switch.min',"coraui.enswitch.min"]
      }
    },
    //加上时间戳
    urlArgs: "bust=" +  (new Date()).getTime()
});

//需要引用 coraui.enswitch.min,因为其已处理好依赖
require(["coraui.slide.min"], function() {
    $(function() {

      //Tab Demo 1  
      var i=0;

      $("#newLable").click(function(){
        i++;
        $(".utc1").swc("createItem","newTab"+i,"<h1>新的标题"+i+"</h1><p>新的内容"+i+"</p>"); 
        //
      });


      //Slide1 Demo 2  
      $(".utc2").swc({eventType:"click",
                      showType:"fade",
                      swcPosition:"br",
                      beforeSwc:function(item){
                        // console.log(this, item);
                      },
                      showSwc : function(){
                        // console.log(this);
                      },
                      hideSwc : function(){
                        // console.log(this);
                      }
                     }).swc("createBd").enswitch({
                      hoverShowBtn : true
                     });



      //Slide2 Demo 3 
                //首先tab化
      $(".utc3").swc({swcPosition:"br",         //按钮位置的配置;
                      eventType:"mouseover"})   //触发方式的配置
                //其次可自动切换化
                .enswitch({hoverShowBtn : true}) 
                //分组化
                .slide({ showGoto : false });

      //Slide2 Demo 4 
      $(".utc4").swc({swcPosition:"br", showType:"slide", eventType:"mouseover"})
                .enswitch({hoverShowBtn : false}) //鼠标经过显示按钮； 
                                                  //在slide里配置了showGoto：false的情况下，显示的是1,2,3等按钮 ，否则显示的是prev,next按钮
                .slide({perGrpnum : 3});          //合并几个item为一组


      //Slide2 Demo 4 
      $(".utc5").swc({swcPosition:"br", showType:"slide", eventType:"click"})
                .enswitch({hoverShowBtn : true, autoPlay:false}) //鼠标经过显示按钮； 
                                                  //在slide里配置了showGoto：false的情况下，显示的是1,2,3等按钮 ，否则显示的是prev,next按钮
                .slide({perGrpnum : 4, showGoto : false});          //合并几个item为一组

    });
});