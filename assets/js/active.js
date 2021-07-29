(function () {
	"use strict";
	
    jQuery(document).ready(function($){
		
		/*Popover*/
		$('[data-toggle="popover"]').popover(
    		{
			html : true,
			trigger: 'focus',
			//trigger :'manual',
			content: function() {
				var content = $(this).attr("data-popover-content");
				return $(content).children(".popover-body").html();
			}
	    });
		
		$('[data-toggle="tooltip"]').tooltip();

       //For mobile menu
		$( "#navigation" ).clone().prependTo( $( ".nav-mobile" ) ); 
        $( ".signup-btn" ).clone().prependTo( $( ".nav-mobile" ) ); 
        $( ".need-help" ).clone().appendTo( $( ".nav-mobile" ) );
        
        //Review
        $(".v4-testimoinal-details").slick({
            slidesToShow: 1,
            arrows: true,
            dots: false,
            autoplay: false,
            infinite: true,
		    prevArrow: "<button type='button' class='slick-prev'><i class='fas fa-chevron-left'></i></button>",
            nextArrow: "<button type='button' class='slick-next'><i class='fas fa-chevron-right'></i></button>",		
            mouseDrag: false,
            //touchMove: false,
			animateOut: 'slide',
            
        });//Review
        $(".v4-real-result-slider").slick({
            slidesToShow: 1,
            arrows: true,
            dots: false,
            autoplay: true,
            infinite: true,
		    prevArrow: "<button type='button' class='slick-prev'><i class='fas fa-chevron-left'></i></button>",
            nextArrow: "<button type='button' class='slick-next'><i class='fas fa-chevron-right'></i></button>",
            mouseDrag: false,
            //touchMove: false,
			//animateOut: 'slide',
			fade: true,
            
        });
        
        
       $('.v4-doctor-details-btn').click(function() {
            $('.doctor-single-item-txt').removeClass("active");
            $(this).parent().addClass("active"); 
       }); 
       $('.v4-doctor-close').click(function() {
            $('.doctor-single-item-txt').removeClass("active"); 
       }); 
        
		//AOS animation
		AOS.init({
          offset: 200,
          duration: 600,
          easing: 'ease-in-sine',
          delay: 100,
          once: true    
        });
        
        $(window).on('scroll',function() {
          parallax();
        });

        function parallax() {
          var wScroll = $(window).scrollTop();
          $('.hexa-bg1').css('top', 85 - (wScroll*0.02)+'em');
          $('.hexa-bg2').css('top', 120 - (wScroll*0.02)+'em');
          $('.ns-doctor-img .doctor-hexa-bg').css('top', 102 - (wScroll*0.02)+'em');
          $('.ns-doctor-img.bottom-doctor .doctor-hexa-bg').css('top', 108 - (wScroll*0.02)+'em');
        }
		
		$(".scrollup").on("click", function() {
			$("body,html").stop(false, false).animate({
				scrollTop: 0
			}, 800);
			return false;
		});
		
		$(window).on('scroll',function() {
		  if ($(this).scrollTop() > 0){  
			  $('header.for-sticky').addClass("sticky");
		     } else {
			  $('header.for-sticky').removeClass("sticky");
		   }
		   
		   if ($(this).scrollTop() > 200) {
				$('.scrollup').fadeIn();
			} else {
				$('.scrollup').fadeOut();
			}
           
		});
        
       $('.v4-doctor-details-btn').click(function() {
            $('.v4-doctor-single-item-txt').removeClass("active");
            $(this).parent().addClass("active"); 
       }); 
       $('.v4-doctor-close').click(function() {
            $('.v4-doctor-single-item-txt').removeClass("active"); 
       }); 
        
       
        (function() {
          var elements;
          var windowHeight;

          function init() {
            elements = document.querySelectorAll('.hidden');
            windowHeight = window.innerHeight;
          }

          function checkPosition() {
            for (var i = 0; i < elements.length; i++) {
              var element = elements[i];
              var positionFromTop = elements[i].getBoundingClientRect().top;

              if (positionFromTop - windowHeight <= 0) {
                element.classList.add('highlight-element');
                element.classList.remove('hidden');
              }
            }
          }

          window.addEventListener('scroll', checkPosition);
          window.addEventListener('resize', init);

          init();
          checkPosition();
        })();
    

    });

}(jQuery));	
let canvas, 
    ctx, 
	system,
	gridSize = 40,
	spacing = 10,
    width = height = (gridSize - 1) * spacing,
	mouseX = 262, 
	mouseY = 182,
	imgSrc = new Image(),
	imgURL,
	drawVertices = false,
	first = true;
const msqrt = Math.sqrt;

let water = './assets/images/extraordinary-bg-1.png';

imgURL = water;

