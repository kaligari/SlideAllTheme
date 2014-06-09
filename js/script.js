jQuery(function(){

var horizontalAtEnd     = 'review';//'wrap','review','stop';
var horizontalEasing    = 'easeOutCubic'; 
var horizontalDuration  = 500;
var verticalAtEnd       = 'stop';//'wrap','stop' 
var verticalEasing      = 'easeOutQuint';
var verticalDuration    = 1000;

var fadeInDuration      = 450;
var fadeInSpeed         = 1000;
var slideInEase         = 'easeInOutQuint';
   
$.fn.click = function(listener) {
    return this.each(function() {
       var $this = $( this );
       $this.on('vclick', listener);
    });
};

function initialize(){
  var sWidth = $(window).width();
  var sHeight = $(window).height();

  $('.screen').width(sWidth)
  $('.screen').height(sHeight);

  $('#container .row').each(function(i){
    $(this).children('.screen').each(function(j){
      $(this).data('x',sWidth*j).data('y',sHeight*i).css({left:sWidth*j+'px',top:sHeight*i+'px'});      
      //console.log( j + ": " + $(this).attr('class') + " X: " + sWidth*j + " Y: " + sHeight*i);  
    });
  });
  if(sWidth>=sHeight)
    $('.screen').css({'background-size':'100% auto'});
  else  
    $('.screen').css({'background-size':'auto 100%'});
}

  $(window).resize(function() {
    initialize();
    $('#container').stop().animate({left: -$('.active').data('x')+'px',top: -$('.active').data('y')+'px'});
  });
  $(window).load(function() {
    initialize();
    $('#minimize img').click(function(){
        $('#container').stop().animate({left: '0px',top: '0px'});        
    });
    function changeTo(target,current){
      hideImages();
      current.removeClass('active');
      target.addClass('active');
                  
      $('#container').stop().animate({left: -target.data('x')+'px'},horizontalDuration,horizontalEasing,function(){
        $('#container').stop().animate({top: -target.data('y')+'px'},verticalDuration,verticalEasing,function(){
          showImages();
        });
      });             
    }
    
    function changeToDesc(target,current){
      hideImages();
      current.removeClass('active');
      target.addClass('active');
                  
      $('#container').stop().animate({top: -target.data('y')+'px'},verticalDuration,verticalEasing,function(){
        $('#container').stop().animate({left: -target.data('x')+'px'},horizontalDuration,horizontalEasing,function(){
          showImages();
        });
      });
      
      //current.find('.grid_6').fadeOut();    
      //target.find('.grid_6').fadeIn();
      
      //current.removeClass('active');
      //target.addClass('active');            
    }
    
    function hideImages(){
      $('.active img, .fadeIn').fadeOut();
    }
        
    function showImages(){
      var numEl = $('.active .fadeIn').length;
      console.log(numEl);
      $('.active .fadeIn').each(function(index){
        $(this).delay(fadeInDuration*index).fadeIn(fadeInSpeed);
        console.log(index); 
        $('.active .anim_left').delay(fadeInDuration*numEl).show('slide',{direction:'left',mode:'show',easing:slideInEase},fadeInSpeed);
        $('.active .anim_right').delay(fadeInDuration*numEl).show('slide',{direction:'right',mode:'show',easing:slideInEase},fadeInSpeed);                      
      });      
    }
    
    $('.screen').swipe({
        swipe:function(event, direction, distance, duration, fingerCount) {
          switch(direction){
            case 'left':
              target = this.next();                              
              if(target.length != 0 )                 
                changeTo(target,$(this));  
              else {
                switch(horizontalAtEnd){
                  case 'stop':
                  break;
                  case 'review':                  
                    target = this.parent().next().children().first();
                    if(target.length != 0 )                 
                      changeTo(target,$(this)); 
                    else {
                      changeTo($('#container .row').first().children().first(),$(this));
                    }
                  break;
                  case 'wrap':
                    target = this.parent().first().children().first();
                    console.log(target);             
                    changeTo(target,$(this));
                  break;
                }
              }
            break;
            case 'right':
              target = this.prev();   
              if(target.length != 0 ){
                changeTo(target,$(this));  
              } else {
                switch(horizontalAtEnd){
                  case 'stop':
                  break;
                  case 'review':
                    target = this.parent().prev().children().last();
                    if(target.length != 0 )                 
                      changeToDesc(target,$(this)); 
                    else {
                      changeToDesc($('#container .row').last().children().last(),$(this));
                    }
                  break;
                  case 'wrap':
                    target = this.parent().first().children().last();
                    console.log(target);             
                    changeTo(target,$(this));
                  break;
                }          
              }
            break;
            case 'up':              
              target = this.parent().next().children().first();             
              if(target.length != 0 ){                 
                changeTo(target,$(this));
              } else {
                if(verticalAtEnd=='wrap'){                
                  target = $('#container .row').first().children().first(); 
                  changeTo(target,$(this));
                }
              } 
            break;
            case 'down':
              target = this.parent().prev().children().first();                              
              if(target.length != 0 ){                 
                changeTo(target,$(this));
              } else {
                if(verticalAtEnd=='wrap'){
                  target = $('#container .row').last().children().first(); 
                  changeTo(target,$(this));
                }                                       
              }   
            break;            
          }
        }
      });       
  });
});