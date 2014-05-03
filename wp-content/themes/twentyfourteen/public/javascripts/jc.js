//background
var _IE = (function(){
  var v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
  while (
    div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
    all[0]
  );
  return v > 4 ? v : false ;
}());

if(_IE && _IE < 9){
  $("div,section,nav").not("#progress").remove();
  $("body").prepend('<div class="bie8"><div class="wrap"><p class="tips">您使用的ie浏览器及版本太OUT了!, SO看到的只是这...</p><p class="info">最佳推荐<a href="http://dlsw.baidu.com/sw-search-sp/gaosu/2014_03_26_17/bind1/14744/ChromeStandaloneSetup33.0.1750.154_14744_BDdl.exe">Google Chrome</a>, 在<a href="http://dlsw.baidu.com/sw-search-sp/soft/6f/11508/Opera_20.0.1387.91_Setup.1397118343.exe" >Opera</a>, <a href="http://dlsw.baidu.com/sw-search-sp/soft/51/11843/Firefox-setup28.0.0.5186.1395192905.exe">Firefox</a>, Safari上也可以有较好体验。</p><p class="info"><a href="http://dlsw.baidu.com/sw-search-sp/gaosu/2014_03_26_17/bind1/14744/ChromeStandaloneSetup33.0.1750.154_14744_BDdl.exe">点击下载</a></p><p class="info">或者 访问 <a href="http://www.joecora.com/?cat=10">其它页面</a></p><p class="ver">友情提示：您当前的浏览器是： ie '+ _IE +'</p></div></div>');
}

$(document).ajaxSend(function(){
  $("#progress").removeClass("done");
  pcsBar(0,0);
}).ajaxStart(function(){
  pcsBar(0,70);
}).ajaxSuccess(function(){
  pcsBar(70,100);
});

