!function(a){function b(){return""===i.hash||"#"===i.hash}function c(a,b){for(var c=0;c<a.length;c+=1)if(b(a[c],c,a)===!1)return}function d(a){for(var b=[],c=0,d=a.length;d>c;c++)b=b.concat(a[c]);return b}function e(a,b,c){if(!a.length)return c();var d=0;!function e(){b(a[d],function(b){b||b===!1?(c(b),c=function(){}):(d+=1,d===a.length?c():e())})}()}function f(a,b,c){c=a;for(var d in b)if(b.hasOwnProperty(d)&&(c=b[d](a),c!==a))break;return c===a?"([._a-zA-Z0-9-]+)":c}function g(a,b){for(var c,d=0,e="";c=a.substr(d).match(/[^\w\d\- %@&]*\*[^\w\d\- %@&]*/);)d=c.index+c[0].length,c[0]=c[0].replace(/^\*/,"([_.()!\\ %@&a-zA-Z0-9-]+)"),e+=a.substr(0,c.index)+c[0];a=e+=a.substr(d);var g,h,i=a.match(/:([^\/]+)/gi);if(i){h=i.length;for(var j=0;h>j;j++)g=i[j],a="::"===g.slice(0,2)?g.slice(1):a.replace(g,f(g,b))}return a}function h(a,b,c,d){var e,f=0,g=0,h=0,c=(c||"(").toString(),d=(d||")").toString();for(e=0;e<a.length;e++){var i=a[e];if(i.indexOf(c,f)>i.indexOf(d,f)||~i.indexOf(c,f)&&!~i.indexOf(d,f)||!~i.indexOf(c,f)&&~i.indexOf(d,f)){if(g=i.indexOf(c,f),h=i.indexOf(d,f),~g&&!~h||!~g&&~h){var j=a.slice(0,(e||1)+1).join(b);a=[j].concat(a.slice((e||1)+1))}f=(h>g?h:g)+1,e=0}else f=0}return a}Array.prototype.filter||(Array.prototype.filter=function(a,b){for(var c,d=[],e=0,f=this.length;f>e;e++)e in this&&a.call(b,c=this[e],e,this)&&d.push(c);return d}),Array.isArray||(Array.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)});var i=document.location,j={mode:"modern",hash:i.hash,history:!1,check:function(){var a=i.hash;a!=this.hash&&(this.hash=a,this.onHashChanged())},fire:function(){"modern"===this.mode?this.history===!0?window.onpopstate():window.onhashchange():this.onHashChanged()},init:function(a,b){function c(a){for(var b=0,c=k.listeners.length;c>b;b++)k.listeners[b](a)}var d=this;if(this.history=b,k.listeners||(k.listeners=[]),"onhashchange"in window&&(void 0===document.documentMode||document.documentMode>7))this.history===!0?setTimeout(function(){window.onpopstate=c},500):window.onhashchange=c,this.mode="modern";else{var e=document.createElement("iframe");e.id="state-frame",e.style.display="none",document.body.appendChild(e),this.writeFrame(""),"onpropertychange"in document&&"attachEvent"in document&&document.attachEvent("onpropertychange",function(){"location"===event.propertyName&&d.check()}),window.setInterval(function(){d.check()},50),this.onHashChanged=c,this.mode="legacy"}return k.listeners.push(a),this.mode},destroy:function(a){if(k&&k.listeners)for(var b=k.listeners,c=b.length-1;c>=0;c--)b[c]===a&&b.splice(c,1)},setHash:function(a){return"legacy"===this.mode&&this.writeFrame(a),this.history===!0?(window.history.pushState({},document.title,a),this.fire()):i.hash="/"===a[0]?a:"/"+a,this},writeFrame:function(a){var b=document.getElementById("state-frame"),c=b.contentDocument||b.contentWindow.document;c.open(),c.write("<script>_hash = '"+a+"'; onload = parent.listener.syncHash;<script>"),c.close()},syncHash:function(){var a=this._hash;return a!=i.hash&&(i.hash=a),this},onHashChanged:function(){}},k=a.Router=function(a){return this instanceof k?(this.params={},this.routes={},this.methods=["on","once","after","before"],this.scope=[],this._methods={},this._insert=this.insert,this.insert=this.insertEx,this.historySupport=null!=(null!=window.history?window.history.pushState:null),this.configure(),void this.mount(a||{})):new k(a)};k.prototype.init=function(a){var c=this;if(this.handler=function(a){var b=a&&a.newURL||window.location.hash,d=c.history===!0?c.getPath():b.replace(/.*#/,"");c.dispatch("on","/"===d.charAt(0)?d:"/"+d)},j.init(this.handler,this.history),this.history===!1)b()&&a?i.hash=a:b()||c.dispatch("on","/"+i.hash.replace(/^(#\/|#|\/)/,""));else{var d=b()&&a?a:b()?null:i.hash.replace(/^#/,"");d&&window.history.replaceState({},document.title,d),(d||this.run_in_init===!0)&&this.handler()}return this},k.prototype.explode=function(){var a=this.history===!0?this.getPath():i.hash;return"/"===a.charAt(1)&&(a=a.slice(1)),a.slice(1,a.length).split("/")},k.prototype.setRoute=function(a,b,c){var d=this.explode();return"number"==typeof a&&"string"==typeof b?d[a]=b:"string"==typeof c?d.splice(a,b,s):d=[a],j.setHash(d.join("/")),d},k.prototype.insertEx=function(a,b,c,d){return"once"===a&&(a="on",c=function(a){var b=!1;return function(){return b?void 0:(b=!0,a.apply(this,arguments))}}(c)),this._insert(a,b,c,d)},k.prototype.getRoute=function(a){var b=a;if("number"==typeof a)b=this.explode()[a];else if("string"==typeof a){var c=this.explode();b=c.indexOf(a)}else b=this.explode();return b},k.prototype.destroy=function(){return j.destroy(this.handler),this},k.prototype.getPath=function(){var a=window.location.pathname;return"/"!==a.substr(0,1)&&(a="/"+a),a},k.prototype.configure=function(a){a=a||{};for(var b=0;b<this.methods.length;b++)this._methods[this.methods[b]]=!0;return this.recurse=a.recurse||this.recurse||!1,this.async=a.async||!1,this.delimiter=a.delimiter||"/",this.strict="undefined"==typeof a.strict?!0:a.strict,this.notfound=a.notfound,this.resource=a.resource,this.history=a.html5history&&this.historySupport||!1,this.run_in_init=this.history===!0&&a.run_handler_in_init!==!1,this.every={after:a.after||null,before:a.before||null,on:a.on||null},this},k.prototype.param=function(a,b){":"!==a[0]&&(a=":"+a);var c=new RegExp(a,"g");this.params[a]=function(a){return a.replace(c,b.source||b)}},k.prototype.on=k.prototype.route=function(a,b,c){var d=this;return c||"function"!=typeof b||(c=b,b=a,a="on"),Array.isArray(b)?b.forEach(function(b){d.on(a,b,c)}):(b.source&&(b=b.source.replace(/\\\//gi,"/")),Array.isArray(a)?a.forEach(function(a){d.on(a.toLowerCase(),b,c)}):(b=b.split(new RegExp(this.delimiter)),b=h(b,this.delimiter),void this.insert(a,this.scope.concat(b),c)))},k.prototype.dispatch=function(a,b,c){function d(){f.last=g.after,f.invoke(f.runlist(g),f,c)}var e,f=this,g=this.traverse(a,b,this.routes,""),h=this._invoked;return this._invoked=!0,g&&0!==g.length?("forward"===this.recurse&&(g=g.reverse()),e=this.every&&this.every.after?[this.every.after].concat(this.last):[this.last],e&&e.length>0&&h?(this.async?this.invoke(e,this,d):(this.invoke(e,this),d()),!0):(d(),!0)):(this.last=[],"function"==typeof this.notfound&&this.invoke([this.notfound],{method:a,path:b},c),!1)},k.prototype.invoke=function(a,b,d){var f,g=this;this.async?(f=function(c,d){return Array.isArray(c)?e(c,f,d):void("function"==typeof c&&c.apply(b,a.captures.concat(d)))},e(a,f,function(){d&&d.apply(b,arguments)})):(f=function(d){return Array.isArray(d)?c(d,f):"function"==typeof d?d.apply(b,a.captures||[]):void("string"==typeof d&&g.resource&&g.resource[d].apply(b,a.captures||[]))},c(a,f))},k.prototype.traverse=function(a,b,c,d,e){function f(a){function b(a){for(var c=[],d=0;d<a.length;d++)c[d]=Array.isArray(a[d])?b(a[d]):a[d];return c}function c(a){for(var b=a.length-1;b>=0;b--)Array.isArray(a[b])?(c(a[b]),0===a[b].length&&a.splice(b,1)):e(a[b])||a.splice(b,1)}if(!e)return a;var d=b(a);return d.matched=a.matched,d.captures=a.captures,d.after=a.after.filter(e),c(d),d}var g,h,i,j,k=[];if(b===this.delimiter&&c[a])return j=[[c.before,c[a]].filter(Boolean)],j.after=[c.after].filter(Boolean),j.matched=!0,j.captures=[],f(j);for(var l in c)if(c.hasOwnProperty(l)&&(!this._methods[l]||this._methods[l]&&"object"==typeof c[l]&&!Array.isArray(c[l]))){if(g=h=d+this.delimiter+l,this.strict||(h+="["+this.delimiter+"]?"),i=b.match(new RegExp("^"+h)),!i)continue;if(i[0]&&i[0]==b&&c[l][a])return j=[[c[l].before,c[l][a]].filter(Boolean)],j.after=[c[l].after].filter(Boolean),j.matched=!0,j.captures=i.slice(1),this.recurse&&c===this.routes&&(j.push([c.before,c.on].filter(Boolean)),j.after=j.after.concat([c.after].filter(Boolean))),f(j);if(j=this.traverse(a,b,c[l],g),j.matched)return j.length>0&&(k=k.concat(j)),this.recurse&&(k.push([c[l].before,c[l].on].filter(Boolean)),j.after=j.after.concat([c[l].after].filter(Boolean)),c===this.routes&&(k.push([c.before,c.on].filter(Boolean)),j.after=j.after.concat([c.after].filter(Boolean)))),k.matched=!0,k.captures=j.captures,k.after=j.after,f(k)}return!1},k.prototype.insert=function(a,b,c,d){var e,f,h,i,j;if(b=b.filter(function(a){return a&&a.length>0}),d=d||this.routes,j=b.shift(),/\:|\*/.test(j)&&!/\\d|\\w/.test(j)&&(j=g(j,this.params)),b.length>0)return d[j]=d[j]||{},this.insert(a,b,c,d[j]);if(j||b.length||d!==this.routes){if(f=typeof d[j],h=Array.isArray(d[j]),d[j]&&!h&&"object"==f)switch(e=typeof d[j][a]){case"function":return void(d[j][a]=[d[j][a],c]);case"object":return void d[j][a].push(c);case"undefined":return void(d[j][a]=c)}else if("undefined"==f)return i={},i[a]=c,void(d[j]=i);throw new Error("Invalid route context: "+f)}switch(e=typeof d[a]){case"function":return void(d[a]=[d[a],c]);case"object":return void d[a].push(c);case"undefined":return void(d[a]=c)}},k.prototype.extend=function(a){function b(a){d._methods[a]=!0,d[a]=function(){var b=1===arguments.length?[a,""]:[a];d.on.apply(d,b.concat(Array.prototype.slice.call(arguments)))}}var c,d=this,e=a.length;for(c=0;e>c;c++)b(a[c])},k.prototype.runlist=function(a){var b=this.every&&this.every.before?[this.every.before].concat(d(a)):d(a);return this.every&&this.every.on&&b.push(this.every.on),b.captures=a.captures,b.source=a.source,b},k.prototype.mount=function(a,b){function c(b,c){var e=b,f=b.split(d.delimiter),g=typeof a[b],i=""===f[0]||!d._methods[f[0]],j=i?"on":e;return i&&(e=e.slice((e.match(new RegExp("^"+d.delimiter))||[""])[0].length),f.shift()),i&&"object"===g&&!Array.isArray(a[b])?(c=c.concat(f),void d.mount(a[b],c)):(i&&(c=c.concat(e.split(d.delimiter)),c=h(c,d.delimiter)),void d.insert(j,c,a[b]))}if(a&&"object"==typeof a&&!Array.isArray(a)){var d=this;b=b||[],Array.isArray(b)||(b=b.split(d.delimiter));for(var e in a)a.hasOwnProperty(e)&&c(e,b.slice(0))}}}("object"==typeof exports?exports:window),function(a){function b(c,d){var e={align:"center",valign:"center"};if(a.extend(e,d),0===c.height())return void c.load(function(){b(a(this),d)});var g,h,i,j=f(),k=j.width,l=j.height,m=c.width(),n=c.height(),o=l/k,p=n/m;o>p?(g=l/p,h=l):(g=k,h=k*p),i={width:g+"px",height:h+"px",top:"auto",bottom:"auto",left:"auto",right:"auto"},isNaN(parseInt(e.valign,10))?"top"==e.valign?i.top=0:"bottom"==e.valign?i.bottom=0:i.top=(l-h)/2:i.top=0-(h-l)/100*parseInt(e.valign,10)+"px",isNaN(parseInt(e.align,10))?"left"==e.align?i.left=0:"right"==e.align?i.right=0:i.left=(k-g)/2:i.left=0-(g-k)/100*parseInt(e.align,10)+"px",c.css(i)}function c(){j.prependTo("body").fadeIn()}function d(){j.fadeOut("fast",function(){a(this).remove()})}function e(){return a("body").css("backgroundImage")?a("body").css("backgroundImage").replace(/url\("?(.*?)"?\)/i,"$1"):void 0}function f(){var a=window,b="inner";return"innerWidth"in window||(a=document.documentElement||document.body,b="client"),{width:a[b+"Width"],height:a[b+"Height"]}}var g,h=a("<img />").addClass("vegas-background"),i=a("<div />").addClass("vegas-overlay"),j=a("<div />").addClass("vegas-loading"),k=a(),l=null,m=[],n=0,o=5e3,p=function(){},q={init:function(f){var g={src:e(),align:"center",valign:"center",fade:0,loading:!0,load:function(){},complete:function(){}};a.extend(g,a.vegas.defaults.background,f),g.loading&&c();var i=h.clone();return i.css({position:"fixed",left:"0px",top:"0px"}).bind("load",function(){i!=k&&(a(window).bind("load resize.vegas",function(){b(i,g)}),k.is("img")?(k.stop(),i.hide().insertAfter(k).fadeIn(g.fade,function(){a(".vegas-background").not(this).remove(),a("body").trigger("vegascomplete",[this,n-1]),g.complete.apply(i,[n-1])})):i.hide().prependTo("body").fadeIn(g.fade,function(){a("body").trigger("vegascomplete",[this,n-1]),g.complete.apply(this,[n-1])}),k=i,b(k,g),g.loading&&d(),a("body").trigger("vegasload",[k.get(0),n-1]),g.load.apply(k.get(0),[n-1]),n&&(a("body").trigger("vegaswalk",[k.get(0),n-1]),g.walk.apply(k.get(0),[n-1])))}).attr("src",g.src),a.vegas},destroy:function(b){return b&&"background"!=b||(a(".vegas-background, .vegas-loading").remove(),a(window).unbind("*.vegas"),k=a()),b&&"overlay"!=b||a(".vegas-overlay").remove(),clearInterval(g),a.vegas},overlay:function(b){var c={src:null,opacity:null};return a.extend(c,a.vegas.defaults.overlay,b),i.remove(),i.css({margin:"0",padding:"0",position:"fixed",left:"0px",top:"0px",width:"100%",height:"100%"}),c.src===!1&&i.css("backgroundImage","none"),c.src&&i.css("backgroundImage","url("+c.src+")"),c.opacity&&i.css("opacity",c.opacity),i.prependTo("body"),a.vegas},slideshow:function(b,c){var d={step:n,delay:o,preload:!1,loading:!0,backgrounds:m,walk:p};if(a.extend(d,a.vegas.defaults.slideshow,b),d.backgrounds!=m&&(b.step||(d.step=0),b.walk||(d.walk=function(){}),d.preload&&a.vegas("preload",d.backgrounds)),m=d.backgrounds,o=d.delay,n=d.step,p=d.walk,clearInterval(g),!m.length)return a.vegas;var e=function(){0>n&&(n=m.length-1),(n>=m.length||!m[n-1])&&(n=0);var b=m[n++];b.walk=d.walk,b.loading=d.loading,"undefined"==typeof b.fade&&(b.fade=d.fade),b.fade>d.delay&&(b.fade=d.delay),a.vegas(b)};return e(),c||(l=!1,a("body").trigger("vegasstart",[k.get(0),n-1])),l||(g=setInterval(e,d.delay)),a.vegas},next:function(){var b=n;return n&&(a.vegas("slideshow",{step:n},!0),a("body").trigger("vegasnext",[k.get(0),n-1,b-1])),a.vegas},previous:function(){var b=n;return n&&(a.vegas("slideshow",{step:n-2},!0),a("body").trigger("vegasprevious",[k.get(0),n-1,b-1])),a.vegas},jump:function(b){var c=n;return n&&(a.vegas("slideshow",{step:b},!0),a("body").trigger("vegasjump",[k.get(0),n-1,c-1])),a.vegas},stop:function(){var b=n;return n=0,l=null,clearInterval(g),a("body").trigger("vegasstop",[k.get(0),b-1]),a.vegas},pause:function(){return l=!0,clearInterval(g),a("body").trigger("vegaspause",[k.get(0),n-1]),a.vegas},get:function(a){return null===a||"background"==a?k.get(0):"overlay"==a?i.get(0):"step"==a?n-1:"paused"==a?l:void 0},preload:function(b){var c=[];for(var d in b)if(b[d].src){var e=document.createElement("img");e.src=b[d].src,c.push(e)}return a.vegas}};a.vegas=function(b){return q[b]?q[b].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof b&&b?void a.error("Method "+b+" does not exist"):q.init.apply(this,arguments)},a.vegas.defaults={background:{},slideshow:{},overlay:{}}}(jQuery),function(a){function b(b,c,d,e){var f=b.text().split(c),g="";f.length&&(a(f).each(function(a,b){g+='<span style="animation-delay: '+.1*(a-1)+'s" class="'+d+(a+1)+'">'+b+"</span>"+e}),b.empty().append(g))}var c={init:function(){return this.each(function(){b(a(this),"","char","")})},words:function(){return this.each(function(){b(a(this)," ","word"," ")})},lines:function(){return this.each(function(){var c="eefec303079ad17405c889e092e105b0";b(a(this).children("br").replaceWith(c).end(),c,"line","")})}};a.fn.lettering=function(b){return b&&c[b]?c[b].apply(this,[].slice.call(arguments,1)):"letters"!==b&&b?(a.error("Method "+b+" does not exist on jQuery.lettering"),this):c.init.apply(this,[].slice.call(arguments,0))}}(jQuery),function(a){function b(b,e){function f(a){g.song=a,g.showIndexInfo(g.getSongData()[0],g.getSongData()[0].abSong[0]),b.autoPlay?g.t=setTimeout(function(){g.initPlay()},b.timeout):!1,d.call(g,b)}var g=this;this.player=a(e),this.opts=b,c.call(this,b,f)}function c(b,c){function d(b){a.ajax({url:b,dataType:"json"}).done(c).fail(function(){alert("获取信息失败")})}return d(b.url),c}function d(b){function c(){if(!h.mediaCenter().paused){var b=a(this),c=e(event,b,"align");k.width(c*b.width()),h.mediaTime(c)}}function d(){var b=a(this);if(b.hasClass("next"))return h.mediaCenter().paused&&b.siblings().first().trigger("click"),void h.next();if(b.hasClass("prev"))return h.mediaCenter().paused&&b.siblings().first().trigger("click"),void h.prev();if(b.hasClass("pause"))return void h.pause();if(b.hasClass("play"))return 0===g?(clearTimeout(h.t),h.initPlay(),void g++):void h.play();if(b.hasClass("slist"))return void b.toggleClass("active");if(b.hasClass("lrc"))return b.toggleClass("active"),void(b.hasClass("active")?f.find(".lrc-area").fadeIn("slow"):f.find(".lrc-area").fadeOut("slow"));if(b.hasClass("fa-star")||b.hasClass("fa-heart"))return void b.toggleClass("active");if((b.hasClass("fa-random")||b.hasClass("fa-list-ul")||b.hasClass("fa-refresh"))&&!b.parent().hasClass("select"))return void b.parent().addClass("select").end().siblings().removeClass("hide");if(b.parent().hasClass("select"))return void a(this).parent().removeClass("select").end().siblings().addClass("hide");if((b.hasClass("fa-volume-off")||b.hasClass("fa-volume-up"))&&!b.parent().hasClass("v-select"))return void b.addClass("hide").parent().addClass("v-select").end().siblings().removeClass("hide");if(b.parent().hasClass("v-select")&&!b.hasClass("prog"))return a(this).parent().removeClass("v-select").end().siblings().addClass("hide"),b.hasClass("fa-volume-off")&&h.onMute(),void(b.hasClass("fa-volume-up")&&h.offMute());if(b.hasClass("prog")&&b.parent().hasClass("v-select")){var c=b.find(".prog-bar"),d=e(event,c,"verticle");return void h.setVolume(d)}}function e(a,b,c){var d,e,f;return"verticle"===c?(d=b.height(),e=b.offset().top,f=a.pageY,needVal=d+e-f):"align"===c&&(d=b.width(),e=b.offset().left,f=a.pageX,needVal=f-e),needVal=needVal>d?d:needVal,needVal=0>needVal?0:needVal,needVal/d}var f=this.player,g=0,h=this,i=this.mediaCenter(),j=f.find(".btn-area"),k=f.find(".progress");h.setVolume(i.volume),j.on("click",".btn",d),f.find(".prog-wrap").on("click",c),f.find('i[circletype="'+b.initCircle+'"]').removeClass("hide").siblings().addClass("hide"),b.autoHide&&setTimeout(function(){h.togglePlayer(f)},b.initTimeHide)}b.prototype={mediaCenter:function(){return a("#Media")[0]},getSongData:function(){return this.song.songData},initPlay:function(){switch(this.opts.initCircle){case"list":this.playIndex(0,0);break;case"random":this.random();break;case"single":this.playIndex(0,0)}},play:function(){this.mediaCenter().play(),this.toggleTimeShow(!0),this.rpClass("play","pause"),this.rpClass("fa-play","fa-pause"),this.lrcRealTimeMove()},pause:function(){this.mediaCenter().pause(),this.toggleTimeShow(!1),this.rpClass("pause","play"),this.rpClass("fa-pause","fa-play")},next:function(){var a=this.getLabel(),b=this.getCirType();"list"===b&&this.playIndex(a.ai,a.si+1),"random"===b&&this.random(),"single"===b&&this.single()},prev:function(){var a=this.getLabel(),b=this.getCirType();"list"===b&&this.playIndex(a.ai,a.si-1),"random"===b&&this.random(),"single"===b&&this.single()},random:function(){var a=this.getSongData(),b=a.length,c=Math.floor(Math.random()*b),d=a[c].abSong.length,e=Math.floor(Math.random()*d),f=this.getLabel();c===f.ai&&e===f.si?this.playIndex(f.ai,f.si+1):this.playIndex(c,e)},single:function(){var a=this.getLabel();this.playIndex(a.ai,a.si)},onMute:function(){this.mediaCenter().muted=!0},offMute:function(){this.mediaCenter().muted=!1},playIndex:function(a,b){var c=this.mediaCenter(),d=this.getSongData();b>d[a].abSong.length-1?(a++,b=0):0>b&&(a--,b=a>=0?d[a].abSong.length-1:0),(a>d.length-1||0>a)&&(a=0,b=0);var e=d[a],f=d[a].abSong[b];c.src=f.src,this.toggleTimeShow(!1),this.play(),this.showIndexInfo(e,f),this.setLabel(c,a,b)},showIndexInfo:function(a,b){var c=this.player,d=c.find(".btn-title"),e=c.find(".img-area img")[0];d.find(".song-title").text(b.title).end().find(".song-author").text(b.artist).end().find(".song-desc").text(a.abName),e.src=b.cover,this.loadLrc(b)},setLabel:function(b,c,d){a(b).attr({ai:c,si:d})},getLabel:function(){var b=a(this.mediaCenter());return{ai:parseInt(b.attr("ai"),10),si:parseInt(b.attr("si"),10)}},getCirType:function(){return this.player.find(".circle i").not(".hide").attr("circletype")},rpClass:function(a,b){this.player.find("."+a).removeClass(a).addClass(b)},setVolume:function(a){var b=this.mediaCenter(),c=Math.ceil(100*a);b.volume=a,this.player.find(".prog-val").text(c).siblings().find(".prog-in").height(c)},mediaTime:function(a){function b(){return d.currentTime/d.duration*100+"%"}function c(){d.currentTime=a*d.duration}var d=this.mediaCenter();return void 0===a?b():c()},toggleTimeShow:function(a){var b=this;a?b.timerObj=setInterval(function(){var a=b.mediaTime();b.player.find(".progress").width(a),"100%"===a&&b.next()},1e3):(clearInterval(b.timerObj),clearInterval(b.lrcTimer))},loadLrc:function(b){var c=this;a.ajax({url:b.lrc}).done(function(a){var b=c.parseLrcFile(a);c.player.find(".lrc-html-wrap").html(b)}).fail(function(){c.player.find(".lrc-html-wrap").html("没有找到歌词!").css({"margin-top":"0"}),clearInterval(c.lrcTimer)})},parseLrcFile:function(a){function b(a){var b=a.replace(/\[\w\w\:(.*?)\]/g,function(){return arguments[1]||"暂无"});return b}for(var c=[],d={},e="",f=a.split("\n"),g=f.splice(0,4),h=(b(g[0]),b(g[1]),b(g[2]),0);h<f.length;h++)f[h].replace(/\[(\d*):(\d*)([\.|\:]\d*)\]/g,function(){var a=0|arguments[1],b=0|arguments[2],e=60*a+b;c.push(e);var f=arguments[arguments.length-1].replace(/\[\d\d:\d\d.\d\d]/g,"");d["t"+e]=f});c.sort(function(a,b){return a-b});for(var i=0;i<c.length;i++){var j=c[i];e+='<p class="lrc-line" data-timeLine="'+j+'">'+d["t"+j]+"</p>"}return e},lrcRealTimeMove:function(){function a(){var a=(d.currentTime/d.duration,f.find('p[data-timeline="'+d.currentTime.toFixed()+'"]'));if(a.length){var b=a.position().top-20;a.css("color","green").prev().css("color","#aaa"),f.animate({"margin-top":"-"+b},200)}}var b=this,c=this.player,d=this.mediaCenter(),e=c.find(".lrc-area");e.show(),c.find(".lrc").addClass("active");{var f=e.find(".lrc-html-wrap");f.find("p.lrc-line")}curLrcHeight=f.height(),b.lrcTimer=setInterval(a,1e3)},togglePlayer:function(a){a.hasClass("show")?a.animate({right:"-372px"},500,function(){a.removeClass("show").addClass("hide")}):a.hasClass("hide")&&a.animate({right:"0"},500,function(){a.removeClass("hide").addClass("show")})}},a.fn.extend({media:function(c){var d=[].slice.call(arguments,1);return this.each(function(){var e=a._data(this,"Media");if(!e){var f=a.extend(!0,{},a.fn.media.defaults,"object"==typeof c?c:{});e=new b(f,this),a._data(this,"Media",e)}"string"==typeof c&&"function"==typeof e[c]&&e[c].apply(e,d)})}}),a.fn.media.defaults={url:"data/music.json",mediaID:"Media",initCircle:"list",autoPlay:!0,timeout:0,autoHide:!0,initTimeHide:5e3,volumeFade:!0}}(jQuery),$(function(){function a(a){k.x=a.pageX-$ply.position().left,k.y=a.pageY-$ply.position().top,i||(d=setInterval(c,33)),i++}function b(){this.speed={x:-2.5+5*Math.random(),y:-2.5+-12*Math.random()},this.location=k.x&&k.y?{x:k.x,y:k.y}:{x:g/2,y:h/2},this.radius=5+10*Math.random(),this.life=20+10*Math.random(),this.remaining_life=this.life,this.r=Math.round(255*Math.random()),this.g=Math.round(255*Math.random()),this.b=Math.round(255*Math.random())}function c(){f.globalCompositeOperation="source-over",f.fillStyle="black",f.fillRect(0,0,g,h),f.globalCompositeOperation="lighter";for(var a=0;a<j.length;a++){var c=j[a];c.opacity=Math.round(c.remaining_life/c.life*100)/100,f.beginPath(),f.fillStyle="rgba(255,255,255,"+c.opacity+")";var d=f.createRadialGradient(c.location.x,c.location.y,0,c.location.x,c.location.y,c.radius);d.addColorStop(0,"rgba("+c.r+","+c.g+","+c.b+","+c.opacity+")"),d.addColorStop(.5,"rgba("+c.r+","+c.g+","+c.b+","+c.opacity+")"),d.addColorStop(1,"rgba("+c.r+","+c.g+","+c.b+",0)"),f.fillStyle=d,f.arc(c.location.x,c.location.y,c.radius,2*Math.PI,!1),f.fill(),c.remaining_life--,c.radius--,c.location.x+=c.speed.x,c.location.y+=c.speed.y,(c.remaining_life<0||c.radius<0)&&(j[a]=new b)}}var d,e=document.getElementById("joecanvas"),f=e.getContext("2d"),g=372,h=152,i=1;e.width=g,e.height=h;for(var j=[],k={},l=100,m=0;l>m;m++)j.push(new b);$ply=$("#Player"),d=setInterval(c,33),$ply[0].addEventListener("mousemove",a,!1),$ply[0].addEventListener("mouseout",function(){clearInterval(d),i=0},!1)});