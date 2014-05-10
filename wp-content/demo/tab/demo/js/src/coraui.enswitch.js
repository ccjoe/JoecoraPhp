/** _______________________________________
 * | @author  >|   Joe                    |
 * | @email   >|   icareu.joe@gmail.com   |
 * | @date    >|   2014-04-16 13:51:13    |
 * | @content >|   switch                 |
 * |___________|__________________________|
 */

(function($){
  /**
   * Switch 插件
   * @class switch
   * @param {Object} opts 
   */
  var EnSwitch = function(opts,ithis){

    //获取需要继承的switch实例
    this.switchs = $._data(ithis,"swc");

    //console.log(this,ithis); 混合参数
    this.opts = $.extend({}, opts, this.switchs.opts);

    //Dom实例
    this.$dom = $(ithis);

    initEnSwicth.call(this,opts);
 
  };


  function initEnSwicth(opts){
    // console.log("initEnSwicth RUN");
    if( opts.autoPlay ){
      this.autoPlay();
    }

    // console.log(this.switchs);
    if(opts.hoverShowBtn){
      var $swclist = this.switchs.getSwcList();
      //首先隐藏
      $swclist.hide();

      this.$dom.hover(function(){
        $swclist.fadeIn();
      },function(){
        $swclist.fadeOut();
      })
    }
  }

  /**
   * @memberof EnSwitch
   * @public  
   * @member  
   * @return {$} jquery对象
   */

  EnSwitch.prototype = {
    autoPlay : function(){
      var _t = this, i = 0;

      _t.$dom.data('timeid', setTimeout(playthis, _t.opts.autoTime));

      //console.log( _t.$dom.data('timeid') );
      //setInterval(playthis, _t.opts.autoTime);           
/*
      swcItems.on(this.opts.eventType, function(){
        i = $(this).attr("index");
      }); */

      function playthis(){
/*        console.log("索引值到： " + i);
        _t.playItem(i++);
        if( i >=_t.switchs.getSwcItems().length )
          i = 0;*/
        _t.next();
        setTimeout(playthis, _t.opts.autoTime);
      }   
    },



    playItem : function(i){
      //console.log(this.opts);
      // console.log("playItem RUN");
      this.switchs.getSwcItems().eq(i).trigger( this.opts.eventType );
    },

    next : function(){
      
      var $cutItem = this.switchs.getCutItem();
          $allItem = this.switchs.getSwcItems();

      parseInt( $cutItem.attr("index") , 10 ) !== $allItem.length - 1  ?
      $cutItem.next().trigger( this.opts.eventType ) :
      $allItem.first().trigger( this.opts.eventType ) ;
      //console.log( $cutItem.attr("index") !== $allItem.length - 1 );
    },

    prev : function () {
      var $cutItem = this.getCutItem();
          $allItem = this.getSwcItems();
          
      $cutItem.attr("index") !== 0 ?
      $cutItem.prev().trigger( this.opts.eventType ) :
      $allItem.last().trigger( this.opts.eventType ) ;
    },

    //返回当前enSwitch的$DOM
    getSwc : function(){
      return this.switchs; 
    }
  };

  //转换为插件风格去执行
  $.fn.extend({
    enswitch: function(options) {
      //遍历匹配的元素集合
      var args = [].slice.call(arguments, 1);

      //this指向jQuery对象
      return this.each(function(){

        //this指向jQuery对象的遍历单项
        var ui = $._data(this, "enswitch");
        //console.log("否实例化过:" + ui);
        //判断是否实例化过
        if (!ui) {
          var opts = $.extend(true, {}, $.fn.enswitch.defaults, typeof options === "object" ? options : {});

          //ui 即为实例化的 Tab
          ui = new EnSwitch(opts, this);
          
          //实例化后在上面添加标识;
          $._data(this, "enswitch", ui);

          //console.log( $._data(this, "enswitch") );
        }

        //如果参数为字符串，或函数则 ui即Tab实例上的方法执行在Tab上,参数为options对象
        if(typeof options === "string" && typeof ui[options] == 'function'){
          //console.log("调用到enswitch公有方法");
          ui[options].apply(ui, args);  //执行插件的方法
        }

      });
    }

  })

  $.fn.enswitch.defaults = {
    autoPlay : true,
    autoTime : 5000,
    hoverShowBtn: false        
  }

})(jQuery)