(function($,w){

  var JCApp = {
    $headerTitle     :  $("#jc-header"),
    $menu            :  $("#menu"),
    $bclk            :  $("#cnNav"),
    $ltConAll        :  $("#ltbg, #conList"),
    $leftBg          :  $("#ltbg"),
    $ltCon           :  $("#conList"),
    $article         :  $("#article"),
    $imgWrap         :  $("#imgWrap"),
    $imgGL           :  $("#imgGL"),
    $imgGlList       :  $("#imgGlList"),
    $showMode        :  $("#showMode"),
    $returnGL        :  $("#returnGL"),
    $aboutCon        :  $(".about-con"),
    $aboutMore       :  $(".about-more"),
    $aboutMusic      :  $(".about-music"),
    $player          :  $("#Player"),
    $loading         :  $("<span  class='fa fa-spinner fa-spin'></span>"),
    $failing         :  $("<span class='error'><i class='fa fa-info-circle'></i>获取文章信息失败</span>"),
    $overing         :  $("<span class='suceess'><i class='fa fa-check-square'></i>加载数据完毕</span>"),
    index            :  0,
    bgs : [{  src: '/wp-content/gallery/beach/img_9172-1.jpg', fade: 2000},
    { src: '/wp-content/gallery/park/img_9116-1.jpg', fade: 2000 },
    { src: '/wp-content/gallery/beach/img_9162-1.jpg', fade: 2000 },
    { src: '/wp-content/gallery/park/img_9150-1.jpg', fade: 2000 },
    { src: '/wp-content/gallery/beach/img_9163-1.jpg', fade: 2000 },
    { src: '/wp-content/gallery/park/img_9157-1.jpg', fade: 2000 }],

    init : function(){
      JCApp.PatternSet.initPattern();                   //初始化随机图形
      this.$headerTitle.find("h2 a").lettering();       //Lettering   
      JCApp.getAjaxPostData(5);   
      JCApp.VegasSet();                                 //背景交互
      JCApp.PageUISet();                                //页面交互 
    },  
    
    PageUISet:function(){     //页面上UI 
      //左侧交互      
      var jc = this,  showed, status,  n=0, 
          $menu   = jc.$menu,  
          $player = jc.$player,
          $ltCon  = jc.$ltCon,
          $post   = $ltCon.find("#post"),
          $img    = $ltCon.find("#img"),
          $words  = $ltCon.find("#vedio"),
          $postArea=$ltCon.find(".post-wrapper"),
          $article = jc.$article;

      //路由模块初始化
      var routes = {
        '/article' : showSecPost,
        '/article/:id' : [function(id){ getLinkArticle("http://www.joecora.com/?p="+id) }] ,
        '/gallery' : showSecGl,
        '/gallery/:id' : [function(name){  
          if(!$img.is(":visible"))
            showSecGl();
          showGlList( jc.$imgWrap.find('div[data-gl="'+name+'"]').find("a")[0], name ) }],
        '/words'   : showSecWords,
        '/user'    : [function(){ $("#user").find(".lwa").toggle(); }],
        '/music'   : [function(){ jc.$aboutMusic.trigger("click") }]
      }
      var router = new Router(routes);
      router.init();
              
      $("#expando").hover(function(){
        jc.$leftBg.css({
          "opacity": 0.8,
          "filter": "alpha(opacity=60)"
        });
      },function(){
        jc.$leftBg.css({
          "opacity": 0.5,
          "filter": "alpha(opacity=50)"
        });
      });

      
      //初始化播放器   
      $player.media({
        url:"/wp-content/themes/twentyfourteen/public/data/music.json",
        autoPlay:true,
        timeout: 8000,
        initCircle: "random",
        autoHide: false
      });  

      //LEFT EXPANDO      
      jc.$leftBg.click(function(){
        n++;
        n%2 ? $ltCon.hide().parents().find(".ltbg").animate({width:"10px"}, 200,function(){$(this).addClass("shrink")})
        :jc.$leftBg.removeClass("shrink").animate({width:"100%"},{duration:200,queue:true, specialEasing: {
          width: 'linear',
          height: 'easeOutBounce'
        },complete:function(){$ltCon.show()}});

      });

      //触发多次则必须500ms或以上才执行一次.
      var throttled = _.throttle(scrollGetPost, 500);           
      //滚动条滚动拉取文章
      $post.scroll(throttled);

      function scrollGetPost(){
        if($post.find("ul.post-wrapper").height() - $post.scrollTop() < 450){
           jc.getAjaxPostData(5)
        }
      }
      //Ajax Article
      $post.on('click',"ul li a", getAart);

      $words.on("click",".ds-thread-title a",getAart)
     
      $("#user").on("click","h3",function(){ 
          var $lwa = $("#user").find(".lwa"); 
          $lwa.toggle();
          if($lwa.is(":visible"))
              router.setRoute("/user");
      })

      $menu.on("click",".nav span.mn",function(e){        //MENU//左侧可见且当前项不可见时显示当前项内容
        if($(this).hasClass("postNav")){   
          router.setRoute("/article");
          return false;
        }else if( $(this).hasClass("imgNav") ){
            router.setRoute("/gallery");
        }else if( $(this).hasClass("vedNav")){
            router.setRoute("/words");
        }else if( $(this).hasClass("timeNav")){
          //点击其它
          //$.vegas("pause");
          //$(".vegas-background").hide();
          //vedioby("http://video-js.zencoder.com/oceans-clip");    
        }else{  }

        if(jc.$article.is(":visible"))
          closeArticle();
        return false;
      });  

      //ABOUT
      jc.$aboutMore.click(function(){ 
        if(!jc.$aboutCon.is(":visible")){                  
          // router.setRoute("/about");
          jc.$aboutCon.slideDown();
        }else{
          jc.$aboutCon.slideUp();
        }   
        if($player.hasClass("show")){
            $player.media("togglePlayer",$player);
        }
        
        if( !jc.$article.is(":hidden") ){
          closeArticle();
        }
        if($(this).hasClass("active")){
          $(this).removeClass("active");
          $(this).find("i").removeClass("fa-arrow-circle-o-down").addClass("fa-arrow-circle-o-up");  
        }else{
          $(this).addClass("active");
          $(this).find("i").removeClass("fa-arrow-circle-o-up").addClass("fa-arrow-circle-o-down");      
        }           
        jc.$aboutCon.find("li:first-child").addClass("active").find(" .about-item-desc").show().animate({width:"200px",margin:"10px"},200);
        jc.$aboutCon.find("li:first-child").siblings().find(" .about-item-desc").removeClass("active").animate({width:"0",margin:"0"},200);
        jc.$aboutCon.off();
        jc.$aboutCon.on("click","li a",function(){
          var $t = $(this);
          if(!$t.parent().hasClass("active")){
            $t.parent().siblings().find(" .about-item-desc").animate({width:"0",margin:"0"},200);
            $t.parent().addClass("active").siblings().removeClass("active");
            $t.next().show().animate({width:"200px",margin:"10px"},200);
          }else{
            return false
          }
        });
      });

      jc.$aboutMusic.click(function(){         
        jc.$aboutCon.hide();
        if( $player.hasClass("hide") )
          router.setRoute("/music");
        $player.media("togglePlayer",$player);
      }); 

      function getAart(){
        var $t = $(this);
        var href = $t[0].href;
        var artid =  href.match(/\d+/) ;
        router.setRoute("/article/"+artid);  
        //getLinkArticle(href);
        jc.$aboutCon.hide();  
        
        return false;
      }

      function getLinkArticle(href){
       // if($postArea.find("a[href*="+  +"]"))
        var artid =  href.match(/\d+/) ;
        if(!artid)
            return;  
        var thisComments = showDsComments(artid); 
        var cacheArt = $postArea.find('a[href="'+ href +'"]').data("art-comment");

        // 判断是否有缓存文章
        if( cacheArt ){
          clearArticle();
          jc.$article.find(".article-con .jc-art").empty().append(cacheArt, thisComments );
          fixArticle();
        }else{
          $.ajax({
            url: href,
            context:$article,  //上下文，整个弹出面板
            beforeSend:function(){
              clearArticle();
            }
            }).done(function ( data ) {  
              var needdata = $($.parseHTML(data)).find("#content").find("article.post, nav.post-navigation");
              fixArticle(); 
              //文章容器
              this.find(".article-con .jc-art").append(needdata, thisComments );
              //将此文章红缓存下在相应链接下
              var cacheThisCons = $postArea.find('a[href="'+ href +'"]').data("art-comment",needdata);
              return false;
            }).fail(function(){ 
                alert("调用发生错误！"); 
              });   
          }    
      }

      //获取文章前清场
      function clearArticle(){
      var $goalElem = $article.find(".article-con");
          $goalElem.find(".jc-art").empty();
          $goalElem.find(".jc-art").append(jc.$loading);
          $article.find('.close').off();
          $article.find('.size').off();
          jc.PatternSet.openItem();
          jc.PatternSet.$mbPattern.children().promise().done(function() {
            $article.show();
            ////console.log("showshowshow");
          }).done(function(){        
            jc.PatternSet.$mbPattern.hide();
          });
         //return false;

          $article.find('.close').click( closeArticle );
          $article.find('.size').click(function(){
            if($(this).hasClass("enlarge")){
              exlargeArt($article);
            }else if($(this).hasClass("mini")){
              miniArt($article);
            }
          });
      }

      //获取文章后修理绑定
      function fixArticle(){

          //文章内所有事件
          artEvent($article.find(".jc-art"));

          //ARTICLE
          //$t.draggable({ handle: "p.ui-widget-header" });
          //自定义ajax原生评论
          //jc.ajaxComment();     
          
          $article.find(".fa-spinner").remove();   
      }

      function showDsComments(artid){
        var $el = $('<div />');//该div不需要设置class="ds-thread"
        $el.attr({
          'data-thread-key': artid,//'文章的本地ID',    //必选参数
          'data-url': 'http://www.joecora.com'  //必选参数
          //'data-author-key': '作者的本地用户ID' //可选参数
        });
        DUOSHUO.EmbedThread($el[0]);
        //////console.log(artid);
        return $el
      }

      function closeArticle(){
        $article.hide();
        jc.PatternSet.$mbPattern.show();
        jc.PatternSet.disperse();
        router.setRoute("/");
      }

      function showSection($showElem,otherFn){
          /*router.setRoute(routerStr);*/
          //console.log("section HP");
          if($ltCon.is(":visible") && !$showElem.is(":visible")){  
            $showElem.slideDown().siblings().slideUp();
            if(otherFn)
                otherFn();
          }
      }

      function showSecPost(){
          showSection($post);
      }
      function showSecWords(){
          //点击留言
          showSection($words,function(){
            var $v = $("#vedio");
            if( !$v.find("#ds-thread").length ){
              $v.prepend( showDsComments(195) );  
            }
          });
      }


      function artEvent(content){
        content.find(".comments-link a").attr({"href":function(){ return "#"+$(this).attr("href").match(/[a-z]*$/) }});
        content.find("a.comment-reply-link").each(function(i){
          $(this).attr("href",$(this).attr("href").substring(1));
        });
        content.find("#ds-thread").prepend("<a name='comments' />");  //加上锚点
        content.off();
        content.on("click",".entry-meta a",function(){    //文章
          var $t = $(this);
          if($t.parent().hasClass("entry-date")){
            this.href = "";
            return false;
          }else if($t.hasClass("url")){
            var url = this.href;
            getLinkArticle(url);
            return false;
          }
        });


        content.on("click","h1.entry-title a",function(){  //作者列表入口
          var url = this.href;
          getLinkArticle(url);
          return false;
        });
      }

      function exlargeArt($t){
        $t.find(".article-bg").css({backgroundColor:"#000",Zindex:"100"})
        $t.animate({width:"65%",height:"80%"},200,function(){
          $t.animate({"margin-top":-$t.height()/2, top:"50%",left:"011x0px",right:"120px!important"});
        });
        $t.addClass("lg-con").find('.enlarge').removeClass("enlarge").addClass("mini").find('.fa-search-plus').removeClass("fa-search-plus").addClass("fa-search-minus");
        status = true;
      }

      function miniArt($t){
        $t.find(".article-bg").css({backgroundColor:"#000",opacity:"0.8",Zindex:"100"})
        $t.animate({width:"400px",height:"400px" },200,function(){
          $t.animate({"margin-top":-$t.height()/2, top:"50%",left:"011x0px", right:"120px!important"});
        });
        $t.removeClass("lg-con").find('.mini').removeClass("mini").addClass("enlarge").find('.fa-search-minus').removeClass("fa-search-minus").addClass("fa-search-plus");
        status = false;
      } 

      function showSecGl(){
          //点击显示相册  如果可见则为返回相册
          if($img.is(":visible")){
            returnGL()
          }else{
            showSection($img,function(){ 
              //imgGL里有内容则不再请求数据
              if(!jc.$imgGL.find(".view").length){
                getAjaxGallery();
              }
            });
          }
      }
      //加载相册集
      function getAjaxGallery(doneCb){      
        $.ajax({
          url:"?page_id=213",
          context: jc.$imgGL,   //上下文
          dataType:"html",
          beforeSend:function(){    
            jc.$imgGL.append(jc.$loading);
            }
          }).done(function ( data ) {
            var cthis =this;    

            //进入相册，显示相册
            $htmlDoc = $( $.parseHTML( data ));
            var GalleryConGet = showGallery($htmlDoc);      
            this.append(GalleryConGet);

            this.find(".fa-spinner").remove();

            //点击相册目录显示列表
            this.on("click",".view a",function(){

              //console.log("Pic Hp");
              //识别请求的当前对象
              var reqGl = $(this).parent().data("gl");
              router.setRoute("/gallery/"+reqGl); 
              return false;
            });

            //点击列表返回相册
            jc.$returnGL.click(function(){
              router.setRoute("/gallery");
            });

            //显示当前选中相册浏览模式
            jc.$showMode.on("click","button",function(){
              $(this).addClass("active").siblings().removeClass("active");
            });
          }).fail(function(){ alert("调用发生错误！"); });
        }

      //返回相册
      function returnGL(){
        jc.$imgGL.show();
        jc.$imgGL.next().hide();
      }

      //解析相册数据
      function showGallery(data){
        //显示相册列表
        var $data = data.find(".ngg-albumoverview");
        var galleryDir = $data.find(".ngg-albumtitle");
        var galleryThumb = $data.find(".ngg-thumbnail a img");
        var galleryDscp = $data.find(".ngg-description");
        var galleryLink = $data.find(".ngg-thumbnail a");
        galleryData = [],galleryItem=[];

        //将数组转化为对象数据;
        for(var k=0; k<galleryDir.length; k++){
          (function(){
        //$(galleryDir.find("a")[k]).append($(galleryThumb[k]));
        var item = {galleryThumbSrc : galleryThumb[k].src,
          galleryTitle : $(galleryDir[k]).text(),
          galleryDescription :  $(galleryDscp[k]).text(),
          galleryLinks: galleryLink[k].href};
          galleryData.push(item);
        })();
        }               
        var GalleryTemplate = "<% _.each(galleryData, function(item) { %> <div class='view view-tenth' data-gl='<%= item.galleryTitle %>'><a href='<%= item.galleryLinks %>'><img src='<%= item.galleryThumbSrc %>' /><div class='mask'><h2><%= item.galleryTitle %></h2><p><%= item.galleryDescription %></p></div></a></div> <% }); %>";
        var GalleryCon = _.template(GalleryTemplate, galleryData);
        return GalleryCon;
      }

      //解析某一相册数据 curobj为
      function showGlList(thisObj,reqGl){
          jc.$imgGL.hide();
          jc.$imgGL.next().show();
          var showedGl = jc.$imgGlList.find(".ngg-galleryoverview");
          
          showedGl.hide();
          if(showedGl.hasClass(reqGl) ){
            jc.$imgGlList.find("."+reqGl).show(); 
          }else{
            $.ajax({
              url:thisObj.href,
              dataType:"html",
              context:jc.$imgGlList,
              beforeSend:function(){
                this.append(jc.$loading);
              }
            }).done(function(data){
              var needdata = $($.parseHTML(data)).find(".ngg-galleryoverview");
              this.append(needdata.addClass($(thisObj).parent().data("gl")));
              this.find(".fa-spinner").remove();

              //为每个图片绑定事件触发显示方式
              galleryShowStyle();
            });
          }
      }

      //相册里层图片显示规则
      function galleryShowStyle(){
        //点击列表显示图片
        $(".ngg-galleryoverview").off();
        $(".ngg-galleryoverview").on("click",".ngg-gallery-thumbnail-box a", function(){
          modeClass = jc.$showMode.find("button.active");

          if(modeClass.hasClass("show-bgs")){
            //背景模式浏览图片
            var newBgAdd = this.href;
            var newbg = { src: newBgAdd, fade: 2000 }
            //////console.log(JCApp.bgs);
            JCApp.loadImage(newBgAdd, function(){
              JCApp.triggerBgPic(newbg);
            });

          }else if(modeClass.hasClass("show-grid")){/*
            //GRID模式浏览图片
            getCurrentGalleryName = $(".showGalleryName:visible").text();   
            $clonehtmlDoc = $(htmlDoc).clone();
            var gridShowData = $clonehtmlDoc.find(".dirlabel-"+getCurrentGalleryName).find(".image-mergin").addClass(getCurrentGalleryName+"-gridlabel");
            var $mergejs = $("<script type='text/javascript' src='/javascripts/MergingImageBoxes.js'></script>");

            if(!$("body").find("."+getCurrentGalleryName+"-gridlabel")[0]){
              $("body").append(gridShowData).append($mergejs);
              $.vegas("pause");   //停止背景运作
              $(".radial-gradient").css("background-color","rgba(0,0,0,0.6)");
              jc.$leftBg.trigger("click");
            }else{

            }
            var $im_close   = $('#im_close');
            $im_close.bind('click',function(){
              $(".image-mergin").remove();
              $.vegas("pause");
              $(".radial-gradient").css("background-color","rgba(0,0,0,0)");
              jc.$leftBg.trigger("click");
            });
          */}else if(modeClass.hasClass("show-book")){

          }else{
            alert("请选择浏览模式");
          }
          return false;
        });

        return false;
      }

    },    
    //AJAX取文章信息
    getAjaxPostData: function(num){
      var self = this,
          $postArea = self.$ltCon.find(".post-wrapper");
      $.ajax({
        url:"?feed=rss2",
        dataType:"xml",
        beforeSend:function(){
          $postArea.append(self.$loading);
        }
      }).done(function(xml){
        var xmldt = $(xml).find("channel item"),
            len = xmldt.length;

        //如果没有数据了
        if(num*self.index > len){
          $postArea.find(self.$loading,self.$overing).remove(); //.end().append(self.$overing)
        }else{
          //alert("test");
          //取第 index+1个num条数据
          var xmlperdt = (num*(self.index+1)) > len ? _.last(_.first(xmldt,num*(self.index+1)),len-num) : _.last(_.first(xmldt,num*(self.index+1)),num);

          var $htmlFrag = [];
          $(xmlperdt).each(function(i){
            var liitem = $('<li><a href="'+$(this).find("link").text()+'">'+ $(this).find("title").text() +'</a><span class="post-date">'+ $(this).find("description").text() +'</span></li>');
            //////console.log(liitem.html());
            $htmlFrag.push(liitem);
          });
          //////console.log($htmlFrag);
          $postArea.find(self.$loading,self.$overing).remove().end().append($htmlFrag);
        }

        self.index++;

      }).fail(function(){
         $postArea.find(loading,overing).remove().end().append(self.$failing);
      });
    },  
    //将某张图片作为背景触发
    triggerBgPic:function (pic){
      var bgs = JCApp.bgs;
      //判断图片是否已存在于背景中
      if(!_.contains(_.pluck(bgs,"src"),pic.src)){
        bgs.push(pic);
      //超过15张背景图则去掉前一张
      if(bgs.length > 15){
        bgs.shift();
      }
      $.vegas("jump",bgs.length-1);
      }else{ $.vegas("jump",_.indexOf(bgs,pic-1)); }
    },

    //图片链接转换
    fullOrThumb:function(add){
      var splitPoint, thumbPic, bigPic;
      if(add.indexOf("/thumbs/") === -1){
        splitPoint = add.lastIndexOf("/")+1;
        thumbPic   = add.substring(0,splitPoint) + "thumbs/thumbs_" + add.substring(splitPoint);
      }else{
        splitPoint = add.indexOf("/thumbs/");
        bigPic     = add.substring(0,splitPoint) + "/" + add.substring(splitPoint + 7);
      }return thumbPic || bigPic
    },

    loadImage: function(url, callback) { 
      $("#progress").removeClass("done");
      pcsBar(0,60); 
      var img = new Image(); //创建一个Image对象，实现图片的预下载 
      img.src = url; 
      if (img.complete) {    // 如果图片已经存在于浏览器缓存，直接调用回调函数 
        pcsBar(60,100); callback.call(img);               
        return;              // 直接返回，不用再处理onload事件 
      } 
      img.onload = function () {  
        pcsBar(60,100);      //图片下载完毕时异步调用callback函数。 
         callback.call(img); //将回调函数的this替换为Image对象 
      }; 
    },
    //Vegas
    VegasSet : function (){
      var jc = this,
          $bl     = jc.$bclk.find(".cn-nav-prev"),
          $br     = jc.$bclk.find(".cn-nav-next");
      $.vegas('slideshow',{
        backgrounds: jc.bgs,
        delay:6000,
        preload: true
      })('overlay', {
        src: '/wp-content/themes/twentyfourteen/public/images/overlays/mask.png',
        opacity: 0.8
      });

      //当背景变化时
      $("body").on("vegaswalk",function(e,bg,step){
        //////console.log("vegaswalk");
        var prevImg = jc.bgs[step ? step-1 : jc.bgs.length-1].src;
        var nextImg = (step == jc.bgs.length-1) ? jc.bgs[0].src : jc.bgs[step+1].src;

         $bl.find("div").css("background-image","url("+JCApp.fullOrThumb(prevImg) +")");
         $br.find("div").css("background-image","url("+JCApp.fullOrThumb(nextImg) +")");
      });

      //点击左右切换
      this.$bclk.on("click",".cn-nav-item", function(event){
        $(".vegas-background").stop();
        if(event.currentTarget.className.indexOf("cn-nav-prev") !== -1){
          //////console.log("previous");
          $.vegas("previous");
        }
        if(event.currentTarget.className.indexOf("cn-nav-next") !== -1){
          //////console.log("next");
          $.vegas("next");
        }
        return false;
      });
    },

    PatternSet : {
      $mbPattern  : $('#mb_pattern'),
      initPattern:function () {
        //////console.log("init");
        for(var i = 0; i < 16 ; ++i) {
          this.showItem("50px","50px");
          $el     = $('<div>').css(param);
          $el.css("transform",'rotate'+'('+ a + 'deg)');                      
          $el.appendTo(this.$mbPattern);
        }
        //this.$mbPattern.children().draggable(); //just for fun
      },

      disperse:function(){
        pt = this;
        this.$mbPattern.children().each(function(i) {           
          pt.showItem("50px","50px");
          //alert(param);
          $el         = $(this);  
          $el.css("transform",'rotate'+'('+ a + 'deg)');
          $el.animate(param, 1000);
        });         
      },

      showItem:function(w,h){
          var o   = 0.2,
          t   = Math.floor(Math.random()*171) + 30, // between 5 and 200
          l   = Math.floor(Math.random()*496) + 5, // between 5 and 700
          r   = Math.floor(Math.random()*255),
          g   = Math.floor(Math.random()*255),
          b   = Math.floor(Math.random()*255);
          
          a   = Math.floor(Math.random()*101) - 50; // between -50 and 50
          d   = 1.5 + Math.random()*0.5 ; // between 1.5 and 2
          f   = Math.random()* 5 ;    // between 0 and 3
          param = {
            width     : w,
            height      : h,
            opacity     : o,
            top       : t + 'px',
            right     : l + 'px',
            backgroundColor : "rgb("+r+","+g+","+b+")",
            borderRadius  : d+"em",
            webkitFilter      : "blur("+f+"px)"
          };
          //if (!$.browser.msie)rotate(19deg)     
      },
      
      openItem: function() {
        this.$mbPattern.children().each(function(i) {
          var $el     = $(this);
          var param   = {
            width : '100px',
            height  : '100px',
            top   : 188 + 100 * Math.floor(i/4),
            right : 100 * (i%4),
            opacity : 0.2,
            backgroundColor: "rgb(0,0,0)",
            borderRadius  : "0",
            webkitFilter  : "blur(0px)"
            //transform :'rotate(0deg)'
          };
          $el.css("transform",'rotate'+'('+ 0 + 'deg)');    
          //if (!$.browser.msie)$el.css("transform",'rotate'+'('+ a + 'deg)');
          //param.transform =  'rotate'+'('+ 0 + 'deg)';
              
          $el.animate(param,1000, "swing");
        }); 
      }
    }
  }

  //启动JCAPP
  JCApp.init();

})(jQuery,document)
