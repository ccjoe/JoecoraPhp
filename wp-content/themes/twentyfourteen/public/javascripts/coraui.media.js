/** _______________________________________
* | @author  >|   Joe                    |
* | @email   >|   icareu.joe@gmail.com   |
* | @date    >|   2014-04-16 13:51:13    |
* | @content >|   switch                 |
* |___________|__________________________|
*/

(function($){

  /**构造函数 Media
   * @Class
   * @param {Object,$} opts,ithis 
   */
  function Media(opts,ithis) {
    
    var _t = this;              //播放器对象
    this.player = $(ithis);       //播放器整体$元素
    this.opts = opts;
    initMedia.call(this, opts, songit); 
    
    /** songer为获取到的Song实例对象 */
    function songit( data ){
        _t.song = data;             //song - 为数据对象
        _t.showIndexInfo( _t.getSongData()[0], _t.getSongData()[0].abSong[0] );      //首先载入第一首歌曲信息
        opts.autoPlay ? _t.t = setTimeout(function(){ _t.initPlay() }, opts.timeout) : false;      
        initUi.call(_t, opts);      //回调后获取数据才能执行initUi,否则initUi获取不到Media上的songer实例
    }
  }

  /** 
   * 初始化播放器 
   * 闭包返回回调函数返回的值
   */
  function initMedia(opts, callback){
    getMusicInfo(opts.url);
    function getMusicInfo(url){
      $.ajax({
          url: url,
          dataType:"json"
      }).done( callback ).fail(
          function() {  alert("获取信息失败") }
      );
    }

    return callback;
  }

  /** 初始化播放器UI */
  function initUi(opts){
        //alert("test");
    var player = this.player,n=0,
    songer = this, 
    mc     = this.mediaCenter(),
    $btnArea =  player.find(".btn-area"),
    $timeArea =  player.find(".progress");

    songer.setVolume( mc.volume ); //初始获取设置音量
  
    $btnArea.on("click", ".btn", clickUi);
    player.find(".prog-wrap").on("click", showTimeProg);  

    //初始播放模式
    player.find('i[circletype="'+opts.initCircle+'"]').removeClass("hide").siblings().addClass("hide");   

    //如果设置了初始隐藏播放器
    if(opts.autoHide)
      setTimeout(function(){songer.togglePlayer(player)}, opts.initTimeHide);

    /** 点击跳转到相应位置 */
    function showTimeProg(){
      //如果还没开始播放，返回
      if( songer.mediaCenter().paused )   
        return;
      var $t = $(this);
      var clkVal = getClickVal(event, $t, "align");
      //////console.log(clkVal);
      $timeArea.width( clkVal * $t.width() );
      songer.mediaTime( clkVal );

    }

    function clickUi(){

      var $t = $(this);
      //初始歌曲按钮
      
      /**
        * 下面按钮区
        */
      //绑定事件相关处理
      if( $t.hasClass("next") ){
        //如果还没开始播放，先播放
        if( songer.mediaCenter().paused )   
          $t.siblings().first().trigger("click");
        songer.next(); return;
      }
      if( $t.hasClass("prev") ){
         //如果还没开始播放，先播放
        if( songer.mediaCenter().paused )   
          $t.siblings().first().trigger("click");
        songer.prev(); return;
      }
      if( $t.hasClass("pause") ){
        songer.pause();
        return;
      }

      if( $t.hasClass("play") ){

          if(n === 0){  //仅执行一次
            clearTimeout(songer.t);   //清除初始延迟
            songer.initPlay() 
            n++;  return;       
          }else{
            songer.play(); return;
          }    
      }

      if( $t.hasClass("slist") ){
        $t.toggleClass("active"); return;
      }

      if( $t.hasClass("lrc") ){
        $t.toggleClass("active");
        $t.hasClass("active") ? player.find(".lrc-area").fadeIn("slow") : player.find(".lrc-area").fadeOut("slow"); return;
      }

      /**
        * 上面按钮区
        */
      if( $t.hasClass("fa-star") || $t.hasClass("fa-heart") ){
        $t.toggleClass("active"); return;
      }

      // 播放模式选择
      if( ( $t.hasClass("fa-random") || $t.hasClass("fa-list-ul") || $t.hasClass("fa-refresh") ) && !$t.parent().hasClass("select") ){
        // var $tp = $t.parent();
        //用Class select来决定是否发生什么样的事件 
        $t.parent().addClass("select").end().siblings().removeClass("hide"); return;
      }

      if( $t.parent().hasClass("select") ){
        $(this).parent().removeClass("select").end().siblings().addClass("hide"); return;
      }

      // 音量选择 点击显示所有(无v-select时是发生的条件之一), 添加class v-select以便绑定打开音量后操作.
      if( ( $t.hasClass("fa-volume-off") || $t.hasClass("fa-volume-up") ) && !$t.parent().hasClass("v-select") ){
        //var $tp = $t.parent();
        $t.addClass("hide").parent().addClass("v-select").end().siblings().removeClass("hide"); return;
      }

      //选择静音或非静音时
      if( $t.parent().hasClass("v-select") && !$t.hasClass("prog")){
        $(this).parent().removeClass("v-select").end().siblings().addClass("hide");
        if($t.hasClass("fa-volume-off"))
              songer.onMute() //静音
        if($t.hasClass("fa-volume-up"))
              songer.offMute() //静音
        return;
      }

      //选择音量杆时
      if( $t.hasClass("prog") && $t.parent().hasClass("v-select") ) {
          var $elem = $t.find(".prog-bar");
          var VolumnVal = getClickVal(event, $elem, "verticle");

          //设置音量
          songer.setVolume(VolumnVal);
          return;
      }

    }

    //获取e发生处距$elem的距离 0 -> 1之间的比率 (水平a == align / 垂直v = verticle)
    function getClickVal(e, $elem, av){
      //点击处的Y值，点击的元素的Y值，元素的高度， 点击处距元素顶的高度

      var elemSize, elemPos, mousePos;

      if(av === "verticle"){
        elemSize = $elem.height(),
        elemPos  = $elem.offset().top,
        mousePos = e.pageY;
        needVal =  elemSize + elemPos - mousePos;
      }else if(av === "align"){
        elemSize = $elem.width(),
        elemPos  = $elem.offset().left,
        mousePos = e.pageX
        needVal = mousePos - elemPos;
      }

      //////console.log( mousePos , elemPos , elemSize, needVal);

      needVal = needVal > elemSize ? elemSize : needVal;
      needVal = needVal < 0 ? 0 : needVal;

      return needVal/elemSize
    }


  }



  Media.prototype  = {
    mediaCenter : function(){
      return $("#Media")[0];
    },

    getSongData : function(){
      return this.song.songData;
    },

    initPlay : function(){
       switch(this.opts.initCircle){
        case "list":
          this.playIndex(0,0);         //非自动播放播放第一首
          break;
        case "random":
          this.random();
          break;
        case "single":
          this.playIndex(0,0);         //非自动播放播放第一首
          break;
       }

    },

    play : function(){
        this.mediaCenter().play();    //自动播放则播放
        this.toggleTimeShow(true);    //播放进度实时显示
        //console.log("play");
        this.rpClass("play","pause");
        this.rpClass("fa-play", "fa-pause");
        this.lrcRealTimeMove();       //实时显示歌词某句
    },
    
    pause : function(){
        this.mediaCenter().pause();
        this.toggleTimeShow(false);   //播放进度定时器取消

        this.rpClass("pause","play");
        this.rpClass("fa-pause", "fa-play");
    },
    /** 下一曲 */
    next : function(){
        
        var index = this.getLabel(),
            cir   = this.getCirType();
        if(cir === "list")  //顺序播放
          this.playIndex(index.ai, index.si + 1);
        if(cir === "random")//随机播放
          this.random();
        if(cir === "single")//单曲播放
          this.single();
    },
    /** 上一曲 */
    prev : function(){
         var index = this.getLabel(),   //当前标识的歌曲
            cir    = this.getCirType();  
            ////console.log(cir);
        if(cir === "list")  //顺序播放
           this.playIndex(index.ai, index.si - 1);
        if(cir === "random")//随机播放
          this.random();
        if(cir === "single")//单曲播放
          this.single();
    },

    /** 随机循环 */
    random : function(){
      var songData  = this.getSongData(),
          albumNum  = songData.length,        
          randomAlbum = Math.floor( Math.random()* albumNum ), //随机专辑
          albumSongNum = songData[randomAlbum].abSong.length, 
          randomAlbumSong = Math.floor( Math.random() * albumSongNum );  //随机专辑中随机歌曲
          ////console.log(randomAlbum, randomAlbumSong);
      this.playIndex(randomAlbum, randomAlbumSong);
    },

    /** 单曲循环 */
    single : function(){
        var index = this.getLabel();  //当前标识的歌曲
        this.playIndex(index.ai, index.si);
    },

    /** 打开静音 */
    onMute : function(){
        this.mediaCenter().muted = true;
    },
    /** 关闭静音 */
    offMute : function(){
       this.mediaCenter().muted = false;
    },
    /** 播放专辑索引ai 与歌曲索引 si */
    playIndex : function(ai, si){
       var mc = this.mediaCenter(), 
           song = this.getSongData();

       //////console.log(ai,si, song.length, song[ai].abSong.length);
       
       //判断歌曲索引是否超出范围
       if(si > song[ai].abSong.length-1){
          ai++; si = 0;
       }else if(si < 0){
          ai--; 
          si = ai >=0 ? song[ai].abSong.length-1 : 0;
       }

       if(ai > song.length-1 || ai < 0){ ai = 0; si = 0; }

       ////console.log(ai,si);
       //播放的源   
       var currentAlbum = song[ai];
       var currentSong = song[ai].abSong[si];
       mc.src = currentSong.src;

       this.toggleTimeShow(false);   //播放进度定时器取消
       this.play();           //播放
       this.showIndexInfo(currentAlbum,currentSong); //显示相关信息

       //设置播放则标识
       this.setLabel(mc,ai, si)
    },

    showIndexInfo : function(currentAlbum,currentSong){
          var player = this.player,
          $btnTitle = player.find(".btn-title"),
          img = player.find(".img-area img")[0];
      ////console.log(currentSong.title,currentSong.artist,currentSong.cover,thisAlbum.abName);
      $btnTitle.find(".song-title").text( currentSong.title ).end()
               .find(".song-author").text( currentSong.artist ).end()
               .find(".song-desc").text( currentAlbum.abName);
      img.src = currentSong.cover;

      this.loadLrc(currentSong);  //显示本首歌的LRC
    },

    /** 给mediaPlayer设置 专辑及歌曲 标识 */
    setLabel : function(mc, ai, si){
      $(mc).attr({"ai": ai, "si": si})
    },
    /** 获取当前播放索引 */
    getLabel : function(){
      var $mc = $(this.mediaCenter());
      return {ai : parseInt($mc.attr("ai"),10),
              si : parseInt($mc.attr("si"),10)
             }
    },
    /** 获取循环类型 */
    getCirType : function(){
      return this.player.find(".circle i").not(".hide").attr("circletype");
    },
    /** 播放器中Class 将src替换成des */
    rpClass : function (src,des){
      this.player.find("."+src).removeClass(src).addClass(des);
    },

    /** 设置音量  */
    setVolume : function(val){
      var md = this.mediaCenter(), value = Math.ceil(val*100);
      md.volume = val;
      this.player.find(".prog-val").text( value ).siblings().find(".prog-in").height(value);

      //当前播放总时间，当前源，当前时间, 当前音量， 是否静音
      ////console.log(md.duration, md.currentSrc,md.currentTime, md.volume, md.muted);
    },

    /** 设置mediaTime(val)单位为0->1间的比率 或 取得mediaTime()当前播放的进度，单位为%  */
    mediaTime : function(val){
      var md = this.mediaCenter();
      return val === void 0 ? getTime() : setTime();
      function getTime(){
        return ( md.currentTime/md.duration )*100 + "%" ;
      }
      
      function setTime(){
        ////console.log(val,md.duration,val * md.duration);
        md.currentTime = val * md.duration;
        ////console.log(md.currentTime);
      }

    },
    /** 设置或取消时间显示定时器 
      * @param {Boolean} timer - true则设置定时器,false则取消定时器
      */
    toggleTimeShow : function(timer){
      
      var _t = this; //定时器对象

      if(timer){
        ////console.log(_t.timerObj);
        _t.timerObj = setInterval(function(){
          //console.log("timerObj");
          var mct = _t.mediaTime();
          _t.player.find(".progress").width( mct );
          ////console.log( mct );
          if(mct === "100%"){
            _t.next();
          }
        },1000);


      }else{
        clearInterval(_t.timerObj);
        clearInterval(_t.lrcTimer);
      }
    },

    /** 载入currentSong的歌词 */
    loadLrc : function(currentSong){
      var _t = this;
      //console.log(currentSong.lrc);
      $.ajax({
        url: currentSong.lrc
      }).done(function( data ){
          //解析LRC的数据返回为html
          var html = _t.parseLrcFile(data);
          _t.player.find(".lrc-html-wrap").html(html);
      }).fail(function(){

          _t.player.find(".lrc-html-wrap").html("没有找到歌词!").css({"margin-top":"0"});
          clearInterval(_t.lrcTimer)
      })
    },

    parseLrcFile : function(data){
        var lrcTimeArr=[], lrcWordArr=[], lrcJson={}, html="";
        var dataLine = data.split("\n"); //将歌词切成行数组
        
        //获取LRC头信息
        var lrcHead = dataLine.splice(0,4);        //去掉头部仅保留歌词部分,
        
        //分割后 dataLine为去掉头后的歌词信息，lrcHead为头信息二部分  
        //获取头字符
        var title = getHeadStr( lrcHead[0] ),
            artist= getHeadStr( lrcHead[1] ),
            album = getHeadStr( lrcHead[2] );    
        //console.log(title,artist,album);
        //获取歌词头信息
        function getHeadStr(lrcHeadStr){
          var rtval = lrcHeadStr.replace(/\[\w\w\:(.*?)\]/g,function(){
              return arguments[1] || "暂无";
          });
          return rtval
        }
    

        for(var i=0; i<dataLine.length; i++){
            dataLine[i].replace(/\[(\d*):(\d*)([\.|\:]\d*)\]/g,function(){
              ////console.log(arguments);
              var m = arguments[1] | 0, //分
                  s = arguments[2] | 0, //秒
                  totals = m * 60 + s; //计算总秒数

              lrcTimeArr.push(totals);
              //最后一个参数匹配的是源
              var lrcword = arguments[arguments.length-1].replace(/\[\d\d:\d\d.\d\d]/g,"")
              //lrcWordArr.push(lrcword);
              //转换为JSON对象 形式为 "t"+totals : 
              lrcJson["t"+totals] = lrcword;
            });
        }
        //时间数组/歌词数组/时间、歌词键值对(其中键为即带时间信息的字符,排序时间数组通过JSON对应其值)
        //console.log(lrcTimeArr,lrcWordArr,lrcJson);
        
        //对时间数组排序
        lrcTimeArr.sort(function(a,b){ return a-b });

        for(var j=0; j<lrcTimeArr.length; j++){
          var time = lrcTimeArr[j];
          html += '<p class="lrc-line" data-timeLine="' + time + '">' + lrcJson["t"+time] + '</p>';
        }

        
        return html;      
    },

    //实时显示当前播放歌曲歌词位置
    lrcRealTimeMove : function(){
      var _t = this, player = this.player;
      //获取当前播放时间
      var mc = this.mediaCenter(),
          $lrcArea = player.find(".lrc-area");
          $lrcArea.show();    player.find(".lrc").addClass("active");
          //初始歌曲按钮
    
      var $lrcDom = $lrcArea.find(".lrc-html-wrap"),
          $lrcPList = $lrcDom.find("p.lrc-line");
          curLrcHeight = $lrcDom.height();
      _t.lrcTimer = setInterval(lrcMove, 1000);

      function lrcMove(){
        var curProcess = mc.currentTime/mc.duration;  //播放进度比
            ////console.log($lrcDom);
          var $curPlayP = $lrcDom.find('p[data-timeline="'+ mc.currentTime.toFixed() +'"]');
              
            if( $curPlayP.length ){
              var pTop = $curPlayP.position().top - 20;
              $curPlayP.css("color","green").prev().css("color","#aaa");
              $lrcDom.animate({
                "margin-top" : "-" + pTop
              }, 200); 
              //console.log($curPlayP.position().top);
            }
      }
    },

    //显隐播放器
    togglePlayer : function(player){
      if(player.hasClass("show")){
        player.animate({
          right: "-372px"
        },500,function(){
          player.removeClass("show").addClass("hide");
        });
      }else if(player.hasClass("hide")){
        player.animate({
          right: "0"
        },500,function(){
          player.removeClass("hide").addClass("show");
        });
      }
    }

  }


  $.fn.extend({
    media: function(options) {
      var args = [].slice.call(arguments, 1);
      return this.each(function(){
        var ui = $._data(this, "Media");
        if (!ui) {
          var opts = $.extend(true, {}, $.fn.media.defaults, typeof options === "object" ? options : {});

          ui = new Media(opts, this);

          $._data(this, "Media", ui);
        }
        if(typeof options === "string" && typeof ui[options] == 'function'){
          ui[options].apply(ui, args);  //执行插件的方法
        }
      });
    }
  });

  $.fn.media.defaults = {
    url : "data/music.json",
    mediaID : "Media",
    initCircle : "list", //random list single

    autoPlay : true,     //是否自动播放，只针对首次启动
    timeout : 0,         //自动播放延迟时间,

    autoHide : true,     //初始是否自动隐藏
    initTimeHide : 5000, //播放器显示后自动隐藏时间

    volumeFade : true
  }

})(jQuery)