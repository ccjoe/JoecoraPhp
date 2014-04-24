<?php  
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
		<script>	
		function pcsBar(b,o){
				//console.log(document.)
        $({property: b})
        .animate({property: o}, {
  		    duration: (3000/100)*(o-b),  //每阶段时间
  		    step: function() {
  		        var percentage = Math.round(this.property);

  		        $('#progress').css('width',  percentage+"%");

  		         if(percentage == 100) {
     				 $("#progress").addClass("done");//完成，隐藏进度条
   				 }
    		    }
    		});
	  }
	  pcsBar(0,20);
		</script>
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
								  <button type="button" class="btn btn-default show-grid"><i class="fa fa-th-large"></i>矩阵</button>
								  <button type="button" class="btn btn-default show-book"><i class="fa fa-book"></i>翻页</button>									  
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
			<button class="close">Close</button>
			<button class="size enlarge"><i class="fa fa-search"></i></button>	
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
			<span><i class="fa fa-share-square-o"></i>分享到： </span>
			<span class="share-sns clearfix"><a  class="qq"><i class="fa fa-pinterest-square"></i></a><a class="sina"><i class="fa fa-weibo"></i></a><a class="douban"><i class="fa fa-facebook-square"></i></a><a class="renren"><i class="fa fa-renren"></i></a></span>
			<span class="about-more">更多信息<i class="fa fa-arrow-circle-o-up"></i></span><span class="about-music">有关音乐<i class="fa fa-music"></i> <i class="fa fa-cog fa-spin"></i></span>
		</div>
		
	</div>
	<!-- ABOUT层 } -->
	<script>pcsBar(40,50)</script>

	<!--播放器层 { -->
	<!--[if !IE]><--> 
	<div id="musicPlayerWrap" class="m-player-wrap">
		  <div id="musicPlayerSwitch" class="m-player-switch off" title="隐藏播放器">
	    <a href="javascript:void(0);" id="playerSwitchBtn" class="switch-on"></a>
	  </div>
	  <div id="musicPlayer" class="m-player">
	    <div id="musicInfo" class="m-info">
	      <img src="<?php echo get_template_directory_uri(); ?>/public/images/album.png" alt="" id="albumFrontCover" class="album-front-cover">
	      <div class="front-cover-mask" title=""></div>
	      <div id="infoWrap" class="info-wrap">
	        <dl>
	          <dt id="musicName" title="FeelPlayer">FeelPlayer</dt>
	          <dd id="musicSinger" title="播放最爱的音乐">播放最爱的音乐</dd>
	          <dd id="albumName" title=""></dd>
	        </dl>
	
	        <div id="musicFunction" class="m-function clearfix">
	          <a href="javascript:void(0);" id="albumLists" class="album-lists"  title="关闭专辑列表"></a>
	          <a href="javascript:void(0);" id="lyrics" class="lyrics lyrics-hover"  title="打开歌词"></a>
	          <!-- <a href="javascript:void(0);" id="favorites" class="favorites" title="打开收藏夹"></a> -->
	        </div>
	      </div>
	    </div>
	    <div id="broadcastControl" class="broadcast-control clearfix">
	      <div class="broadcast-control-l"></div>
	      <div class="broadcast-control-m">
	        <a href="javascript:void(0);" id="play" class="m-play" title="播放"></a>
	        <a href="javascript:void(0);" id="pause" class="m-pause hidden" title="暂停"></a>
	        <a href="javascript:void(0);" id="next" class="m-next" title="下一曲"></a>
	        <a href="javascript:void(0);" id="prev" class="m-prev" title="上一曲"></a>
	
	        <div class="play-progress-rate">
	          <span id="playTime" class="play-time">0:00</span>
	          <div id="progressRateBg" class="progress-rate-bg">
	            <div id="progressRateColor" class="progress-rate-color" style="width:0;"></div>
	          </div>
	          <span id="surplusTime" class="surplus-time">-0:00</span>
	        </div>
	
	        <a href="javascript:void(0);" id="nowVolume" class="volume volume-active now-volume"></a>
	        <a href="javascript:void(0);" id="nowMute" class="mute mute-active now-volume hidden"></a>
	        <a href="javascript:void(0);" id="nowPlayManner" class="now-manner list-cycle list-cycle-active" title="列表循环"></a>
	
	        <div id="volumeControl" class="volume-wrap hidden">
	          <a href="javascript:void(0);" id="volume" class="volume" title="点击设为静音"></a>
	          <a href="javascript:void(0);" id="mute" class="mute hidden" title="点击开启声音"></a>
	          <div id="volumeSizeBg" class="volume-size-bg" title="音量调节">
	            <div id="volumeSizeColor" class="volume-size-color" data-volume="" data-height="" style="height:0;"></div>
	          </div>
	        </div>
	
	        <div id="playMannerControl" class="play-manner-wrap hidden">
	          <a href="javascript:void(0);" id="orderPlay" class="order-play" title="顺序播放"></a>
	          <a href="javascript:void(0);" id="shufflePlay" class="shuffle-play" title="随机播放"></a>
	          <a href="javascript:void(0);" id="singleCycle" class="single-cycle" title="单曲循环"></a>
	          <a href="javascript:void(0);" id="listCycle" class="list-cycle" title="列表循环"></a>
	        </div>
	
	      </div>
	      <div class="broadcast-control-r"></div>
	    </div>
	  </div>

	
	  <div id="lrcWrap" class="lrc-wrap hidden">
	    <div id="loadLrc" class="load-lrc hidden">歌曲载入中...</div>
	    <div id="lrcBox" class="lrc-box"></div>
	  </div>
	</div>
	<!--<![endif]-->
	<!--播放器层 } -->

	<script>pcsBar(50,60)</script>
	<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/public/javascripts/min/jquery.plugins.js"></script>
  <script>pcsBar(60,80)</script>
	<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/public/javascripts/min/jc.min.js"></script>

	<!--[if !IE]><-->
	<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/public/javascripts/min/musicPlayer.min.js"></script>
	<!-- [endif] -->

	<script type="text/javascript" src="/wp-content/plugins/login-with-ajax/widget/login-with-ajax.js?ver=3.8.3"></script>

	<script>pcsBar(80,100)</script>
</body>
</html>
