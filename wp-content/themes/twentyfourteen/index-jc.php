<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta content="JOE & CORA's WEBSITE" name="description">
		<meta content="Joe,Cora,website" name="keywords">
		<meta content="Joe" name="author">
		<title><%= title %></title>
		<link rel="shortcut icon" href="">
		
		<link  href='/stylesheets/bootstrap.min.css' rel='stylesheet'  /> 
		<link  href="/stylesheets/bootstrap-theme.min.css"  rel="stylesheet"   /> 
		<link rel="stylesheet"  href="/stylesheets/jquery.vegas.css" />
		<link rel="stylesheet"  href="/stylesheets/jc.css" />
		<link rel="stylesheet"  href="/stylesheets/font-awesome.min.css" />
		<link rel="stylesheet"  href="/stylesheets/summernote.css" />
	</head>
	
<body class="jc">
	<div id="mb_pattern" class="mb_pattern"></div>
	<div class="radial-gradient"></div>
	<!-- MENU BEGIN -->
	<section class="menu box-opacity" id="menu">
		<nav class="nav clearfix">
			<span class="postNav" id="postNav"><h3><a href="">事记</a></h3></span>
			<span class="imgNav" id="imgNav"><h3><a href="">画册</a></h3></span>
			<span class="vedNav" id="vedNav"><h3><a href="">留言</a></h3></span>
			<span class="timeNav" id="timeNav"><h3><a href="">时间轴</a></h3></span>
			<span class="userNav">
				<div id="user" class="user f-yahei">
					<h3>
						<!--判断用户状态-->
						<% if (!user) { %> 
						<a href="/login" id="login" class="abg">登入</a> | 
						<a href="/reg" id="reg" class="abg"> 注册</a> 
						<% } else { %> 
						<a href="/u/<%= user.name%>"  class="user-name"> <%= user.name%> </a>
					</h3>
					<div class="user-menu">
						<ul>
							<li><a href="">修改昵称</a></li>
							<li><a href="">修改密码</a></li>
							<li><a href="/logout">退出登录</a></li>
						</ul>
					</div>
					<% } %> 
				</div>
			</span>
		</nav>
	</section>
	
	<!-- <span><a title="标签" href="/tags">tags</a></span> -->
	
	<!-- MENU OVER -->
	<div id="expando">
		<div class="ltbg" id="ltbg" data-toggle="tooltip" data-placement="right" title="" data-original-title="请点击空白区域收缩面板"></div>
		<div class="lt">
			<!-- LOGO & TITLE BEGIN -->
			<header class="jc-header" id="jc-header">
				<hgroup>
				   <h1 class="f-yahei"><a href="/"><%= title %></a></h1>
				   <h2><a><%= h2 %></a></h2>
				</hgroup>
			</header>
			<!-- LOGO & TITLE OVER -->


			<div class="con-list" id="conList">
				
				<% include info.ejs%>
				<!-- POST BEGIN -->
				<section class="post-list public-list">
					<ul class="post-wrapper">
						
					</ul>	
				</section>
				<!-- POST OVER -->
				<!-- IMG BEGIN -->
				<section class="img-list">
					<button type="button" class="btn-lg show-list"><span class="glyphicon glyphicon-list-alt"></span>返回相册列表</button>
					<div class="btn-group btn-group-sm clearfix" id="showMode" style="display:none">
					  <p>请选择浏览方式：</p>
					  <button type="button" class="btn btn-default btn-lg show-grid"><span class="glyphicon glyphicon-align-justify"></span>矩阵</button>
					  <button type="button" class="btn btn-default btn-lg show-book"><span class="glyphicon glyphicon-book  "></span>翻页</button>
					  <button type="button" class="btn btn-default btn-lg show-bgs active"><span class="glyphicon glyphicon-fullscreen"></span>背景</button>
					</div>
					<div class="img-list-con clearfix">
						
					</div>
				</section>
				<!-- IMG OVER -->
				<!-- vedio BEGIN -->
				<section class="vedio-list">
					<% if (!user) { %> 
					<h1>Welcome to JOECORA </h1> 
					<p>请登录留言！</p> 
					<% } else { %> 
					  <%- partial('say') %>  
					<% } %>
					<!--<ul><%- partial('postlist', {posts:posts}) %> </ul>-->
				</section>
				<!-- vedio OVER -->	
			</div>
		</div>
	</div>
	
	<!-- 左右翻 -->
	<div class="cn-nav" id="cnNav">
	  <a href="#" class="cn-nav-item cn-nav-prev">                         
		<span class="glyphicon glyphicon-fast-backward"></span>
		<div></div>
	  </a>  
	  <a href="#" class="cn-nav-item cn-nav-next">  
		<span class="glyphicon glyphicon-fast-forward"></span>
		<div></div>
	  </a>
	</div>

	<!-- about -->
	<div class="about">
		<ul class="about-con clearfix">
			<li><a><span class="glyphicon glyphicon-cloud"></span>有关 JOECORA</a><div class="about-item-desc">Joe & Cora's Website</div></li>
			<li><a><span class="glyphicon glyphicon-asterisk"></span>个人简历</a><div class="about-item-desc">
				
				有丰富的从事网页前端开发及网页设计制作的能力。意向于web前端开发方向 或 网站（产品）策划设计，互联网产品等工作：<br /><br />
				
				1、精通HTML、XML等DOM操作，熟悉JSON操作，熟悉HTML5页面重构。对于响应式网站设计制作有一定的经验及认识。<br />
				2、精通CSS，CSS3。熟悉Bootstrape框架，掌握Less Css应用。<br />
				3、熟练掌握Javascript，熟练掌握Dojo,jQuery,Backbone,<br />熟悉Ajax同源操作，跨域JSONP。对WEB应用产品的前端性能优化和用户体验有一定的认知,对富应用开发RIA MVC有一定了解。<br />
				4、掌握前端+Wordpress系统/ECMS系统独立开发网站，此外对移动互联网前端相关的设计开发有最基本了解。个人网站:http://mei027.com<br />
				5、熟悉NODEJS博客开发，对NODEJS强烈的兴趣和一定程度的应用。<br />
				6、前期有一年多网页设计能力，有丰富的作品及案例。熟悉精通 如精通Photoshop,Dreamweave。<br />

				有从事与计算机相关性强的计算机类的工作；掌握数据结构，操作系统基本原理和技术。有较强的写作能力。
				
			</div></li>
			<li><a><span class="glyphicon glyphicon-asterisk"></span>个人简历</a><div class="about-item-desc">个人简历 个人简历 个人简历 个人简历 个人简历</div></li>
			<li><a><span class="glyphicon glyphicon-asterisk"></span>友情链接</a>
			<div class="about-item-desc">
				<a href="">ituring</a>
				<a href="">图灵社区</a>
				<a href="">互联网举报中心</a>
				<a href="">NODEJS博客开发</a>
				<a href="">移动互联网前端</a>
				<a href="">Wordpress系统</a>
				<a href="">ECMS系统</a>
			</div></li>
		</ul>
		<div class="about-btn">
			<span>分享到： </span>
			<span class="share-sns clearfix"><a href="" class="qq"></a><a href=""  class="sina"></a><a href=""  class="douban"></a><a href=""  class="t163"></a></span>
			<span class="about-more">更多信息...<span class="glyphicon glyphicon-chevron-up"></span></span>
		</div>
		
	</div>


	<!-- footer -->
<!--<script type="text/javascript" src="/javascripts/jquery.min.js"></script>
	<script type="text/javascript" src="/javascripts/jquery-ui.min.js"></script>-->
	<script type="text/javascript" src="/javascripts/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="/javascripts/jquery-ui.js"></script> 
	<script type="text/javascript" src="/javascripts/prefixfree.min.js"></script>
	<script type="text/javascript" src="/javascripts/jquery.vegas.js"></script>
	<script type="text/javascript" src="/javascripts/underscore-min.js"></script>
	<script type="text/javascript" src="/javascripts/jquery.lettering.js"></script>
	<script type="text/javascript" src="/javascripts/bootstrap.min.js"></script>  	 
	<script type="text/javascript" src="/javascripts/jquery.transform-0.9.1.min.js"></script>
	<script type="text/javascript" src="/javascripts/summernote.min.js"></script>
	<script type="text/javascript" src="/javascripts/jc.js"></script>
</body>
</html>