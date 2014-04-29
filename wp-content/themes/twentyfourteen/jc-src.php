﻿<?php  
/* 
 * Template Name: Joecora 
 * Made by Joe
 * Email: ihateyou711@163.com
 */  
?>
<!DOCTYPE HTML>
<html>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta content="JOE & CORA's WEBSITE, <?php $description = get_bloginfo( 'description', 'display' );	if ( ! empty ( $description ) ) : ?><?php echo esc_html( $description ); ?><?php endif; ?>" name="description" />
		<meta content="Joe,Cora,website" name="keywords" />
		<meta content="Joe" name="author" />
		<title><?php bloginfo( 'name' ); ?></title>
		<link rel="shortcut icon" href="" />
		<link rel="stylesheet"  href="<?php echo get_template_directory_uri(); ?>/public/stylesheets/min/all-min.css" />
		<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/public/javascripts/min/lib.js"></script>
		<script>var duoshuoQuery = {short_name:"joecora"}</script>
		<script src="http://static.duoshuo.com/embed.js"></script>
		<script>function pcsBar(b,o){$({property: b}).animate({property: o}, {duration: (3000/100)*(o-b),step: function() { var percentage = Math.round(this.property); $('#progress').css('width',  percentage+"%"); if(percentage == 100) { $("#progress").addClass("done");}}});} pcsBar(0,20); </script>
	</head>
	
