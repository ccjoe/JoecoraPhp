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
			<span class="postNav" id="postNav"><h3><a href="">�¼�</a></h3></span>
			<span class="imgNav" id="imgNav"><h3><a href="">����</a></h3></span>
			<span class="vedNav" id="vedNav"><h3><a href="">����</a></h3></span>
			<span class="timeNav" id="timeNav"><h3><a href="">ʱ����</a></h3></span>
			<span class="userNav">
				<div id="user" class="user f-yahei">
					<h3>
						<!--�ж��û�״̬-->
						<% if (!user) { %> 
						<a href="/login" id="login" class="abg">����</a> | 
						<a href="/reg" id="reg" class="abg"> ע��</a> 
						<% } else { %> 
						<a href="/u/<%= user.name%>"  class="user-name"> <%= user.name%> </a>
					</h3>
					<div class="user-menu">
						<ul>
							<li><a href="">�޸��ǳ�</a></li>
							<li><a href="">�޸�����</a></li>
							<li><a href="/logout">�˳���¼</a></li>
						</ul>
					</div>
					<% } %> 
				</div>
			</span>
		</nav>
	</section>
	
	<!-- <span><a title="��ǩ" href="/tags">tags</a></span> -->
	
	<!-- MENU OVER -->
	<div id="expando">
		<div class="ltbg" id="ltbg" data-toggle="tooltip" data-placement="right" title="" data-original-title="�����հ������������"></div>
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
					<button type="button" class="btn-lg show-list"><span class="glyphicon glyphicon-list-alt"></span>��������б�</button>
					<div class="btn-group btn-group-sm clearfix" id="showMode" style="display:none">
					  <p>��ѡ�������ʽ��</p>
					  <button type="button" class="btn btn-default btn-lg show-grid"><span class="glyphicon glyphicon-align-justify"></span>����</button>
					  <button type="button" class="btn btn-default btn-lg show-book"><span class="glyphicon glyphicon-book  "></span>��ҳ</button>
					  <button type="button" class="btn btn-default btn-lg show-bgs active"><span class="glyphicon glyphicon-fullscreen"></span>����</button>
					</div>
					<div class="img-list-con clearfix">
						
					</div>
				</section>
				<!-- IMG OVER -->
				<!-- vedio BEGIN -->
				<section class="vedio-list">
					<% if (!user) { %> 
					<h1>Welcome to JOECORA </h1> 
					<p>���¼���ԣ�</p> 
					<% } else { %> 
					  <%- partial('say') %>  
					<% } %>
					<!--<ul><%- partial('postlist', {posts:posts}) %> </ul>-->
				</section>
				<!-- vedio OVER -->	
			</div>
		</div>
	</div>
	
	<!-- ���ҷ� -->
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
			<li><a><span class="glyphicon glyphicon-cloud"></span>�й� JOECORA</a><div class="about-item-desc">Joe & Cora's Website</div></li>
			<li><a><span class="glyphicon glyphicon-asterisk"></span>���˼���</a><div class="about-item-desc">
				
				�зḻ�Ĵ�����ҳǰ�˿�������ҳ���������������������webǰ�˿������� �� ��վ����Ʒ���߻���ƣ���������Ʒ�ȹ�����<br /><br />
				
				1����ͨHTML��XML��DOM��������ϤJSON��������ϤHTML5ҳ���ع���������Ӧʽ��վ���������һ���ľ��鼰��ʶ��<br />
				2����ͨCSS��CSS3����ϤBootstrape��ܣ�����Less CssӦ�á�<br />
				3����������Javascript����������Dojo,jQuery,Backbone,<br />��ϤAjaxͬԴ����������JSONP����WEBӦ�ò�Ʒ��ǰ�������Ż����û�������һ������֪,�Ը�Ӧ�ÿ���RIA MVC��һ���˽⡣<br />
				4������ǰ��+Wordpressϵͳ/ECMSϵͳ����������վ��������ƶ�������ǰ����ص���ƿ�����������˽⡣������վ:http://mei027.com<br />
				5����ϤNODEJS���Ϳ�������NODEJSǿ�ҵ���Ȥ��һ���̶ȵ�Ӧ�á�<br />
				6��ǰ����һ�����ҳ����������зḻ����Ʒ����������Ϥ��ͨ �羫ͨPhotoshop,Dreamweave��<br />

				�д��������������ǿ�ļ������Ĺ������������ݽṹ������ϵͳ����ԭ��ͼ������н�ǿ��д��������
				
			</div></li>
			<li><a><span class="glyphicon glyphicon-asterisk"></span>���˼���</a><div class="about-item-desc">���˼��� ���˼��� ���˼��� ���˼��� ���˼���</div></li>
			<li><a><span class="glyphicon glyphicon-asterisk"></span>��������</a>
			<div class="about-item-desc">
				<a href="">ituring</a>
				<a href="">ͼ������</a>
				<a href="">�������ٱ�����</a>
				<a href="">NODEJS���Ϳ���</a>
				<a href="">�ƶ�������ǰ��</a>
				<a href="">Wordpressϵͳ</a>
				<a href="">ECMSϵͳ</a>
			</div></li>
		</ul>
		<div class="about-btn">
			<span>������ </span>
			<span class="share-sns clearfix"><a href="" class="qq"></a><a href=""  class="sina"></a><a href=""  class="douban"></a><a href=""  class="t163"></a></span>
			<span class="about-more">������Ϣ...<span class="glyphicon glyphicon-chevron-up"></span></span>
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