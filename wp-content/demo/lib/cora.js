/**
***	@author: Joe  
*** @E-mail: icareu.joe@gmail.com
***	@vesion: j.2013.4.11
***	@精通js: P79
**/

//JOE
(function(){
	JOE = {
		// @包 命名空间
		JOE:window.JOE || "",
		//@包string
		string:{
			//将类似font-size将换为fontSize;
			camelize: function(s) {
				return s.replace(/-(\w)/g, function (strMatch, p1){
				return p1.toUpperCase();
			});
			},
		},
		//@DOM包
		dom:{	//@search 
			//通过ID查找多个元素
			getByIDs:function(){
				var elem = {};
				id = arguments[i];
				for(var i=0; i<arguments.length; i++){
					elem[id] = document.getElementById(id);
					if(elem[id] == null)
					throw new Error("没有这个ID元素" + id);
					}
				return elem;
			},
			//提炼ID，tag	
			id:function (name) {
			    return document.getElementById(name);
			},
			//在elem元素中找到tag元素
			tag: function(elem,name) {
			    // If the context element is not provided, search the whole document
			    return (elem || document).getElementsByTagName(name);
			},
			//getByClass √
			getByClass: (function() {		
				if (document.getElementsByClassName) {
					return function(searchClass,node,single) {
						if (node == null) {	node = document; }
						if (single) {
							return node.getElementsByClassName(searchClass)[0];
						} else {
							return node.getElementsByClassName(searchClass);
						}
					};
				} else {
					return function(searchClass,node,single) {
						var classElements = [],
							tag = '*';
						if (node == null) {	node = document; }
						var els = node.getElementsByTagName(tag);
						var elsLen = els.length;
						var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
						for (var i = 0, j = 0; i < elsLen; i++) {
							if ( pattern.test(els[i].className) ) {
								if (single) {
									return els[i];
								} else {
									classElements[j] = els[i];
									j++;
								}
							}
						}
						return classElements;
					};
				}
			})(),
			//在ele中返回有classname类名的元素
			hasClass: function(ele, classN) {
				var classes = this.getAttribute(ele, 'class') || this.getAttribute(ele, 'className') || "";
				return (classes.search(classN) > -1);
			},
			addClass: function(ele, classN) {
				if (!this.hasClass(ele, classN)) {
					var classes = this.getAttribute(ele, 'class') || this.getAttribute(ele, 'className') || "";
					classes = classes + ' ' + classN + ' ';
					classes = classes.replace(/\s{2,}/g, ' ');
					ele.setAttribute('class', classes);
				}
			},
			removeClass: function(ele, classN) {
				if (this.hasClass(ele, classN)) {
					var classes = this.getAttribute(ele, 'class') || this.getAttribute(ele, 'className') || "";
					classes = classes.replace(classN, '');
					ele.setAttribute('class', classes);
				}
			},
	
			//将Nodelist变换成数组
			convertToArray:function(nodes){
				var array = null;
				try{	//针对非IE
					array = Array.prototype.slice.call(nodes,0);
					}catch(ex){
						array = new Array();
						for(var i=0,len=nodes.length;i<len;i++){
							array.push(nodes[i]);
							}
						}
					return array;
			},
			//去取文档空格
			cleanWhitespace:function ( element ) {
			    // If no element is provided, do the whole HTML document
			    element = element || document;
			    // Use the first child as a starting point
			    var cur = element.firstChild;
			
			    // Go until there are no more child nodes
			    while ( cur != null ) {
			
			        // If the node is a text node, and it contains nothing but whitespace
			        if ( cur.nodeType == 3 && ! /\S/.test(cur.nodeValue) ) {
			            // Remove the text node
			            element.removeChild( cur );
			
			        // Otherwise, if it’s an element
			        } else if ( cur.nodeType == 1 ) {
			             // Recurse down through the document
			             cleanWhitespace( cur );
			        }
			
			        cur = cur.nextSibling; // Move through the child nodes
			    }
			},

			//@遍历
			//firstChild,lastChild,previousSibling,nextSibling,parent通用用法(nodeType == 1是element)
			//firstChild
			first:function( elem ) {
				    elem = elem.firstChild;
				    return elem && elem.nodeType != 1 ?
					next( elem ) : elem;
				},
			//lastChild
			last:function( elem ) {
				    elem = elem.lastChild;
				    return elem && elem.nodeType != 1 ?
					prev( elem ) : elem;
				},
			//previousSibling	
			prev:function( elem ) {
				    do {
					elem = elem.previousSibling;
				    } while ( elem && elem.nodeType != 1 );
				    return elem;
				},
			//nextSibling
			next:function( elem ) {
				    do {
					elem = elem.nextSibling;
				    } while ( elem && elem.nodeType != 1 );
				    return elem;
				},
			//逐个元素的文档遍历
			//返回元素e的第n层祖先元素
			parent:function(e,n){
				if(n === undefined) n = 1;
				while(n-- && e) {
					e = e.parentNode;
					}
				if(!e || e.nodeType !== 1) return null;
				return e;
				},
			//返回元素e的第n个兄弟元素
			sibling:function(e,n){
				while(e && n !== 0){ //民或有未定义马上返回
					if(n>0){
						if(e.nextElementSibling) e = e.nextElementSibling;
						else{
							for(e=e.nextSibling; e&&e.nodeType!==1; e=nextSibling)
							/*空循环*/;	}	
						}
					n--;
					if(n<0){
						if(e.firstElementSibling) e = e.firstElementSibling;
						else{
							for(e=e.firstSibling; e&&e.nodeType!==1; e=firstSibling)
							/*空循环*/;	
						}
						}
					n++;
				}
				return e;
				},
			//返回元素e的第n层子元素
			child:function(e, n) {
			    if (e.children) {                      // If children array exists
			        if (n < 0) n += e.children.length; // Convert negative n to array index
			        if (n < 0) return null;            // If still negative, no child
			        return e.children[n];              // Return specified child
			    }
			
			    // If e does not have a children array, find the first child and count
			    // forward or find the last child and count backwards from there.
			    if (n >= 0) { // n is non-negative: count forward from the first child
			        // Find the first child element of e
			        if (e.firstElementChild) e = e.firstElementChild;
			        else {
			            for(e = e.firstChild; e && e.nodeType !== 1; e = e.nextSibling)
			                /* empty */;
			        }
			        return sibling(e, n); // Return the nth sibling of the first child
			    }
			    else { // n is negative, so count backwards from the end
			        if (e.lastElementChild) e = e.lastElementChild;
			        else {
			            for(e = e.lastChild; e && e.nodeType !== 1; e=e.previousSibling)
			                /* empty */;
			        }
			        return sibling(e, n+1); // +1 to convert child -1 to sib 0 of last
			    }
			},
			//@text
			//在DOM中任意元素获取文本
			getText:function (e) {
			    var t = "";
			    // If an element was passed, get it’s children, 
			    // otherwise assume it’s an array
			    e = e.childNodes || e;
			    // Look through all child nodes
			    for ( var j = 0; j < e.length; j++ ) {
				// If it’s not an element, append its text value
				// Otherwise, recurse through all the element’s children 
				t += e[j].nodeType != 1 ?
				    e[j].nodeValue : arguments.callee(e[j].childNodes);
			    }
			
			    // Return the matched text
			    return t;
			},
			
			//查找元素节点中所有后代节点的文本 同上
			// Return the plain-text content of element e, recursing into child elements.
			// This method works like the textContent property
			textContent:function (e) {
			    var child, type, s = "";  // s holds the text of all children
			    for(child = e.firstChild; child != null; child = child.nextSibling) {
				type = child.nodeType;
				if (type === 3 || type === 4)  // Text and CDATASection nodes
				    s += child.nodeValue;
				else if (type === 1)           // Recurse for Element nodes
				    s += arguments.callee(child);
			    }
			    return s;
			},
			//在DOM中任意元素设置 文本
			setText : function(node, txt) {
				if(!node.hasChildNodes()) {
					return false;
				}
				var reg = /^\s+$/;
				var tempObj = node.firstChild;
				while(tempObj.nodeType != 3 && tempObj.nextSibling != null || reg.test(tempObj.nodeValue)) {
					tempObj = tempObj.nextSibling;
				}
				if(tempObj.nodeType == 3) {
					tempObj.nodeValue = txt
				} else {
					return false;
				}
			},
			//@设置属性
			//为元素设计属性值
			attr:function (elem, name, value) {
			    // Make sure that a valid name was provided
			    if ( !name || name.constructor != String ) return '';
			    // Figure out if the name is one of the weird naming cases
			    name = { 'for': 'htmlFor', 'class': 'className' }[name] || name;
			    // If the user is setting a value, also
			    if ( value != null ) {
				// Set the quick way first
				elem[name] = value;
				// If we can, use setAttribute
				if ( elem.setAttribute )
				    elem.setAttribute(name,value);
			    }
			    // Return the value of the attribute
			    return elem[name] || elem.getAttribute(name) || '';
			},
			//@create DOM创建
			//在DOM中创建元素
			create:function(elem){
			    return document.createElementNS ?
				document.createElementNS( 'http://www.w3.org/1999/xhtml', elem ) :
				document.createElement( elem );
			},
			//异步加载导入外部JS
			loadScript:function (url){
				var script = document.creatElement("script");
				script.type = "text/javascript";
				script.src = url;
				document.body.appendChild(script);
			},
			//异步加载导入执行JS代码段
			loadScriptString:function(code){
				var script = document.createElement("script");
				script.type = "text/javascript";
				try{
					script.appendChild(document.createTextNode(code));
					}catch(ex){script.text = code;}
				document.body.appendChild(script);
			},
			//加载导入外部css
			loadCss:function (css){
				var css = document.creatElement("style");
				script.type = "text/css";
				script.src = url;
				document.body.appendChild(css);
			},
			//加载导入执行css代码段
			loadStyleString:function(css){
				var style = document.createElement("style");
				style.type = "text/css";
				try{
					style.appendChild(document.createTextNode(css));	
				}catch(ex){style.styleSheet.cssText = css;}
				var head = document.getElementsByTagName("haed")[0];
				head.appendChild(style);
				},
			//创建链接
			createLink : function(to, txt) {
				var tempObj = document.createElement('a');
				tempObj.appendChild(document.createTextNode(txt));
				tempObj.setAttribute('href', to);
				return tempObj;
			},
			//@DOM插入
			//将child节点插入到parrnet的第n个节点处
			insertAt:function(parent,child,n){
				if(n<0||n>parent.childNodes.length){
					throw new Error("不存在这个位置");
					}
				else if( n == parent.childNodes.length )
					{ parent.appendChild(child);}
				else 
					parent.insertBefore(child,parent.childNodes[n]);		
			},
			// Insert.before(), Insert.after(), Insert.atStart(), Insert.atEnd()在元素外前面，后面，里前，里后插入html
			Insert:(function() {
			    // If elements have a native insertAdjacentHTML, use it in four HTML
			    // insertion functions with more sensible names.
			    if (document.createElement("div").insertAdjacentHTML) {
				return {
				    before: function(e,h) {e.insertAdjacentHTML("beforebegin",h);},
				    after: function(e,h) {e.insertAdjacentHTML("afterend",h);},
				    atStart: function(e,h) {e.insertAdjacentHTML("afterbegin",h);},
				    atEnd: function(e,h) {e.insertAdjacentHTML("beforeend",h);}
				};
			    }
			
			    // Otherwise, we have no native insertAdjacentHTML. Implement the same
			    // four insertion functions and then use them to define insertAdjacentHTML.
			
			    // First, define a utility method that takes a string of HTML and returns
			    // a DocumentFragment containing the parsed representation of that HTML.
			    function fragment(html) {
				var elt = document.createElement("div");      // Create empty element
				var frag = document.createDocumentFragment(); // Create empty fragment
				elt.innerHTML = html;                         // Set element content
				while(elt.firstChild)                         // Move all nodes
				    frag.appendChild(elt.firstChild);         //    from elt to frag
				return frag;                                  // And return the frag
			    }
			
			    var Insert = {
				before: function(elt, html) {
				    elt.parentNode.insertBefore(fragment(html), elt);
				},
				after: function(elt, html) {
				    elt.parentNode.insertBefore(fragment(html),elt.nextSibling);
				},
				atStart: function(elt, html) {
				    elt.insertBefore(fragment(html), elt.firstChild);
				},
				atEnd: function(elt, html) { elt.appendChild(fragment(html)); }
			    };
			
			    // Now implement insertAdjacentHTML based on the functions above
			    Element.prototype.insertAdjacentHTML = function(pos, html) {
				switch(pos.toLowerCase()) {
				case "beforebegin": return Insert.before(this, html);
				case "afterend": return Insert.after(this, html);
				case "afterbegin": return Insert.atStart(this, html);
				case "beforeend": return Insert.atEnd(this, html);
				}
			    };
			    return Insert;  // Finally return the four insertion function
			}()),
			
			//@size
			//确定游览器位置及尺寸		
			//确实浏览器视口的宽度与高度
			// Return the viewport size as w and h properties of an object
			getViewportSize:function (w) {
			    // Use the specified window or the current window if no argument
			    w = w || window;  
			    
			    // This works for all browsers except IE8 and before
			    if (w.innerWidth != null) return {w: w.innerWidth, h:w.innerHeight};
			
			    // For IE (or any browser) in Standards mode
			    var d = w.document;
			    if (document.compatMode == "CSS1Compat")        
				return { w: d.documentElement.clientWidth, h: d.documentElement.clientHeight };
			    // For browsers in Quirks mode
			    return { w: d.body.clientWidth, h: d.body.clientHeight };
			},
				//窗口相对于屏幕
			//确定元素位置及尺寸
			screenPos: function(w){
				w = w || window;
				return{
					left:(typeof window.screenLeft == "number")?window.screenLeft:window.screenX,
					top: (typeof window.screenTop  == "number")?window.screenTop :window.screenY}
			},
			//取得元素相对于页面左的偏移量
			getPageX:function(element){		
			    return element.offsetParent? element.offsetLeft+arguments.callee(element.offsetParent):element.offsetLeft
			},
		
			//取得元素相对于页面上的偏移量 
			getPageY:function(element){	   
			    return element.offsetParent? element.offsetTop +arguments.callee(element.offsetParent):element.offsetTop
			},
			//取得元素相对于父元素的水平面偏移
			parentX:function (elem) {
			    // If the offsetParent is the element’s parent, break early
			    return elem.parentNode == elem.offsetParent ? elem.offsetLeft : getpageX( elem ) - getpageX( elem.parentNode );
				// Otherwise, we need to find the position relative to the entire
				// page for both elements, and find the difference		
			},
			
			// 取得元素相对于父元素的垂直偏移
			parentY:function (elem) {
			    // If the offsetParent is the element’s parent, break early
			    return elem.parentNode == elem.offsetParent ? elem.offsetTop : getPageY( elem ) - getPageY( elem.parentNode );
				// Otherwise, we need to find the position relative to the entire
				// page for both elements, and find the difference	
			},
			// 获取窗口或元素滚动条的位置，返回属性x与y
			getScrollOffsets:function(w) {
			    // Use the specified window or the current window if no argument
			    w = w || window;
			
			    // This works for all browsers except IE versions 8 and before
			    if (w.pageXOffset != null) return {x: w.pageXOffset, y:w.pageYOffset};
			
			    // For IE (or any browser) in Standards mode
			    var d = w.document;
			    if (document.compatMode == "CSS1Compat")
				return {x:d.documentElement.scrollLeft, y:d.documentElement.scrollTop};
			
			    // For browsers in Quirks mode
			    return { x: d.body.scrollLeft, y: d.body.scrollTop };
			},
							
			//让DIV水平居中2	
			layerCenter:function(inObj){
				inObj.style.left = (Math.round(getViewportSize.w/2) -  Math.round(inObj.offsetWidth/2)) + getScrollOffsets.x + "px";
				inObj.style.top = (Math.round(getViewportSize.h/2) -  Math.round(inObj.offsetHeight/2)) + getScrollOffsets.y + "px";
			},
			//获取光标的水平位置
			getX:function (e){
				e=e||window.event;
				return e.pageX || e.clientX + document.body.scrollLeft;
				},
			getY:function (e){
				e= e|| window.event;
				return e.pageY || e.clientY + document.body.scrollTop;
				},
			//取得元素的大小或位置,getBoundingClientRect().left,getBoundingClientRect().right
			//getBoundingClientRect().bottom - getBoundingClientRect().top
			getBoundingClientRect:function (element){ 
			   
				var scrollTop = document.documentElement.scrollTop;
				var scrollLeft = document.documentElement.scrollLeft;
				
				if (element.getBoundingClientRect){
				    if (typeof arguments.callee.offset != "number"){
					var temp = document.createElement("div");
					temp.style.cssText = "position:absolute;left:0;top:0;";
					document.body.appendChild(temp);
					arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
					document.body.removeChild(temp);
					temp = null;
				    }
			    
				    var rect = element.getBoundingClientRect();
				    var offset = arguments.callee.offset;
			    
				    return {
					left: rect.left + offset,
					right: rect.right + offset,
					top: rect.top + offset,
					bottom: rect.bottom + offset
			    
				    };
				} else {
			    
				    var actualLeft = getPageX(element);
				    var actualTop = getPageY(element);
			    
				   return {
					left: actualLeft - scrollLeft,
					right: actualLeft + element.offsetWidth - scrollLeft,
					top: actualTop - scrollTop,
					bottom: actualTop + element.offsetHeight - scrollTop
				    }
				}
			    },
	
			//@CSS
			// 获取元素真实的css样式属性值
			getStyle:function( elem, name ) {
			    // If the property exists in style[], then it’s been set recently (and is current)
			    if (elem.style[name])
				return elem.style[name];
			
			    // Otherwise, try to use IE’s method
			    else if (elem.currentStyle)
				return elem.currentStyle[name];
			
			    // Or the W3C’s method, if it exists
			    else if (document.defaultView && document.defaultView.getComputedStyle) {
				// It uses the traditional ‘text-align’ style of rule writing, instead of textAlign
				name = name.replace(/([A-Z])/g,"-$1");
				name = name.toLowerCase();
			
				// Get the style object and get the value of the property (if it exists)
				var s = document.defaultView.getComputedStyle(elem,"");
				return s && s.getPropertyValue(name);
			
			    // Otherwise, we’re using some other browser
			    } else
				return null;
			},
			
			//获取元素CSS位置
			posX : function(elem){
				return parseInt(JOE.dom.getStyle(elem, "left") );
				},	
			posY : function(elem){
				return parseInt(JOE.dom.getStyle(elem,"top") );
				},
			//设置元素位置函数
			setX:function(elem,pos){
				elem.style.left = pos + "px";
				},
			setY:function(elem,pos){
				elem.style.top = pos + "px";
				},
			//调整元素相对于当前位置的距离
			addX:function(elem,pos){
				setX(JOE.dom.posX(elem) + pos);
				},
			addY:function(elem,pos){
				setY(JOE.dom.posY(elem) + pos);
				},
				//元素没有隐藏时获取元素真实尺寸
			getHeight: function(elem){
				return parseInt(JOE.dom.getStyle(elem,'height'));
				},
			getWidth: function(elem){
				return parseInt(JOE.dom.getStyle(elem,'width'));
				},
			//即使元素隐藏，获取元素完整的可能的尺寸
			fullHeight: function(elem){
				if(JOE.dom.getStyle(elem,'display')!='none')
					return elem.offsetHeight || JOE.dom.getHeight(elem);
				var old = JOE.dom.resetCss(elem,{	//设置CSS原有属性
					display: '',
					visibility: 'hidden',
					position:'absolute'
					});
				var h = elem.clientHeight || JOE.dom.getHeight(elem);
				JOE.dom.restoreCss(elem,old);	//恢复CSS原有属性
				return h;
				},
				
			fullWidth: function(elem){
				if(JOE.dom.getStyle(elem,'display')!='none')
					return elem.offsetWidth || JOE.dom.getWidth(elem);
				var old = JOE.dom.resetCss(elem,{	//设置CSS原有属性
					display: '',
					visibility: 'hidden',
					position:'absolute'
					});
				var w = elem.clientWidth || JOE.dom.getWidth(elem);
				JOE.dom.restoreCss(elem,old);	//恢复CSS原有属性
				return w;
				},
			//设置CSS一组属性的函数，它可以恢复到原有设置
			resetCSS:function ( elem, prop ) {
			    var old = {};
			
			    // Go through each of the properties
			    for ( var i in prop ) {
				// Remember the old property value
				old[ i ] = elem.style[ i ];
			
				// And set the new value
				elem.style[ i ] = prop[i];
			    }
			
			    // Retun the set of changed values, to be used by restoreCSS
			    return old;
			},
			
			// 恢复CSS原有属性值
			restoreCSS:function ( elem, prop ) {
			    // Reset all the properties back to their original values
			    for ( var i in prop )
				elem.style[ i ] = prop[ i ];
			},

			//@CSS @animation
			//显隐
			// A function for hiding (using display) an element
			hide:function ( elem ) {
			    // Find out what it"s current display state is
			    var curDisplay = JOE.dom.getStyle( elem, "display" );
			
			    //  Remember its display state for later
			    if ( curDisplay != "none" )
				elem.$oldDisplay = curDisplay;
			
			    // Set the display to none (hiding the element)
			    elem.style.display = "none";
			},
			
			// A function for showing (using display) an element
			show:function ( elem ) {
			    // Set the display property back to what it use to be, or use
			    // "block", if no previous display had been saved
			    elem.style.display = elem.$oldDisplay || "block";
			},
			//设置透明度
			setOpacity:function ( elem, level ) {
			    // If filters exist, then this is IE, so set the Alpha filter
			    if ( elem.filters )
				elem.filters.alpha.opacity = level;
			
			    // Otherwise use the W3C opacity property
			    else
				elem.style.opacity = level / 100;
			},
			//下划
			slideDown:function ( elem ) {
			   // Find the full, potential, height of the element
			    var h = JOE.dom.fullHeight( elem );
			    // Start the slide down at  0
			    elem.style.height = "0px";   
			    // Show the element (but you can see it, since the height is 0)
			    JOE.dom.show( elem );
			    // We誶e going to do a 20 frame?animation that takes
			    // place over one second
			    for ( var i = 0; i <= 100; i += 5 ) {
				// A closure to make sure that we have the right i?        
				(function(){
				    var pos = i;
				    //step = parseInt(h/20);
				    // Set the timeout to occur at the specified time in the future
				    setTimeout(function(){
					// Set the new height of the element
					elem.style.height = ( pos / 100 ) * h + "px";
			
				    },  ( pos + 1 ) * 10 );
				})();
			    }
			},
			//渐显
			fadeIn:function ( elem ) {
			    // Start the opacity at  0
			    JOE.dom.setOpacity( elem, 0 );
			
			    // Show the element (but you can see it, since the opacity is 0)
			    JOE.dom.show( elem );
			
			    // We誶e going to do a 20 詅rame?animation that takes
			    // place over one second
			    for ( var i = 0; i <= 100; i += 5 ) {
				// A closure to make sure that we have the right 詉?       
				(function(){
				    var pos = i; 
			
				    // Set the timeout to occur at the specified time in the future
				    setTimeout(function(){
			
					// Set the new opacity of the element
					JOE.dom.setOpacity( elem, pos );
			
				    }, ( pos + 1 ) * 10 );
				})();
			    }
			},
			cssjs : function(a, o, c1, c2) {
				switch (a) {
					case 'swap':
						o.className = !DOMhelp.cssjs('check', o, c1) ? o.className.replace(c2, c1) : o.className.replace(c1, c2);
						break;
					case 'add':
						if(!DOMhelp.cssjs('check', o, c1)) {
							o.className += o.className ? ' ' + c1 : c1;
						}
						break;
					case 'remove':
						var rep = o.className.match(' ' + c1) ? ' ' + c1 : c1;
						o.className = o.className.replace(rep, '');
						break;
					case 'check':
						var found = false;
						var temparray = o.className.split(' ');
						for(var i = 0; i < temparray.length; i++) {
							if(temparray[i] == c1) {
								found = true;
							}
						}
						return found;
						break;
				}
			},
		},
		//@包array
		array:{
			copyArray:function(){},
			findInArray:function(){}
			},
			
		//@包form
		form:{},
		
		//@包event
		eve:{	//文档准备就绪时操作的函数及列队,whenReady监听DOMContentLoaded和readystatechange事件
			//使用是包含在whenReady(function(){-----})
			 whenReady:(function() { // This function returns the whenReady() function
				    var funcs = [];    // The functions to run when we get an event
				    var ready = false; // Switches to true when the handler is triggered
				
				    // The event handler invoked when the document becomes ready
				    function handler(e) {
					// If we've already run once, just return
					if (ready) return;
				
					// If this was a readystatechange event where the state changed to
					// something other than "complete", then we're not ready yet
					if (e.type === "readystatechange" && document.readyState !== "complete")
					    return;
					
					// Run all registered functions.
					// Note that we look up funcs.length each time, in case calling
					// one of these functions causes more functions to be registered.
					for(var i = 0; i < funcs.length; i++) 
					    funcs[i].call(document);
				
					// Now set the ready flag to true and forget the functions
					ready = true;
					funcs = null;
				    }
				
				    // Register the handler for any event we might receive
				    if (document.addEventListener) {
					document.addEventListener("DOMContentLoaded", handler, false);
					document.addEventListener("readystatechange", handler, false);
					window.addEventListener("load", handler, false);
				    }
				    else if (document.attachEvent) {
					document.attachEvent("onreadystatechange", handler);
					window.attachEvent("onload", handler);
				    }
				
				    // Return the whenReady function
				    return function whenReady(f) {
					if (ready) f.call(document); // If already ready, just run it
					else funcs.push(f);          // Otherwise, queue it for later.
				    }
				}()),
			
			//绑定事件
			addEvent :function (obj,evtype,fn,useCapture) {  
				if (obj.addEventListener) {  
					obj.addEventListener(evtype,fn,useCapture);  
				} 
				else if(obj.attachEvent){  
					obj.attachEvent("on"+evtype,function () {  
						fn.call(obj);  
					});  
				} else {  
					obj["on"+evtype]=fn;//事实上这种情况不会存在  
				}  
			} , 
			//删除事件
			delEvent :function (obj,evtype,fn,useCapture) {  
				if (obj.removeEventListener) {  
					obj.removeEventListener(evtype,fn,useCapture);  
				} else if(obj.detachEvent) {  
					obj.detachEvent("on"+evtype,fn);  
				} else {  
					obj["on"+evtype]=null;  
				}  
			} , 
			
			stopBubble:function(e) {
			    // If an event object is provided, then this is a non-IE browser
			    if ( e  && e.stopPropagation)
				// and therefore it supports the W3C stopPropagation() method
				e.stopPropagation();
			    else
				// Otherwise, we need to use the Internet Explorer way of cancelling event bubbling
				window.event.cancelBubble = true;
			},
			stopDefault:function(e){
				if(e && e.preventDefault)
					e.preventDefault();
				else
					window.event.returnValue = false;
				return false;
			},
				
			// written by Dean Edwards, 2005// http://dean.edwards.name/  
			//事件绑定，解决了IE中this指向window的问题;
			//无法解决在库中优雅的存在的问题
			/**
			function addEvent(element, type, handler) {
				// assign each event handler a unique ID
				if (!handler.$$guid) handler.$$guid = addEvent.guid++;
				// create a hash table of event types for the element
				if (!element.events) element.events = {};
				// create a hash table of event handlers for each element/event pair
				var handlers = element.events[type];
				if (!handlers) {
					handlers = element.events[type] = {};
					// store the existing event handler (if there is one)
					if (element["on" + type]) {
						handlers[0] = element["on" + type];
					}
				}
				// store the event handler in the hash table
				handlers[handler.$$guid] = handler;
				// assign a global event handler to do all the work
				element["on" + type] = handleEvent;
			};
			// a counter used to create unique IDs
			addEvent.guid = 1;

			function removeEvent(element, type, handler) {
				// delete the event handler from the hash table
				if (element.events && element.events[type]) {
					delete element.events[type][handler.$$guid];
				}
			};

			function handleEvent(event) {
				var returnValue = true;
				// grab the event object (IE uses a global event object)
				event = event || fixEvent(window.event);
				// get a reference to the hash table of event handlers
				var handlers = this.events[event.type];
				// execute each event handler
				for (var i in handlers) {
					this.$$handleEvent = handlers[i];
					if (this.$$handleEvent(event) === false) {
						returnValue = false;
					}
				}
				return returnValue;
			};

			function fixEvent(event) {
				// add W3C standard event methods
				event.preventDefault = fixEvent.preventDefault;
				event.stopPropagation = fixEvent.stopPropagation;
				return event;
			};
			fixEvent.preventDefault = function() {
				this.returnValue = false;
			};
			fixEvent.stopPropagation = function() {
				this.cancelBubble = true;
			};
				**/
			/**
			 * Drag.js: drag absolutely positioned HTML elements.
			 *   event: the Event object for the mousedown event.
			 **/
			drag: function (elementToDrag, event) {
			    // The initial mouse position, converted to document coordinates
			    var scroll = JOE.dom.getScrollOffsets();  // A utility function from elsewhere
			    var startX = event.clientX + scroll.x;
			    var startY = event.clientY + scroll.y;
			
			    // The original position (in document coordinates) of the element
			    // that is going to be dragged.  Since elementToDrag is absolutely
			    // positioned, we assume that its offsetParent is the document body.
			    var origX = elementToDrag.offsetLeft;
			    var origY = elementToDrag.offsetTop;
			
			    // Compute the distance between the mouse down event and the upper-left
			    // corner of the element. We'll maintain this distance as the mouse moves.
			    var deltaX = startX - origX;
			    var deltaY = startY - origY;
			
			    // Register the event handlers that will respond to the mousemove events
			    // and the mouseup event that follow this mousedown event.
			    if (document.addEventListener) {  // Standard event model
				// Register capturing event handlers on the document
				document.addEventListener("mousemove", moveHandler, true);
				document.addEventListener("mouseup", upHandler, true);
			    }
			    else if (document.attachEvent) {  // IE Event Model for IE5-8
				// In the IE event model, we capture events by calling
				// setCapture() on the element to capture them.
				elementToDrag.setCapture();
				elementToDrag.attachEvent("onmousemove", moveHandler);
				elementToDrag.attachEvent("onmouseup", upHandler);
				// Treat loss of mouse capture as a mouseup event.
				elementToDrag.attachEvent("onlosecapture", upHandler);
			    }
			
			    // We've handled this event. Don't let anybody else see it.
			    if (event.stopPropagation) event.stopPropagation();  // Standard model
			    else event.cancelBubble = true;                      // IE
			
			    // Now prevent any default action.
			    if (event.preventDefault) event.preventDefault();   // Standard model
			    else event.returnValue = false;                     // IE
			
			    /**
			     * This is the handler that captures mousemove events when an element
			     * is being dragged. It is responsible for moving the element.
			     **/
			    function moveHandler(e) {
				if (!e) e = window.event;  // IE event Model
			
				// Move the element to the current mouse position, adjusted by the
				// position of the scrollbars and the offset of the initial click.
				var scroll = JOE.dom.getScrollOffsets();
				elementToDrag.style.left = (e.clientX + scroll.x - deltaX) + "px";
				elementToDrag.style.top = (e.clientY + scroll.y - deltaY) + "px";
			
				// And don't let anyone else see this event.
				if (e.stopPropagation) e.stopPropagation();  // Standard
				else e.cancelBubble = true;                  // IE
			    }
			
			    /**
			     * This is the handler that captures the final mouseup event that
			     * occurs at the end of a drag.
			     **/
			    function upHandler(e) {
				if (!e) e = window.event;  // IE Event Model
			
				// Unregister the capturing event handlers.
				if (document.removeEventListener) {  // DOM event model
				    document.removeEventListener("mouseup", upHandler, true);
				    document.removeEventListener("mousemove", moveHandler, true);
				}
				else if (document.detachEvent) {  // IE 5+ Event Model
				    elementToDrag.detachEvent("onlosecapture", upHandler);
				    elementToDrag.detachEvent("onmouseup", upHandler);
				    elementToDrag.detachEvent("onmousemove", moveHandler);
				    elementToDrag.releaseCapture();
				}
			
				// And don't let the event propagate any further.
				if (e.stopPropagation) e.stopPropagation();  // Standard model
				else e.cancelBubble = true;                  // IE
			    }
			},
			// Enclose the content element in a frame or viewport of the specified width
			// and height (minimum 50x50). The optional contentX and contentY arguments
			// specify the initial offset of the content relative to the frame. (If
			// specified, they must be <= 0.) The frame has mousewheel event handlers that
			// allow the user to pan the element, and to shrink or enlarge the frame.
			enclose:function (content, framewidth, frameheight, contentX, contentY) {
			    // These arguments aren't just the initial values: they maintain the
			    // current state and are used and modified by the mousewheel handler.
			    framewidth = Math.max(framewidth, 50);
			    frameheight = Math.max(frameheight, 50);
			    contentX = Math.min(contentX, 0) || 0;
			    contentY = Math.min(contentY, 0) || 0;
			
			    // Create the frame element and set a CSS classname and styles
			    var frame = document.createElement("div");
			    frame.className = "enclosure"; // So we can define styles in a stylesheet
			    frame.style.width = framewidth + "px";       // Set the frame size.
			    frame.style.height = frameheight + "px";
			    frame.style.overflow = "hidden";             // No scrollbars, no overflow
			    frame.style.boxSizing = "border-box";        // Border-box simplifies the 
			    frame.style.webkitBoxSizing = "border-box";  // calculations for resizing
			    frame.style.MozBoxSizing = "border-box";     // the frame.
			
			    // Put the frame in the document and move the content elt into the frame.
			    content.parentNode.insertBefore(frame, content);
			    frame.appendChild(content);
			
			    // Position the element relative to the frame
			    content.style.position = "relative";
			    content.style.left = contentX + "px";
			    content.style.top = contentY + "px";
			
			    // We'll need to work around some browser-specific quirks below
			    var isMacWebkit = (navigator.userAgent.indexOf("Macintosh") !== -1 &&
					       navigator.userAgent.indexOf("WebKit") !== -1);
			    var isFirefox = (navigator.userAgent.indexOf("Gecko") !== -1);
			
			    // Register mousewheel event handlers.
			    frame.onwheel = wheelHandler;       // Future browsers
			    frame.onmousewheel = wheelHandler;  // Most current browsers
			    if (isFirefox)                      // Firefox only
				frame.addEventListener("DOMMouseScroll", wheelHandler, false);
			
			    function wheelHandler(event) {
				var e = event || window.event;  // Standard or IE event object
			
				// Extract the amount of rotation from the event object, looking
				// for properties of a wheel event object, a mousewheel event object 
				// (in both its 2D and 1D forms), and the Firefox DOMMouseScroll event.
				// Scale the deltas so that one "click" toward the screen is 30 pixels.
				// If future browsers fire both "wheel" and "mousewheel" for the same
				// event, we'll end up double-counting it here. Hopefully, however,
				// cancelling the wheel event will prevent generation of mousewheel.
				var deltaX = e.deltaX*-30 ||  // wheel event
					  e.wheelDeltaX/4 ||  // mousewheel
							0;    // property not defined
				var deltaY = e.deltaY*-30 ||  // wheel event
					  e.wheelDeltaY/4 ||  // mousewheel event in Webkit
			   (e.wheelDeltaY===undefined &&      // if there is no 2D property then 
					  e.wheelDelta/4) ||  // use the 1D wheel property
					     e.detail*-10 ||  // Firefox DOMMouseScroll event
						       0;     // property not defined
			
				// Most browsers generate one event with delta 120 per mousewheel click.
				// On Macs, however, the mousewheels seem to be velocity-sensitive and
				// the delta values are often larger multiples of 120, at 
				// least with the Apple Mouse. Use browser-testing to defeat this.
				if (isMacWebkit) {
				    deltaX /= 30;
				    deltaY /= 30;
				}
			
				// If we ever get a mousewheel or wheel event in (a future version of)
				// Firefox, then we don't need DOMMouseScroll anymore.
				if (isFirefox && e.type !== "DOMMouseScroll")
				    frame.removeEventListener("DOMMouseScroll", wheelHandler, false);
			
				// Get the current dimensions of the content element
				var contentbox = content.getBoundingClientRect();
				var contentwidth = contentbox.right - contentbox.left;
				var contentheight = contentbox.bottom - contentbox.top;
			
				if (e.altKey) {  // If Alt key is held down, resize the frame
				    if (deltaX) {
					framewidth -= deltaX; // New width, but not bigger than the
					framewidth = Math.min(framwidth, contentwidth);  // content
					framewidth = Math.max(framewidth,50);   // and no less than 50.
					frame.style.width = framewidth + "px";  // Set it on frame
				    }
				    if (deltaY) {
					frameheight -= deltaY;  // Do the same for the frame height
					frameheight = Math.min(frameheight, contentheight);
					frameheight = Math.max(frameheight-deltaY, 50);
					frame.style.height = frameheight + "px";
				    }
				}
				else { // Without the Alt modifier, pan the content within the frame
				    if (deltaX) {
					// Don't scroll more than this
					var minoffset = Math.min(framewidth-contentwidth, 0);
					// Add deltaX to contentX, but don't go lower than minoffset
					contentX = Math.max(contentX + deltaX, minoffset);
					contentX = Math.min(contentX, 0);     // or higher than 0
					content.style.left = contentX + "px"; // Set new offset
				    }
				    if (deltaY) {
					var minoffset = Math.min(frameheight - contentheight, 0);
					// Add deltaY to contentY, but don't go lower than minoffset
					contentY = Math.max(contentY + deltaY, minoffset);
					contentY = Math.min(contentY, 0);     // Or higher than 0
					content.style.top = contentY + "px";  // Set the new offset.
				    }
				}
			
				// Don't let this event bubble. Prevent any default action.
				// This stops the browser from using the mousewheel event to scroll
				// the document. Hopefully calling preventDefault() on a wheel event
				// will also prevent the generation of a mousewheel event for the
				// same rotation.
				if (e.preventDefault) e.preventDefault();
				if (e.stopPropagation) e.stopPropagation();
				e.cancelBubble = true;  // IE events
				e.returnValue = false;  // IE events
				return false;
			    }
			},


			},
		//@包storage
		storage:{},
		//@包brower
		brower:{},
		//@包math
		math:{},
		//@包time
		time:{},
		//@包debug
		debug:{
		
		},
		//@包ui
		ui:{},
		//执行Ajax请求的通用函数
		//使用 ajax({
		//	type:'GET',
		//	url:'',
		//	onSuccess:function(){}
		//	})
		ajax:function( options ) {
			//用户没有提供参数，就默认
		    options = {
			// HTTP Request TYPE
			type: options.type || "POST",
			// The URL
			url: options.url || "",
			timeout: options.timeout || 5000,
			//请求成功，失败，完成
			onComplete: options.onComplete || function(){},
			onError: options.onError || function(){},
			onSuccess: options.onSuccess || function(){},
			//服务器将会返回的数据类型。
			data: options.data || ""
		    };
		    
		    if (typeof XMLHttpReques == "undefined") {
		    XMLHttpRequest = function(){
			// IE使用ActiveXObject来创建新的XMLHttpRequest对象
			return new ActiveXObject(
			  navigator.userAgent.indexOf("MSIE 5") >= 0 ? "Microsoft.XMLHTTP" : "Msxml2.XMLHTTP"
			);
		      };
		    }
		    // Create the request object
		    var xml = new XMLHttpRequest();
		    // Open the asynchronous POST request
		    xml.open(options.type,options.url,true);
		    // We're going to wait for a request for 5 seconds, before giving up
		    var timeoutLength = options.timeout;
		    //记录请求是否成功完成
		    var requestDone = false;
		    //初始化一个5秒后执行的回调函数，用于取消请求
		    setTimeout(function(){
			 requestDone = true;
		    }, timeoutLength);
		    //监听文档状态的更新
		    xml.onreadystatechange = function(){
			// Wait until the data is fully loaded,
			// and make sure that the request hasn't already timed out
			if ( xml.readyState == 4 && !requestDone ) {
			    // Check to see if the request was successful
			    if ( httpSuccess( xml ) ) {
				// Execute the success callback with the data returned from the server
				options.onSuccess( httpData( xml, options.type ) );
			    // Otherwise, an error occurred, so execute the error callback
			    } else {
				options.onError();
			    }
			    // Call the completion callback
			    options.onComplete();
			    // Clean up after ourselves, to avoid memory leaks
			    xml = null;
			}
		    };
		    // Establish the connection to the server
		    xml.send();
		
		   //判断HTTP响应是否成功
		    function httpSuccess(r) {
			try {
			    // If no server status is provided, and we're actually 
			    // requesting a local file, then it was successful
			    return !r.status && location.protocol == "file:" ||
		
				// Any status in the 200 range is good
				( r.status >= 200 && r.status < 300 ) ||
		
				// Successful if the document has not been modified
				r.status == 304 ||
		
				// Safari returns an empty status if the file has not been modified
				navigator.userAgent.indexOf("Safari") >= 0 && typeof r.status == "undefined";
			} catch(e){}
		
			// If checking the status failed, then assume that the request failed too
			return false;
		    }
		
		    //从HTTP响应中解析正确数据
		    function httpData(r,type) {
			// Get the content-type header
			var ct = r.getResponseHeader("content-type");
		
			// If no default type was provided, determine if some
			// form of XML was returned from the server
			var data = !type && ct && ct.indexOf("xml") >= 0;
		
			// Get the XML Document object if XML was returned from
			// the server, otherwise return the text contents returned by the server
			data = type == "xml" || data ? r.responseXML : r.responseText;
		
			// If the specified type is "script", execute the returned text
			// response as if it was JavaScript
			if ( type == "script" )
			    eval.call( window, data );
		
			// Return the response data (either an XML Document or a text string)
			return data;
		    }
		},//AJAX通用函数完成
		// Make a JSONP request to the specified URL and pass the parsed response
		// data to the specified callback. Add a query parameter named "jsonp" to
		// the URL to specify the name of the callback function for the request.
		getJSONP:function(url, callback) {
		    // Create a unique callback name just for this request
		    var cbnum = "cb" + getJSONP.counter++; // Increment counter each time
		    var cbname = "getJSONP." + cbnum;      // As a property of this function
		    
		    // Add the callback name to the url query string using form-encoding
		    // We use the parameter name "jsonp".  Some JSONP-enabled services 
		    // may require a different parameter name, such as "callback".
		    if (url.indexOf("?") === -1)   // URL doesn't already have a query section
			url += "?jsonp=" + cbname; // add parameter as the query section
		    else                           // Otherwise, 
			url += "&jsonp=" + cbname; // add it as a new parameter.
		
		    // Create the script element that will send this request
		    var script = document.createElement("script");
		
		    // Define the callback function that will be invoked by the script
		    getJSONP[cbnum] = function(response) {
			try {
			    callback(response); // Handle the response data
			}
			finally {               // Even if callback or response threw an error
			    delete getJSONP[cbnum];                // Delete this function
			    script.parentNode.removeChild(script); // Remove script
			}
		    };
		
		    // Now trigger the HTTP request
		    script.src = url;                  // Set script url
		    document.body.appendChild(script); // Add it to the document
		},
		getJSONP:{
			counter:0			// A counter we use to create unique callback names
		},
		//AJAX函数中各种辅助函数
		ajax:{	
			 createXHR:function(){
				 if(window.XMLHttpRequest === undefined){
					 window.XMLHttpRequest = function(){
						 try{ return new ActiveXObject("Msxml2.XMLHTTP.6.0");}catch(e1){
							 try { return new ActiveXObject("Msxml2.XMLHTTP.3.0");}catch(e2){
								 throw new Error("not supported");
								 }
							 
							 }
						 }
					 }
				 },
			//对URL需要传递的参数进行编码成URL参数传递形式
			addURLParam:function(url,name,value){
				url += url.indexOf("?") == -1 ? "?":"&";
				url += encodeURIComponent(name) + "=" + encodeURIComponent(value) ;
				return url;
				},
			//对a（为数组或键值对）进行序列化编码
			serialize: function (a) {
			    // The set of serialize results
			    var s = [];		
			    // array
			    if ( a.constructor == Array ) {
				// Serialize the form elements
				for ( var i = 0; i < a.length; i++ )
				    s.push( a[i].name + "=" + encodeURIComponent( a[i].value ) );		
			    // Otherwise, key/value pairs
			    } else {
				// Serialize the key/values
				for ( var j in a )
				    s.push( j + "=" + encodeURIComponent( a[j] ) );	
			    }
			    // Return the resulting serialization
			    return s.join("&");
			},

			// 解析HTTP响应
			get:function(url, callback) {
			    var  request = new XMLHttpRequest();        // Create new request
			    request.open("GET", url);                   // Specify URL to fetch
			    request.onreadystatechange = function() {   // Define event listener
				// If the request is compete and was successful
				if (request.readyState === 4 && request.status === 200) {
				    // Get the type of the response
				    var type = request.getResponseHeader("Content-Type");
				    // Check type so we don't get HTML documents in the future
				    if (type.indexOf("xml") !== -1 && request.responseXML) 
					callback(request.responseXML);              // Document response
				    else if (type === "application/json")
					callback(JSON.parse(request.responseText)); // JSON response
				    else 
					callback(request.responseText);             // String response
				}
			    };
			    request.send(null);                         // Send the request now
			},
			
		},
		storage:{
			/*
			*实现Cookie的常规方法 
			*/
			setCookie:function (c_name, value, expiredays){
			  　　　　var exdate = new Date();
			  　　　　exdate.setDate(exdate.getDate() + expiredays);
			  　　　　document.cookie=c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
			  　　},
			getCookie:function(c_name){
			　　　　if (document.cookie.length>0){　　
			//先查询cookie是否为空，为空就return ""
			　　　　　　c_start=document.cookie.indexOf(c_name + "=")　　
			//通过String对象的indexOf()来检查这个cookie是否存在，不存在就为 -1　　
			　　　　　　if (c_start!=-1){ 
			　　　　　　　　c_start=c_start + c_name.length+1　　
			//最后这个+1其实就是表示"="号啦，这样就获取到了cookie值的开始位置
			　　　　　　　　c_end=document.cookie.indexOf(";",c_start)　　
			//其实我刚看见indexOf()第二个参数的时候猛然有点晕，后来想起来表示指定的开始索引的位置...这句是为了得到值的结束位置。因为需要考虑是否是最后一项，所以通过";"号是否存在来判断
			　　　　　　　　if (c_end==-1) c_end=document.cookie.length　　
			　　　　　　　　return unescape(document.cookie.substring(c_start,c_end))　　
			//通过substring()得到了值。想了解unescape()得先知道escape()是做什么的，都是很重要的基础，想了解的可以搜索下，在文章结尾处也会进行讲解cookie编码细节
			　　　　　　} 
			　　　　}
			　　　　return ""
			　　},　
			
			/*
			 * CookieStorage.js
			 * 实现基于Cookie的存储API
			 * 一种类似localStorage和sessionStorage的存储API
			 */
			CookieStorage:function(maxage, path) {  // Arguments specify lifetime and scope
			
			    // Get an object that holds all cookies
			    var cookies = (function() { // The getCookies() function shown earlier
				var cookies = {};           // The object we will return
				var all = document.cookie;  // Get all cookies in one big string
				if (all === "")             // If the property is the empty string
				    return cookies;         // return an empty object
				var list = all.split("; "); // Split into individual name=value pairs
				for(var i = 0; i < list.length; i++) {  // For each cookie
				    var cookie = list[i];
				    var p = cookie.indexOf("=");        // Find the first = sign
				    var name = cookie.substring(0,p);   // Get cookie name
				    var value = cookie.substring(p+1);  // Get cookie value
				    value = decodeURIComponent(value);  // Decode the value
				    cookies[name] = value;              // Store name and value
				}
				return cookies;
			    }());
			
			    // Collect the cookie names in an array
			    var keys = [];
			    for(var key in cookies) keys.push(key);
			
			    // Now define the public properties and methods of the Storage API
			
			    // The number of stored cookies
			    this.length = keys.length;
			
			    // Return the name of the nth cookie, or null if n is out of range
			    this.key = function(n) {
				if (n < 0 || n >= keys.length) return null;
				return keys[n];
			    };
			
			    // Return the value of the named cookie, or null.
			    this.getItem = function(name) { return cookies[name] || null; };
			
			    // Store a value
			    this.setItem = function(key, value) {
				if (!(key in cookies)) { // If no existing cookie with this name
				    keys.push(key);      // Add key to the array of keys
				    this.length++;       // And increment the length
				}
			
				// Store this name/value pair in the set of cookies.
				cookies[key] = value;
			
				// Now actually set the cookie.
				// First encode value and create a name=encoded-value string
				var cookie = key + "=" + encodeURIComponent(value);
			
				// Add cookie attributes to that string
				if (maxage) cookie += "; max-age=" + maxage;
				if (path) cookie += "; path=" + path;
			
				// Set the cookie through the magic document.cookie property
				document.cookie = cookie;
			    };
			
			    // Remove the specified cookie
			    this.removeItem = function(key) {
				if (!(key in cookies)) return;  // If it doesn't exist, do nothing
			
				// Delete the cookie from our internal set of cookies
				delete cookies[key];
			
				// And remove the key from the array of names, too.
				// This would be easier with the ES5 array indexOf() method.
				for(var i = 0; i < keys.length; i++) {  // Loop through all keys
				    if (keys[i] === key) {              // When we find the one we want
					keys.splice(i,1);               // Remove it from the array.
					break;
				    }
				}
				this.length--;                          // Decrement cookie length
			
				// Finally actually delete the cookie by giving it an empty value
				// and an immediate expiration date.
				document.cookie = key + "=; max-age=0";
			    };
			
			    // Remove all cookies
			    this.clear = function() {
				// Loop through the keys, removing the cookies
				for(var i = 0; i < keys.length; i++)
				    document.cookie = keys[i] + "=; max-age=0";
				// Reset our internal state
				cookies = {};
				keys = [];
				this.length = 0;
			    };
			},
			/*
			 * IE userdata实现存储				
			 */
			UserData:{
				userData : null,
				name : location.hostname,
				//this.name = "css88.com";
			
				init:function(){
				    if (!UserData.userData) {
					try {
					    UserData.userData = document.createElement('INPUT');
					    UserData.userData.type = "hidden";
					    UserData.userData.style.display = "none";
					    UserData.userData.addBehavior ("#default#userData");
					    document.body.appendChild(UserData.userData);
					    var expires = new Date();
					    expires.setDate(expires.getDate()+365);
					    UserData.userData.expires = expires.toUTCString();
					} catch(e) {
					    return false;
					}
				    }
				    return true;
				},
			
				setItem : function(key, value) {
			
				    if(UserData.init()){
					UserData.userData.load(UserData.name);
					UserData.userData.setAttribute(key, value);
					UserData.userData.save(UserData.name);
				    }
				},
			
				getItem : function(key) {
				    if(UserData.init()){
				    UserData.userData.load(UserData.name);
				    return UserData.userData.getAttribute(key)
				    }
				},
			
				remove : function(key) {
				    if(UserData.init()){
				    UserData.userData.load(UserData.name);
				    UserData.userData.removeAttribute(key);
				    UserData.userData.save(UserData.name);
				    }
			
				}
			    },

			
				
		},
	} 
})()
	
