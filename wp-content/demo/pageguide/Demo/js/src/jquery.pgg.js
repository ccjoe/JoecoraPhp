 /* __________________________
 * | Author  >|     Joe      |
 * | Email   >|     XXX      |
 * | 简介    >|  为容器内多  |
         目录文章添加自动导航 依据h1--h6识别定位点与层级  |
 * |__________|__________|
 */

 (function($){
  $.fn.guide = function(options){
    //混合参数
    options = options || {};
    //console.log($.fn.guide.defaults);
    opts = $.extend({},$.fn.guide.defaults,options);
    var $cont = $(this);

    init = function(){
      hxArrSet = _getHxLen();
      // 如果存在任意h1-h6
      if(parseInt(hxArrSet.join(""),10) > 0){

        //添加目录框架
        _showFrame();

        //按目录排序 
        addAnchor("linked");

        //排序，替换
        hxSort();
        
        //给目录增加样式
        styleGuide();

        if(opts.isScorllShow){
          scrollShow();
        }
      }else{
        return;
      }
    },
    
    //获取h1-h6各长度值
    _getHxLen = function(){
      var hxObj    = [],        //存放多级目录对象
        hxArr    = [];          //存放多级目录的数组
      for(var i=1; i<=6; i++){
        //hxObj.push($cont.find("h"+i));
        hxArr.push($cont.find("h"+i).length);
      }
      //返回包含hx的数据与hx长度的数据
      return hxArr;
    },  
  
    //创建容器
    _showFrame = function(){
      var $frameDom = $("<div class='"+opts.guideClass+"' />");
      $("body").prepend($frameDom);
    },    
    
    //创建锚点 是link Or Linked
    addAnchor = function(linkOrLinked){
        //遍历h1-h6
        var thishx;
        for(var i=0; i<=5; i++){
          //存在hx的情况

          if(hxArrSet[i] > 0){
            var j=i+1;
            //对每一个hx遍历
            for(var k=0; k<hxArrSet[i]; k++){

              if(linkOrLinked === "linked"){

                //创建锚点对象并添加class hx以便hx替换后a后按序查找
                thishx = $cont.find("h"+j).eq(k).addClass("h"+j);
                thishx.attr({"name":"to"+j+k,"id":"to"+j+k});

              }else if(linkOrLinked === "link"){

                //创建锚点链接    hx被替换成a，导致无法查找，因此以class查找 
                //去掉里层链接
                thishx = $("."+opts.guideClass).find(".h"+j).eq(k).attr({"href":'#to'+j+k});
                
                //目录序号无0则+1； h2显示1,2,3... h3显示2.1,2.2,....
                var m = k+1,    //序号第二位
                    n = j-1;    //序号第一位

                if(j === 2){          
                    thishx.prepend('<span>'+ m +'</span>');
                }else if(j > 2){
                    thishx.prepend('<span>'+ n+'.'+m +'</span>');
                }
                //替换标签后添加class以便不影响查找
                thishx.replaceWith('<a href="#to'+j+k+'" class="h'+ j +'">' + thishx.text()+ '</a>');
          
              }
  
            }
          }
        }         
    },
    
    //排序sort
    hxSort = function(){

      var newHxDom =$cont.find("h1,h2,h3,h4,h5,h6").clone();
      $("."+opts.guideClass).append(newHxDom);

      //添加锚点链接
      addAnchor("link");
      

    },

    //给导航添加样式 
    styleGuide = function(){
        var styleDom = $('<style></style');
        
        
        var guideFrame = 
        '.guide-frame { position : fixed; border : 1px solid #ddd; height : 300px; top:50%; right : 10px; margin-top : -150px; background-color : #fff; padding : 10px; overflow : auto; z-index : 10000}' +
        '.guide-frame a { display: block; font-size: 12px; color: #333; text-decoration: none; line-height : 24px; padding-left : 10px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-algin: left }' +
        '.guide-frame .h1{ font-weight: bold; border-bottom : 1px solid #ddd }' +
        '.guide-frame .h2{ color: #555; font-size: 13px; font-weight:bold; margin-bottom:1px;}' +
        '.guide-frame .h3{ margin-left: 15px; color: #666; font-size: 13px;  margin-bottom:2px; }' +
        '.guide-frame .h4{ margin-left: 30px; color: #777;  margin-bottom:4px;  }' +
        '.guide-frame .h5{ margin-left: 45px; color: #999;  margin-bottom:6px;  }' +
        '.guide-frame .h6{ margin-left: 60px; color: #aaa;   }';

        styleDom.html(guideFrame);

        $("head").append(styleDom);

    },

    scrollShow = function(){
      //滚动时相应显示所在条目
      
    };
    //启动
    init(); 
  }

  //默认参数
  $.fn.guide.defaults = {
    guideClass   : "guide-frame",
    isScorllShow : true
  }
 })(jQuery)