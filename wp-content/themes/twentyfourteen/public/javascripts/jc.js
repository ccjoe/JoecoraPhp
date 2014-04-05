//background
(function($,w){
  var JCApp = {
    $menu            :  $("#menu"),
    $bclick          :  $("#cnNav"),
    $bl              :  $("#cnNav").find(".cn-nav-prev"),
    $br              :  $("#cnNav").find(".cn-nav-next"),
    $leftConAll      :  $("#ltbg, #conList"),
    $leftBg          :  $("#ltbg"),
    $leftCon         :  $("#conList"),
    $postList        :  $("#conList").find("#post"),
    $article         :  $("#article"),
    $img             :  $("#conList").find("#img"),
    $vedioList       :  $("#conList").find("#vedio"),
    $postListCon     :  $("#conList").find(".post-wrapper"),
    $imgWrap         :  $("#imgWarp"),
    $imgGL           :  $("#imgGL"),
    $imgGlList       :  $("#imgGlList"),
    $showMode        :  $("#showMode"),
    $returnGL        : $("#returnGL"),
    $aboutCon        :  $(".about-con"),
    $headerTitle     :  $("#jc-header"),
    $loading         :  $("<span  class='fa fa-spinner fa-spin'></span>"),
    $ok              :  $('<span><i class="fa fa-ok"></i>发表成功，待审核后可见</span>'),
    $tips            :  $('<span><i class="fa fa-hand-o-right"></i>麻烦将*号项填写正确</span>'),
    $wrong           :  $('<i class="fa fa-plus"></i>'),
    $failing         :  $("<span class='error'><i class='fa fa-info-circle'></i>提交数据失败,原因为提交内容一致或太过频繁</span>"),
    $overing         :  $("<span class='suceess'><i class='fa fa-check-square'></i>加载数据完毕</span>"),
    index            : 0,
    bgs : [{  src: '/wp-content/gallery/beach/img_9172-1.jpg', fade: 4000},
    { src: '/wp-content/gallery/park/img_9116-1.jpg', fade: 4000 },
    { src: '/wp-content/gallery/beach/img_9162-1.jpg', fade: 4000 },
    { src: '/wp-content/gallery/park/img_9150-1.jpg', fade: 4000 },
    { src: '/wp-content/gallery/beach/img_9163-1.jpg', fade: 4000 },
    { src: '/wp-content/gallery/park/img_9157-1.jpg', fade: 4000 }],

    init : function(){
      this.$headerTitle.find("h2 a").lettering();  //Lettering
      JCApp.getAjaxPostData(5);                        //取文章
      JCApp.PatternSet.initPattern();                  //初始化随机图形
      JCApp.VegasSet();                                        //背景交互
      JCApp.PageUISet();                                   //页面交互
    },  

    PageUISet:function(){     //页面上UI 
        //左侧交互      
        var jc = this,  showed,status,  n=0;

        $("#expando").hover(function(){
          jc.$leftBg.css({
            "opacity": 0.6,
            "filter": "alpha(opacity=60)"
          });
        },function(){
          jc.$leftBg.css({
            "opacity": 0.1,
            "filter": "alpha(opacity=10)"
          });
        });

        //LEFT EXPANDO      
        jc.$leftBg.click(function(){
          n++;
          n%2 ? jc.$leftCon.hide().parents().find(".ltbg").animate({width:"10px"}, 200,function(){$(this).addClass("shrink")})
          :jc.$leftBg.removeClass("shrink").animate({width:"100%"},{duration:200,queue:true, specialEasing: {
            width: 'linear',
            height: 'easeOutBounce'
          },complete:function(){jc.$leftCon.show()}});

        });

        //滚动条滚动拉取文章
        jc.$postList.scroll(function(){
          if($(this).find("ul.post-wrapper").height() - $(this).scrollTop() < 450){
            jc.getAjaxPostData(5);  
          }
        });

        //Ajax Article
        this.$postList.on('click',"ul li a",function(e){
          var href = $(this)[0].href;
          //console.log(href);
          getLinkArticle(href);
          jc.$aboutCon.hide();
          return false;
        });

      function getLinkArticle(href){
        $.ajax({
          url: href,
          context:jc.$article,  //上下文，整个弹出面板
          beforeSend:function(){

            $(this).find(".article-con").append(jc.$loading);
            $(this).find('.close').off();
            $(this).find('.size').off();
            var $t = $(this);
            if($("#content")){ $("#content").remove();}
            jc.PatternSet.openItem();
            jc.PatternSet.$mbPattern.children().promise().done(function() {
              $t.show();
            }).done(function(){        
              jc.PatternSet.$mbPattern.hide();
            });
          //return false;
          }
          }).done(function ( data ) { 
            var needdata = $($.parseHTML(data)).find("#content");
            var $t = $(this);
            //文章容器
            $t.find(".article-con").append(needdata);

            $t.find('.close').click( closeArticle );

            $t.find('.size').click(function(){

              if($(this).hasClass("enlarge")){
                exlargeArt($t);
              }
              else if($(this).hasClass("mini")){
                miniArt($t);
              }
            });

            //文章内所有事件
            artEvent($("#content"));

            //ARTICLE
            //$t.draggable({ handle: "p.ui-widget-header" });
            jc.ajaxComment();                       
            jc.$article.find(".fa-spinner").remove();           
            return false;

          }).fail(function(){ 
              alert("调用发生错误！"); 
            });       
      }

      function closeArticle(){
        jc.$article.hide();
        jc.PatternSet.$mbPattern.show();
        jc.PatternSet.disperse();
      }

      jc.$menu.on("click",".nav span",function(e){        //MENU//左侧可见且当前项不可见时显示当前项内容   

        if($(this)[0].className === "postNav"){

          if(jc.$leftCon.is(":visible") && jc.$postList.is(":visible") === false){  //点击文字
            jc.$postList.slideDown().siblings().slideUp();
          }
          }else if($(this)[0].className === "imgNav"){
          //点击图象      
          if(jc.$leftCon.is(":visible") && jc.$img.is(":visible") === false){
            jc.$img.slideDown().siblings().slideUp();

            //imgGL里有内容则不再请求数据
            if(!jc.$imgGL.find(".view").length){
              getAjaxGallery();
            }
          }
          }else if($(this)[0].className === "vedNav"){
          //点击视频
          if(leftCon.is(":visible") && vedioList.is(":visible") === false){
            $("#conList").find("section").slideUp().end().find(".vedio-list").slideDown();  
          }
          }else if($(this)[0].className === "timeNav"){
          //点击其它
          $.vegas("pause");
          $(".vegas-background").hide();
          vedioby("http://video-js.zencoder.com/oceans-clip");
          }else{

          }
          return false;
      });

      function artEvent(content){
        content.find(".comments-link a").attr({"href":"#comments"});
        content.find("a.comment-reply-link").each(function(i){
          $(this).attr("href",$(this).attr("href").substring(1));
        });

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
        })

      }

      function exlargeArt($t){
        $t.find(".article-bg").css({backgroundColor:"#000",Zindex:"100"})
        $t.animate({width:"65%",height:"80%"},200,function(){
          $t.animate({"margin-top":-$t.height()/2, top:"50%",left:"011x0px",right:"120px!important"});
        });
        $t.addClass("lg-con").find('.enlarge').removeClass("enlarge").addClass("mini");
        status = true;
      }

      function miniArt($t){
        $t.find(".article-bg").css({backgroundColor:"#000",opacity:"0.8",Zindex:"100"})
        $t.animate({width:"400px",height:"400px" },200,function(){
          $t.animate({"margin-top":-$t.height()/2, top:"50%",left:"011x0px", right:"120px!important"});
        });
        $t.removeClass("lg-con").find('.mini').removeClass("mini").addClass("enlarge");
        status = false;
      } 

      //加载相册集
      function getAjaxGallery(){      
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
            cthis.hide();
            cthis.next().show();

          //识别请求的当前对象
          var reqGl = $(this).parent().data("gl"),
          showedGl = jc.$imgGlList.find(".ngg-galleryoverview");
          showedGl.hide();
          if(showedGl.hasClass(reqGl) ){
            jc.$imgGlList.find("."+reqGl).show();
          }else{
            showGlList(this);
          }
          return false;
          });

          //点击列表返回相册
          jc.$returnGL.click(function(){
            cthis.show();
            cthis.next().hide();
          });

          //显示当前选中相册浏览模式
          jc.$showMode.on("click","button",function(){
            $(this).addClass("active").siblings().removeClass("active");
          });
          }).fail(function(){ alert("调用发生错误！"); });
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
        var GalleryTemplate = "<% _.each(galleryData, function(item) { %> <div class='view view-tenth' data-gl='label-<%= item.galleryTitle %>'><a href='<%= item.galleryLinks %>'><img src='<%= item.galleryThumbSrc %>' /><div class='mask'><h2><%= item.galleryTitle %></h2><p><%= item.galleryDescription %></p></div></a></div> <% }); %>";
        var GalleryCon = _.template(GalleryTemplate, galleryData);
        return GalleryCon;
      }

      //解析某一相册数据 curobj为
      function showGlList(thisObj){
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

      function galleryShowStyle(){
        //点击列表显示图片
        $(".ngg-galleryoverview").off();
        $(".ngg-galleryoverview").on("click",".ngg-gallery-thumbnail-box a", function(){
          modeClass = jc.$showMode.find("button.active");

          if(modeClass.hasClass("show-bgs")){
            //背景模式浏览图片
            

            var newBgAdd = this.href;
            var newbg = { src: newBgAdd, fade: 4000 }
            //console.log(JCApp.bgs);
            JCApp.loadImage(newBgAdd, function(){
              JCApp.triggerBgPic(newbg);
            });

          }else if(modeClass.hasClass("show-grid")){
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
          }else if(modeClass.hasClass("show-book")){

          }else{
            alert("请选择浏览模式");
          }
          return false;
        });

        return false;
      }

      //ABOUT
      $(".about-more").click(function(){             
        jc.$aboutCon.slideToggle();
        musicPlayerSwitch("close");
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
        jc.$aboutCon.find("li:first-child").addClass("active").find(" .about-item-desc").show().animate({width:"250px",margin:"10px"},200);
        jc.$aboutCon.find("li:first-child").siblings().find(" .about-item-desc").removeClass("active").animate({width:"0",margin:"0"},200);
        jc.$aboutCon.off();
        jc.$aboutCon.on("click","li a",function(){
          var $t = $(this);
          if(!$t.parent().hasClass("active")){
            $t.parent().siblings().find(" .about-item-desc").animate({width:"0",margin:"0"},200);
            $t.parent().addClass("active").siblings().removeClass("active");
            $t.next().show().animate({width:"250px",margin:"10px"},200);
          }else{
            return false
          }
        })
      });

      $(".about-music").click(function(){         
        jc.$aboutCon.hide();
        musicPlayerSwitch();
      }) 

      //打开关闭
      $("#musicPlayerSwitch").on("click",function(){
        jc.$aboutCon.hide();
        musicPlayerSwitch();
      });
    },  

    //Vegas
    VegasSet:function(){
      var jc = this;

      $.vegas('slideshow',{
        backgrounds: jc.bgs,
        delay:8000
      })('overlay', {
        src: '/wp-content/themes/twentyfourteen/public/images/overlays/mask.png',
        opacity: 0.8
      });

      //当背景变化时
      $("body").on("vegaswalk",function(e,bg,step){
        //console.log("vegaswalk");
        var prevImg = jc.bgs[step ? step-1 : jc.bgs.length-1].src;
        var nextImg = (step == jc.bgs.length-1) ? jc.bgs[0].src : jc.bgs[step+1].src;

        jc.$bl.find("div").css("background-image","url("+JCApp.fullOrThumb(prevImg) +")");
        jc.$br.find("div").css("background-image","url("+JCApp.fullOrThumb(nextImg) +")");
      });

      //点击左右切换
      this.$bclick.on("click",".cn-nav-item", function(event){
        $(".vegas-background").stop();
        if(event.currentTarget.className.indexOf("cn-nav-prev") !== -1){
          //console.log("previous");
          $.vegas("previous");
        }
        if(event.currentTarget.className.indexOf("cn-nav-next") !== -1){
          //console.log("next");
          $.vegas("next");
        }
        return false;
      });
    },

    //AJAX取文章信息
    getAjaxPostData: function(num){
      var self = this;
      $.ajax({
        url:"?feed=rss2",
        dataType:"xml",
        beforeSend:function(){
          self.$postListCon.append(self.$loading);
        }
      }).done(function(xml){
        var xmldt = $(xml).find("channel item");
        var len = xmldt.length;
        /*//排除前五条已显示的数据
        if(len>5){}else{
        return false
        }*/
        //如果没有数据了
        if(num * self.index > len){
        self.$postListCon.find(self.$loading,self.$overing).remove(); //.end().append(self.$overing)
        }else{
        //取第 index+1个num条数据
        var xmlperdt = (num*(self.index+1)) > len ? _.last(_.first(xmldt,num*(self.index+1)),len-num) : _.last(_.first(xmldt,num*(self.index+1)),num);

        var $htmlFrag = [];
        $(xmlperdt).each(function(i){
          var liitem = $('<li><a href="'+$(this).find("link").text()+'">'+ $(this).find("title").text() +'</a><span class="post-date">'+ $(this).find("description").text() +'</span></li>');
          //console.log(liitem.html());
          $htmlFrag.push(liitem);
        })
        self.$postListCon.find(self.$loading,self.$overing).remove().end().append($htmlFrag);
        }

        self.index++;

      }).fail(function(){
        self.$postListCon.find(loading,overing).remove().end().append(failing);
      });
    },

    PatternSet:{
      $mbPattern  : $('#mb_pattern'),
      initPattern:function () {
        //console.log("init");
        for(var i = 0; i < 16 ; ++i) {
          this.showItem("initial","initial");
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
        var o       = 0.2,
        t       = Math.floor(Math.random()*171) + 30, // between 5 and 200
        l       = Math.floor(Math.random()*696) + 5, // between 5 and 700
        r       = Math.floor(Math.random()*255),
        g       = Math.floor(Math.random()*255),
        b       = Math.floor(Math.random()*255);
        a       = Math.floor(Math.random()*101) - 50; // between -50 and 50
        d       = 1.5 + Math.random()*0.5 ; // between 1.5 and 2
        f       = Math.random()* 5 ;        // between 0 and 3
        param = {
          "width"           : w,
          "height"          : h,
          "opacity"         : o,
          "top": t + 'px',
          "right": l + 'px',
          "background-color" : "rgba("+r+","+g+","+b+")",
          "border-radius" : d+"em",
          "webkit-filter" : "blur("+f+"px)"
        };
        console.log(param['background-color']);
        //if (!$.browser.msie)rotate(19deg)         
      },

      openItem: function() {
        this.$mbPattern.children().each(function(i) {
          var $el         = $(this);
          var param       = {
            "width"   : '100px',
            "height"  : '100px',
            "top"     : 188 + 100 * Math.floor(i/4),
            "right"   : 120 + 100 * (i%4),
            "opacity" : 0.6,
            "background-color": "#000",
            "border-radius"    : "0",
            "webkit-filter"   : "blur(0px)"
          //transform :'rotate(0deg)'
          };
          $el.css("transform",'rotate'+'('+ 0 + 'deg)');      
          //if (!$.browser.msie)$el.css("transform",'rotate'+'('+ a + 'deg)');
          //param.transform   =  'rotate'+'('+ 0 + 'deg)';

          $el.animate(param,1000);  //,"swing"
          }); 
        }
    },

    // @嵌套评论问题待解决
    ajaxComment: function (){
      //Ajax comments
      $("#submit").click(function(event){

        var $cf = $("#commentform");
        var params = {
          author: $cf.find("#author").val(),
          email: $cf.find("#email").val(),
          url:$cf.find("#url").val(),
          comment:$cf.find("#comment").val(),
          submit:$cf.find("#submit").val(),
          comment_post_ID:$cf.find("#comment_post_ID").val(),
          comment_parent:$cf.find("#comment_parent").val()
        };

      //检验
      for(var i in  params){
        if(params[i] === ""){ 
          if(i === "url"){
          //params.url = w.location.href;
          }else{
            if($("#submit").next()[0].id !== "comment_post_ID"){
              $("#submit").next() .remove();
            }
            $("#submit").after(JCApp.$tips);
            return false;
          }               
        }   
      }
      //console.log(params.toJSON());
      $.ajax({
        url:window.location.href,
        type:'POST', //get_comment
        data:$cf.serialize()+'&action=ajax_comment',
        beforeSend:function(){
          if($("#submit").next()[0].id !== "comment_post_ID"){
            $("#submit").next().remove();
          }
          $("#submit").after(JCApp.$loading);
        }
        }).done(function (data){
          if(data.success){
            $("#submit").next().remove();
            $("#submit").after(JCApp.$ok);
          }
        }).fail(function(){
          if($("#submit").next()[0].id !== "comment_post_ID"){
            $("#submit").next() .remove();
          }
          $("#submit").after(JCApp.$failing);
        });
        return false;
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
      var img = new Image(); //创建一个Image对象，实现图片的预下载 
      img.src = url; 
      if (img.complete) {    // 如果图片已经存在于浏览器缓存，直接调用回调函数 
        callback.call(img); 
        return;              // 直接返回，不用再处理onload事件 
      } 
      img.onload = function () {  
                             //图片下载完毕时异步调用callback函数。 
         callback.call(img); //将回调函数的this替换为Image对象 
      }; 
    }
  }

  //启动JCAPP
  JCApp.init();

})(jQuery,document)