//加载DOM

//调试
function myLogger(id){
	id = id || '';
	var logWindow = null;	//受保护的属性,将在内部被对象用来引用日志窗口的DOM节点
	var createWindow = function(){	//受保护方法，可以用在DOM树中创建logWindow节点
		//创建logWindow调试窗口,居中显示
		logWindow = document.createElement("ul");	//logWindow公有，才能被访问添加li进去
		logWindow.setAttribute('id',id);
		logWindow.style.position = "absolute";
		logWindow.style.width = logWindow.style.height = "200px";
		var left = (JOE.dom.getViewportSize().w - parseInt(logWindow.style.width))/2;
		var top = (JOE.dom.getViewportSize().h - parseInt(logWindow.style.height))/2;
		logWindow.style.left = left+"px";
		logWindow.style.top = top+"px"; 
		//添加样式
		logWindow.style.background = "#fafafa";
		logWindow.style.border = '1px solid #ccc';
		logWindow.style.boxShadow = "1px 2px 3px #ccc";
		logWindow.style.overflowY = "scroll";
		logWindow.style.borderRadius = "4px";
		logWindow.style.padding = logWindow.style.margin = '2px';
		//创建调试窗口标题及说明
		var tit = document.createElement("h3");
		tit.innerText = "调试窗口";
		tit.style.margin = "2px";
		tit.style.color = "#000";
		logWindow.appendChild(tit);
		//添加到DOM body中
		document.body.appendChild(logWindow);
	};	
	this.writeRaw = function(message){	//特权方法，用来向日志窗口中添加一条新记录
				// If the initial window doesn't exist, create it.
		if(!logWindow) { 
			createWindow();
		}
		// Create the list item and style it appropriately
		var li = document.createElement('li');
		li.style.padding= '2px';
		li.style.border= '0';
		li.style.borderBottom = '1px dotted #CCC';
		li.style.margin= '2px';
		li.style.color= '#666';
		li.style.font = '12px/9px Verdana, Tahoma, Sans';
		li.style.listStyle="none inside none";

		// Add the message to the log node
		if(typeof message == 'undefined') {
			li.appendchild(document.createTextNode('Message was undefined'));
		} else if(typeof li.innerHTML != undefined) {
			li.innerHTML = message;
		} else {
			li.appendchild(document.createTextNode(message));
		}
		// Append this entry to the log window
		logWindow.appendChild(li);
		return this;
	}
}