const molecules = function(){
    this.friction = .98; 
    this.mouseRepelDist = 50;
    this.mouseForce = .02;
    this.springForce = .2;
    this.numParticles = gridSize * gridSize; 
    this.particles = [];
    this.faces = [];
}
molecules.prototype.generate = function(){
    for(let i=0; i<this.numParticles; i++){
        this.particles.push(new Vertices(((i % gridSize) * spacing), (Math.floor(i / gridSize) * spacing), this));
    }
}
molecules.prototype.update = function(){
    for(let i=0; i<this.numParticles; i++){
        this.particles[i].update();
    }
}
const Vertices = function(x, y, parentSystem){
    this.x = x;
    this.y = y;
    this.sx = this.x;
    this.sy = this.y;
    this.vx = 0;
    this.vy = 0;
    this.parentSystem = parentSystem;
    return this;
}
Vertices.prototype.update = function(){
    this.vx *= this.parentSystem.friction;
    this.vy *= this.parentSystem.friction;

	this.vx += (this.sx - this.x) * this.parentSystem.springForce;
	this.vy += (this.sy - this.y) * this.parentSystem.springForce;

	let dx = mouseX - this.x;
	let dy = mouseY - this.y;
	let dist = msqrt(dx*dx + dy*dy);
	if (dist < this.parentSystem.mouseRepelDist) {
		let tx = mouseX - this.parentSystem.mouseRepelDist * dx / dist;
		let ty = mouseY - this.parentSystem.mouseRepelDist * dy / dist;
		this.vx += (tx - this.x) * this.parentSystem.mouseForce;
		this.vy += (ty - this.y) * this.parentSystem.mouseForce;
	}

    this.x += this.vx;
    this.y += this.vy;
}

const Face = function(vertices, sData){
	this.vertices = vertices;
	this.sData = sData;
}
Face.prototype.draw = function(){
	ctx.drawImage(imgSrc, 
				  this.sData.x, this.sData.y, this.sData.w, this.sData.h, 
				  this.vertices[0].x, this.vertices[0].y,
				  this.vertices[1].x - this.vertices[0].x, this.vertices[2].y - this.vertices[0].y);
}

function createCanvas(w, h){
    let tCanvas = document.createElement('canvas');
    tCanvas.width = w;
    tCanvas.height = h;
    return tCanvas;
}
function handleImageLoad(){
	let imgw = (imgSrc.naturalWidth / (gridSize-1));
	let imgh = (imgSrc.naturalHeight / (gridSize-1));
	for(let i=0; i<system.numParticles - gridSize; i++){
		if((gridSize-1) !== i % gridSize){
			let verts = [
							system.particles[i],
							system.particles[i + 1],
							system.particles[i + gridSize]
						];
			let imgData = {
							x: (i % gridSize) * imgw,
							y: (Math.floor(i / gridSize)) * imgh,
							w: imgw,
							h: imgh
						};
			system.faces.push(new Face(verts, imgData));
		}
	}
	if(first){
		setUpEvents();
		animate();
		first = false;
	}
}
function setUpEvents(){
    function getMousePos(canvas, evt) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    document.addEventListener('mousemove', function(evt) {
        let mousePos = getMousePos(canvas, evt);
        mouseX = mousePos.x;
        mouseY = mousePos.y;
    }, false);
	
	document.addEventListener('touchstart', function(e){
		let touchobj = e.changedTouches[0];
		mouseX = touchobj.pageX;
		mouseY = touchobj.pageY;
		e.preventDefault();
	}, false);
	document.addEventListener('touchmove', function(e){
		let touchobj = e.changedTouches[0];
		mouseX = touchobj.pageX;
		mouseY = touchobj.pageY;
		e.preventDefault();
	}, false);
}


function newImage(newImg){
    system.faces = [];
	imgSrc.src = newImg;
}


function getShareable(){
	let hash = window.location.hash;
	if(hash !== ''){
		if(hash.indexOf('=') === -1){
			return;
		}
		let name = hash.split('=')[0];
		if(name === '#imgURL'){
			imgURL = hash.split('=')[1];
		}
	}
}

function init(){	
    canvas =  createCanvas(width, height);
    document.querySelector('.wrapper').appendChild(canvas);
    ctx = canvas.getContext('2d');
	ctx.fillStyle = '#fa4';
    system = new molecules();
    system.generate();	
	imgSrc.onload = handleImageLoad;
	imgSrc.src = imgURL;
}

function draw(){
	ctx.fillStyle = 'rgb(237 212 117 / 0%)';
    ctx.fillRect(0, 0, width, height);
	for(let loop = system.faces.length, i=0; i<loop; i++) {
		system.faces[i].draw();
	}
	if(drawVertices){
		ctx.fillStyle = '#fa4';
		for(let i=0; i<system.numParticles; i++) {
			ctx.beginPath();
			ctx.fillRect(system.particles[i].x, system.particles[i].y, 1, 1);
		}
	}
}
function animate(){
    system.update();
    draw();
    requestAnimationFrame(animate);
}

init();