<body class="jc">
  <!-- 进度层 BEGIN{ -->
	<div id="progress"><span></span></div>
	<!-- 进度层 OVER} -->

	<!-- 覆盖层 BEGIN{ -->
	<div id="mb_pattern" class="mb_pattern"></div>
	<div class="radial-gradient"></div>
	<!-- 覆盖层 OVER} -->
	
	<!-- MENU层 BEGIN｛ -->
	<section class="menu box-opacity" id="menu">
		<nav class="nav clearfix">
			<span class="postNav mn" id="postNav"><h3><a href=""><i class="fa fa-pagelines"></i>文字</a></h3></span>
			<span class="imgNav mn" id="imgNav"><h3><a href=""><i class="fa fa-github-alt"></i>影像</a></h3></span>
			<span class="timeNav mn" id="timeNav"><h3><a><i class="fa fa-clock-o"></i>时间</a></h3></span>
			<span class="vedNav mn" id="vedNav"><h3><a><i class="fa fa-info-circle"></i>话语</a></h3></span>
			<span class="userNav"  id="user">
				<h3><a><i class="fa fa-user"></i>			
				<?php global $current_user;
					if( isset( $current_user ) ){			
						get_currentuserinfo(); 
						echo __( 'Hi', 'login-with-ajax' ) . " " . $current_user->display_name;	
					}else{
						echo '请登录';
					}
				?></a>
				</h3>
			<?php echo do_shortcode("[lwa]"); ?>
			</span>
		</nav>
	</section>		
	<!-- MENU层 OVER｝ -->
	
	<!-- 左侧层{ -->	
	<div id="expando">
		<div class="ltbg" id="ltbg" data-toggle="tooltip" data-placement="right" title="" data-original-title="请点击空白区域收缩面板"></div>
		<div class="lt">
		
			<!-- LOGO & TITLE BEGIN{ -->
			<header class="jc-header" id="jc-header">
				<hgroup>
				   <h1 class="f-yahei"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
			   		<!--<h1 class="f-yahei"><a href="/">JOECORA</a></h1> -->
				   <h2><a>FEBRUARY.19.2012</a></h2>
				</hgroup>
			</header>
			<!-- LOGO & TITLE OVER} -->

			<div class="con-list" id="conList">
			
				<!-- POST BEGIN { -->
				<section class="post-list public-list" id="post">
					<ul class="post-wrapper"></ul>			
				</section>
				<!-- POST OVER } -->
				
				<!-- IMG BEGIN{ -->
				<section class="img-list" id="img">
					 <div id="imgWrap">
							<div class="img-gl-con clearfix" id="imgGL">			
							</div>		
							<div class=""  id="imgGlList" style="display:none" >
								<button type="button" class="btn-lg show-list"  id="returnGL"><i class="fa fa-undo"></i>返回相册列表</button>
								<div class="btn-group btn-group-sm clearfix" id="showMode" >
								  <button type="button" class="btn btn-default show-bgs active"  title="点击图片将会显示在背景上"><i class="fa fa-caret-square-o-up"></i>背景</button>
								  <button type="button" disabled="disabled" class="btn btn-default show-grid"><i class="fa fa-th-large"></i>矩阵</button>
								  <button type="button" disabled="disabled" class="btn btn-default show-book"><i class="fa fa-book"></i>翻页</button>									  
							    </div>
						 </div>
					</div>
				</section>
				<!-- IMG OVER} -->
				
				<!-- vedio BEGIN{ -->
				
				<section class="vedio-list" id="vedio">
					<?php echo do_shortcode("[widget widget_name='Duoshuo_Widget_Recent_Comments']"); ?>
					<?php echo do_shortcode("[widget widget_name='Duoshuo_Widget_Recent_Visitors']"); ?>
				</section>
				<!-- vedio OVER} -->	
				
			</div>			
		</div>	
	</div>
	<!-- 左侧层｝ -->

	<script>pcsBar(20,40)</script>

	<!-- 	文章面板层{ -->
	<section class="article ui-widget-content" id="article" style="display:none">
		<div class="article-bg"></div>
		<div class="btnset">
			<p class="ui-widget-header"></p>
			<button class="close"><i class="fa fa-times"></i></button>
			<button class="size enlarge"><i class="fa fa-search-plus"></i><i class="fa fa-search-minus"></i></button>	
		</div>
		<div class="article-con">
		     <div class='jc-art'></div>
		</div>
	</section>
	<!-- 	文章面板层} -->
	
	<!-- BG左右翻{ -->
	<div class="cn-nav" id="cnNav">
	  <a href="#" class="cn-nav-item cn-nav-prev">                  
		<span class="fa fa-chevron-left"></span>
		<div></div>
	  </a>  
	  <a href="#" class="cn-nav-item cn-nav-next">  
		<span class="fa fa-chevron-right"></span>
		<div></div>
	  </a>
	</div>
	<!-- BG左右翻}-->
	
	<!-- ABOUT层 { -->
	<div class="about">
		<ul class="about-con clearfix">
			<li><a><i class="fa fa-pencil"></i>关于JC</a><div class="about-item-desc">
				<?php $page_id = 227;
				//此处的1就是page页面的ID，ID的数字是多少就填写多少
				echo get_post($page_id)->post_content;
				//此段为输出获取的页面内容，无需修改
				?>
			</div></li>
			<li><a><i class="fa fa-globe"></i>关于Joe</a><div class="about-item-desc">
				<div class="liwrap">
				<?php $page_id = 235;
				//此处的1就是page页面的ID，ID的数字是多少就填写多少
				echo get_post($page_id)->post_content;
				//此段为输出获取的页面内容，无需修改
				?>
				</div>
			</div></li>
			<li><a><i class="fa fa-link"></i>友情链接</a>
			<div class="about-item-desc">
				<?php wp_list_bookmarks('orderby=id&category_orderby=id'); ?>
			</div>
			</li>
		</ul>
		<div class="about-btn">
			<span><i class="fa fa-share-square-o"></i>链接到： </span>
			<span class="share-sns clearfix"><a  class="qq"><i class="fa fa-pinterest-square"></i></a><a class="sina"><i class="fa fa-weibo"></i></a><a class="douban"><i class="fa fa-facebook-square"></i></a><a href="https://github.com/CoraJoe" target="_blank"><i class="fa fa-github"></i></a></span>
			<span class="about-more">更多信息<i class="fa fa-arrow-circle-o-up"></i></span><span class="about-music">有关音乐<i class="fa fa-music"></i> <i class="fa fa-cog fa-spin"></i></span>
		</div>
		
	</div>
	<!-- ABOUT层 } -->
	<script>pcsBar(40,50)</script>

	<!--播放器层 { -->
	<!--[if !IE]><--> 
   <div class="player-area show" id="Player">
      <!-- <div class="toggle-btn" style="width:10px; background-color:green; height:100%; float:left"></div> -->
      <div class="player-main clearfix">
          <div class="img-area">
              <div class="lrc-area">
                <div class="lrc-html-wrap">正在载入中... ... </div>    
              </div>
              <img width='150' height='150' title='' alt='' src='data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZDMTM1OUFBQ0U3QzExRTNBMUUzRTMzNjk1MzgwQjhFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZDMTM1OUFCQ0U3QzExRTNBMUUzRTMzNjk1MzgwQjhFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkMxMzU5QThDRTdDMTFFM0ExRTNFMzM2OTUzODBCOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkMxMzU5QTlDRTdDMTFFM0ExRTNFMzM2OTUzODBCOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYG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'>
          </div>
          <div class="btn-area">
              <p class="btn-top">
                  <span ctitle="收藏" class="btn fa fa-star"></span>
                  <span ctitle="喜欢" class="btn fa fa-heart "></span>
                  <span class="circle">
                      <i circletype="random" ctitle="随机播放" class="btn fa fa-random hide"></i>
                      <i circletype="single" ctitle="单曲播放" class="btn fa fa-refresh hide"></i>
                      <i circletype="list" ctitle="顺序播放" class="btn fa fa-list-ul"></i>
                  </span>             
                  <span class="volume">
                      <i class="prog btn hide">
                        <span class="prog-val">88</span>
                        <span class="prog-bar"><span class="prog-in"></span></span>
                      </i>
                      <i ctitle="静音" class="btn fa fa-volume-off hide"></i>
                      <i ctitle="音量"  class="btn fa fa-volume-up "></i>
                  </span> 
              </p>
              <p class="btn-title">
                  <span class="song-title">West Coast</span>
                  <span class="song-author">Lana Delrey</span>
                  <span class="song-desc">活出生命LIVE演唱会</span>
              </p>


              <p class="btn-main">
                  <span  ctitle="播放"  class="btn chg play fa-stack fa-lg">
                    <i class="fa fa-circle fa-stack-2x"></i>
                    <i class="fa fa-play fa-stack-1x fa-inverse"></i> <!-- fa-play -->
                  </span>
                  <span  ctitle="下一曲"   class="btn prev fa-stack">
                    <i class="fa fa-circle fa-stack-2x"></i>
                    <i class="fa fa-backward fa-stack-1x fa-inverse"></i>
                  </span>                 
                  <span  ctitle="上一曲"  class="btn next fa-stack">
                    <i class="fa fa-circle fa-stack-2x"></i>
                    <i class="fa fa-forward fa-stack-1x fa-inverse"></i> 
                  </span>
                  <span class="r">
                      <span  ctitle="歌曲列表"  class="btn slist fa-stack fa-sm">
                        <i class="fa fa-circle fa-stack-2x"></i>
                        <i class="fa fa-align-justify fa-stack-1x fa-inverse"></i>
                      </span>                 
                      <span  ctitle="打开歌词"  class="btn lrc fa-stack">
                        <i class="fa fa-circle fa-stack-2x"></i>
                        <i class="fa fa-list-alt fa-stack-1x fa-inverse"></i> 
                      </span>
                  </span>
              </p>
          </div>
      </div>
      <div class="prog-wrap"><div class="progress"><span></span></div></div>
      <audio id="Media"></audio>
  </div>
	<!--<![endif]-->
	<!--播放器层 } -->

	<script>pcsBar(50,60)</script>
	<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/public/javascripts/min/jquery.plugins.js"></script>
  <script>pcsBar(60,80)</script>
	<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/public/javascripts/min/jc.min.js"></script>
	<script type="text/javascript" src="/wp-content/plugins/login-with-ajax/widget/login-with-ajax.js?ver=3.8.3"></script>

	<script>pcsBar(80,100)</script>
</body>
</html>