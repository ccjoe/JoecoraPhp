/** _______________________________________
 * | @author  >|   Joe                    |
 * | @email   >|   icareu.joe@gmail.com   |
 * | @date    >|   2014-04-16 13:51:13    |
 * | @content >|   switch                 |
 * |___________|__________________________|
 */

(function($){

  var Slide = function(opts,ithis){
    this.switchs = $._data(ithis,"swc");
    this.enswitch = $._data(ithis,"enswitch");
    this.opts = $.extend({}, this.switchs.opts, this.enswitch.opts, opts);
    this.$dom = $(ithis);
    initSlide.call(this,this.opts);
  };


  function initSlide(opts){
      var _t = this;
      //分组前$swcConts为各子项/面板外层
      var $swcConts = this.switchs.getSwcCont(),
          $SwcPane  = this.getSldPane(),
          $swcList  = this.switchs.getSwcList();

      var gnum = Math.ceil( $swcConts.length / opts.perGrpnum );
      
      //分组
      for(var i=0; i<gnum; i++){
        $swcConts.slice(opts.perGrpnum*i, opts.perGrpnum*(i+1) ).wrapAll('<div class="clearfix ui-swc-cont '+ opts.grpClass + '" />');
      }   
      
      //分组后重新调整UI
      this.grpUi( this.$dom.width() );

      var $gSwcCon   = this.getGrpItems();
      //如果显示左右按钮
      if( opts.showGoto ){
        $swcList.hide();
        var $gotoWrap = this.showGoto();

        console.log(opts);
        //取消绑定之前鼠标经过组件显示数字按钮的事件，再绑定显示前后按钮
        if( opts.hoverShowBtn ){

          this.$dom.off().hover(function(){
            $gotoWrap.show(); 
          },function(){
            $gotoWrap.hide(); 
          })
        }else{
           $gotoWrap.show(); 
        }

        i = 0;

        $gotoWrap.on("click","a.goto",function(){
          var $t = $(this);

          if( $t.hasClass("prev") && i <= gnum ) {
             i = i > 0 ? i : gnum;
            _t.slideTo(--i)

          }else if(  $t.hasClass("next") && i >= 0 ) {
             i = i < gnum-1  ? i : -1;
            _t.slideTo(++i) 

          }

          console.log(i);

          return false;
        })
      }


      //显示效果为slide时
      if( opts.showType === "slide" ){
        //取消原事件绑定，因为switch采用的是显隐的方式，不能左右滑动。
        $swcList.off();

        $swcList.on(opts.eventType, "li", function(){
          //alert("test");
          var $t = $(this);
          $t.addClass( "ui-swc-active" ).siblings().removeClass("ui-swc-active");  
          //否则显示为数字按钮
          _t.slideTo( $t.attr("index") ); 
        });

        //分组后
        $SwcPane.width( gnum * $gSwcCon.outerWidth() ).css({"position" : "relative"});
        $gSwcCon.css({
          "float" : "left"
        });
      }
      
  }


  Slide.prototype = {
      getGrpItems : function(){
        return this.switchs.getSwcPane().find("."+ this.opts.grpClass);
      },

      getSldPane : function(){
        return this.switchs.getSwcPane();
      },

      slideTo : function(i){
        this.getSldPane().animate({
          "left" : -1 * this.getGrpItems().outerWidth() * i
        })
      },

      sldPrev : function(i){
        this.slideTo(i-1);
      },

      sldNext : function(i){
        this.slideTo(i+1);
      },

      showGoto : function(){
        var $prev = $("<a href='' class='goto prev' title='prev'>PREV</a>"),
            $next = $("<a href='' class='goto next' title='next'>NEXT</a>"),
            $gotoWrap = $('<div class="goto-wrap" />');

        $prev.css({"position":"absolute","top":"20px"});
        $next.css({"position":"absolute","top":"20px","right":"0"});        
        this.$dom.append( $gotoWrap.append($prev,$next).hide() );
        return $gotoWrap;
      },

      grpUi : function(domWidth){      
        //分组后每项/每项的子项
        var $gSwcCon   = this.getGrpItems(),
            $gSwcConts = $gSwcCon.find(".ui-swc-cont");

        this.$dom.css({"overflow" : "hidden"});
        $gSwcConts.show();

        //将slide初始时没有分组时隐藏的元素显示,控制父元素的显隐
        $gSwcConts.css({
          "width": Math.floor(domWidth/this.opts.perGrpnum) - 2,
          "float": "left" ,
          "overflow" : "hidden",
          "border-right": "1px solid #aaa"
        });
      }
  };

  $.fn.extend({
    slide: function(options) {
      var args = [].slice.call(arguments, 1);
      return this.each(function(){
        var ui = $._data(this, "slide");
        if (!ui) {
          var opts = $.extend(true, {}, $.fn.slide.defaults, typeof options === "object" ? options : {});
          ui = new Slide(opts, this);
          $._data(this, "slide", ui);
        }
        if(typeof options === "string" && typeof ui[options] == 'function'){
          ui[options].apply(ui, args);  //执行插件的方法
        }
      });
    }
  });

  $.fn.slide.defaults = {
    autoPlay : true,
    autoTime : 3000,
    showGoto : true,          //显示为数字按钮false,进退按钮true
    perGrpnum: 5,             //几个item为一组
    grpClass : 'g-item',
    //配置了showGoto的情况下，配置这个显示的是prev,next按钮，否则显示的是1,2,3等按钮 
  }

})(jQuery)