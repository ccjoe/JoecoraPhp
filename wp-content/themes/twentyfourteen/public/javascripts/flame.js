  $(function(){
    var canvas = document.getElementById("joecanvas");
    var ctx = canvas.getContext("2d");
    var W = 372, H= 152, flameTimer, index = 1;
    canvas.width = W;
    canvas.height= H;

    var particles = [];
    var mouse ={};

    var particle_count = 100;
    for(var i = 0; i<particle_count; i++){
        particles.push(new particle());  //push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
    }
      
    $ply = $("#Player");
    
    flameTimer = setInterval(draw,33);

    $ply[0].addEventListener('mousemove',track_mouse,false);
    $ply[0].addEventListener('mouseout',function(){ clearInterval(flameTimer); index = 0 },false);
    function track_mouse(e){
        mouse.x = e.pageX - $ply.position().left;
        mouse.y = e.pageY - $ply.position().top;
        if(!index)
          flameTimer = setInterval(draw,33);
        index++;
        ////console.log(mouse.x,mouse.y);
    }
     
     
   function particle(){
    this.speed= {x:-2.5 + Math.random()*5,y:-2.5+Math.random()*-12};
    
    if(mouse.x && mouse.y){  this.location={x:mouse.x,y:mouse.y};  }
    else{this.location = {x:W/2,y:H/2};}
    
    this.radius = 5 + Math.random()*10;
    
    //life在20-30间
    this.life = 20 + Math.random()*10;
    this.remaining_life = this.life;
    
    //colors
    this.r = Math.round( Math.random()*255 );
    this.g = Math.round( Math.random()*255 );
    this.b = Math.round( Math.random()*255 );
   }
    
    function draw(){
      //console.log("draw");
      ctx.globalCompositeOperation="source-over";
      ctx.fillStyle = "black";
      ctx.fillRect(0,0,W,H);
      ctx.globalCompositeOperation="lighter"; 
    
     for(var i=0;i<particles.length;i++){
       var p = particles[i];
       p.opacity = Math.round(p.remaining_life/p.life*100)/100;
       ctx.beginPath();
       ctx.fillStyle="rgba(255,255,255,"+p.opacity+")";
       
       var gradient = ctx.createRadialGradient(p.location.x,p.location.y,0,p.location.x, p.location.y, p.radius)
       gradient.addColorStop(0,"rgba("+p.r+","+p.g+","+p.b+","+p.opacity+")");
       gradient.addColorStop(0.5,"rgba("+p.r+","+p.g+","+p.b+","+p.opacity+")");
       gradient.addColorStop(1,"rgba("+p.r+","+p.g+","+p.b+","+"0)");
       
       ctx.fillStyle=gradient;
       ctx.arc(p.location.x,p.location.y,p.radius,Math.PI*2,false);
       ctx.fill(); 
       
       //lets move the particles
       p.remaining_life--;
       p.radius--;
       p.location.x += p.speed.x;
       p.location.y += p.speed.y;
       
       if(p.remaining_life<0 || p.radius<0)
       {particles[i] = new particle();
         }
        }
    }
    //setInterval(draw,33);  
   
})