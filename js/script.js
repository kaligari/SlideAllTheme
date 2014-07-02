jQuery(function(){

var horizontalAtEnd     = 'review';//'wrap','review','stop';
var horizontalEasing    = 'easeOutCubic'; 
var horizontalDuration  = 500;
var verticalAtEnd       = 'stop';//'wrap','stop' 
var verticalEasing      = 'easeOutQuint';
var verticalDuration    = 1000;

var fadeInDuration      = 350;
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
    showImages();

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
    }
    
    function hideImages(){
      $('.anim_left img,.anim_right img,.fadeIn').stop().fadeOut();
    }
        
    function showImages(){
      var numEl = $('.active .fadeIn').length;
      $('.active .fadeIn').each(function(index){
        $(this).delay(fadeInDuration*index).fadeIn(fadeInSpeed); 
        $('.active .anim_left').delay(fadeInDuration*numEl).show('slide',{direction:'left',mode:'show',easing:slideInEase},fadeInSpeed);
        $('.active .anim_right').delay(fadeInDuration*numEl).show('slide',{direction:'right',mode:'show',easing:slideInEase},fadeInSpeed);                      
      });      
    }
    
    function scrollUp(e){
      target = e.parent().next().children().first();             
      if(target.length != 0 ){                 
        changeTo(target,$(e));
      } else {
        if(verticalAtEnd=='wrap'){                
          target = $('#container .row').first().children().first(); 
          changeTo(target,$(e));
        }
      } 
    }
    
    function scrollDown(e){
      target = e.parent().prev().children().first();                              
      if(target.length != 0 ){                 
        changeTo(target,$(e));
      } else {
        if(verticalAtEnd=='wrap'){
          target = $('#container .row').last().children().first(); 
          changeTo(target,$(e));
        }                                       
      }  
    }
    
    function scrollLeft(e){
      target = e.next();                              
      if(target.length != 0 )                 
        changeTo(target,$(e));  
      else {
        switch(horizontalAtEnd){
          case 'stop':
          break;
          case 'review':                  
            target = e.parent().next().children().first();
            if(target.length != 0 )                 
              changeTo(target,$(e)); 
            else {
              changeTo($('#container .row').first().children().first(),$(e));
            }
          break;
          case 'wrap':
            target = e.parent().first().children().first();             
            changeTo(target,$(e));
          break;
        }
      }
    }
    
    function scrollRight(e){
      target = e.prev();   
      if(target.length != 0 ){
        changeTo(target,$(e));  
      } else {
        switch(horizontalAtEnd){
          case 'stop':
          break;
          case 'review':
            target = e.parent().prev().children().last();
            if(target.length != 0 )                 
              changeToDesc(target,$(e)); 
            else {
              changeToDesc($('#container .row').last().children().last(),$(e));
            }
          break;
          case 'wrap':
            target = e.parent().first().children().last();             
            changeTo(target,$(e));
          break;
        }          
      }
    }
    /* EVENTS */
    $('.screen').on('DOMMouseScroll mousewheel', function (e) {
      if(e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) { //alternative options for wheelData: wheelDeltaX & wheelDeltaY
        scrollUp(($(e.target)));      
      } else {        
        scrollDown($(e.target));
      }
      return false;
    });
    
    $('.screen').swipe({
        swipe:function(event, direction, distance, duration, fingerCount) {
          switch(direction){
            case 'left':
              scrollLeft(this);
            break;
            case 'right':
              scrollRight(this);
            break;
            case 'up':              
              scrollUp(this);
            break;
            case 'down':
              scrollDown(this); 
            break;            
          }
        }
      });       
  });
});