myLogger.prototype = {							//公有方法
	write: function (message) {
		// warn about null messages
		if(typeof message == 'string' && message.length==0) {
			return this.writeRaw('ADS.log: null message');
		}

		// if the message isn't a string try to call the toString() method,
		// if it doesn't exist simply log the type of object
		if (typeof message != 'string') {
			if(message.toString) return this.writeRaw(message.toString());
			else return this.writeRaw(typeof message);
		}

		// transform < and > so that .innerHTML doesn't parse the message as HTML
		message = message.replace(/</g,"&lt;").replace(/>/g,"&gt;");

		return this.writeRaw(message);
	},


	/**
	 * Writes a simple header to the log window.
	 */ 
	header: function (message) {
		message = '<span style="color:white;background-color:black;font-weight:bold;padding:0px 5px;">' + message + '</span>';
		return this.writeRaw(message);
	}
}

if(!window.JOE){window['JOE']={}}

window['JOE']['log'] = new myLogger("debug");


//Douglas Crockford的使用JavaScript模拟类形式继承的三个函数	
//一个简单的辅助函数，允许你为对象的原型绑定新的函数 
Function.prototype.method = function(name, func) { 
    this.prototype[name] = func; 
    return this; 
}; 

//一个(相当复杂的)函数，允许你优雅地从其它对象中继承函数， 
//同时仍能调用"父"对象的函数 
Function.method('inherits', function(parent) { 
    //追踪所处的父级深度 
     var depth = 0; 
    //继承parent的方法 
    var proto = this.prototype = new parent(); 	//@byjoe 类继承中用到原型继承的方法
     
    //创建一个名为uber的新的特权方法， 
    //调用它可以执行在继承中被覆盖的任何函数 
    this.method('uber', function uber(name) { 
        var func; //将被执行的函数
        var ret; // 该函数的返回值
        var v = parent.prototype; //父类的prototype 
        //如果已经位于另一"uber"函数内     
        if (depth) { 
            //越过必要的深度以找到最初的prototype      
            for ( var i = d; i > 0; i += 1 ) { 
                v = v.constructor.prototype; 
            }     
            //并从该prototype取得函数 
            func = v[name]; 
         
        //否则，这是第一级的uber调用 
        } else { 
            //从prototype中取得函数 
            func = proto[name];          
            //如果该函数属于当前的prototype 
            if ( func == this[name] ) { 
                //则转入parent的prototype替代之 
                func = v[name]; 
            } 
        }     
        //记录我们位于继承栈中的'深度' 
        depth += 1;        
        //使用用第一个参数后面的所有参数调用该函数 
        //(第一个参数保有我们正在执行的函数的名称) 
        ret = func.apply(this, Array.prototype.slice.apply(arguments, [1]));         
        //重置栈深度 
        depth -= 1;        
        //返回执行函数的返回值 
        return ret; 
    }); 
    return this; 
});

//一个用来仅继承父对象中的几个函数的函数， 
//而不是使用new parent()继承每一个函数 
Function.method('swiss', function(parent) {
	//遍历所有要继承的方法 
    for (var i = 1; i < arguments.length; i += 1) { 
        //要导入的方法名 
        var name = arguments[i]; 
	//将方法导入这个对象的prototype 
        this.prototype[name] = parent.prototype[name];
	 } 
    return this; 
});
/**
 **Function.prototype.method:此函数是为构造器的prototype附加函数的简单方式。这一特
 **殊的子句能够工作是因为所有的构造器都是函数，故能获得新的方法"method"。 
 **Function.prototype.inherits:这一函数能用来提供简单的单父继承。函数代码的主体围绕着
 **在你的对象的任何方法中调用this.uber("方法名")使之执行它所重写了的父对象的方法的能
 **力。这是JavaScript继承模型本身不具备的一个方面。 
 ** Function.prototype.swiss:这是.method()函数的一个高级版本，能用来从一个父对象中抓
 **取多个方法。当将它分别用于多个父对象时，你将得到一种实用的多父继承的形式。 
 **/
 
