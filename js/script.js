jQuery(function(){
   
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
      console.log( j + ": " + $(this).attr('class') + " X: " + sWidth*j + " Y: " + sHeight*i);  
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
      $('#container').stop().animate({left: -target.data('x')+'px'},function(){
        $('#container').stop().animate({top: -target.data('y')+'px'});
      });
      current.removeClass('active');
      target.addClass('active');
    }
    
    $('.screen').swipe({
        swipe:function(event, direction, distance, duration, fingerCount) {
          switch(direction){
            case 'left':
              target = this.next();                              
              if(target.length != 0 )                 
                changeTo(target,$(this));  
              else {
                target = this.parent().next().children().first();
                if(target.length != 0 )                 
                  changeTo(target,$(this)); 
                else {
                  changeTo($('#container .row').first().children().first(),$(this));
                }
              }
            break;
            case 'right':
              target = this.prev();   
              if(target.length != 0 ){
                changeTo(target,$(this));  
              } else {
                target = this.parent().prev().children().last();
                if(target.length != 0 )                 
                  changeTo(target,$(this)); 
                else {
                  changeTo($('#container .row').last().children().last(),$(this));
                }
              }
            break;
            case 'up':              
              target = this.parent().next().children().first();             
              if(target.length != 0 ){                 
                changeTo(target,$(this));
              } else {                
                target = $('#container .row').first().children().first(); 
                changeTo(target,$(this));
              } 
            break;
            case 'down':
              target = this.parent().prev().children().first();                              
              if(target.length != 0 ){                 
                changeTo(target,$(this));
              } else {
                target = $('#container .row').last().children().first(); 
                changeTo(target,$(this));                                       
              }   
            break;            
          }
        }
      });       
  });
});