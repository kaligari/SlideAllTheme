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
     /*

  $('#scr1').data('x',0).data('y',0);
  $('#scr2').data('x',sWidth).data('y',0);
  $('#scr3').data('x',0).data('y',sHeight);
  $('#scr4').data('x',sWidth).data('y',sHeight);  
       */
  /*
  $('#scr2,#scr4').css({left:sWidth+'px'});
  $('#scr3,#scr4').css({top:sHeight+'px'});
    */
  $('#minimize').css({top:sWidth*0.02+'px',left:sWidth*0.93+'px'});
  $('#minimize img').width(sWidth*0.05+'px');
}
  $(window).resize(function() {
    initialize();
    $('#container').stop().animate({left: -$('.active').data('x')+'px',top: -$('.active').data('y')+'px'});
  });
  $(window).load(function() {
    initialize();
    /*
    setTimeout(function(){
      $('body').stop().transition({ scale: 1,duration: 2000, easing:'easeOutExpo' });
      $('#minimize').fadeIn();
    },1000);
    */    
    $('.screen').click(function(){            
      $('#container').stop().animate({left: -$(this).data('x')+'px',top: -$(this).data('y')+'px'});//,function(){
        $('#minimize').fadeIn();
        //$('body').stop().transition({ scale: 1 });
                
      //});
    });
    $('#minimize img').click(function(){
      //$('#container').stop().animate({left: '-512px',top: '-384px'},function(){
        $('#container').stop().animate({left: '0px',top: '0px'});
        $('#minimize').fadeOut();
        //$('body').stop().transition({ scale: 0.5 });              
      //});
    });
    function changeTo(target){
      $('#container').stop().animate({left: -target.data('x')+'px'},function(){
        $('#container').stop().animate({top: -target.data('y')+'px'});
      });
      $(this).removeClass('active');
      target.addClass('active');
    }
    
    $('.screen').swipe({
        swipe:function(event, direction, distance, duration, fingerCount) {
          switch(direction){
            case 'left':
              target = this.next();                              
              if(target.length != 0 )                 
                changeTo(target);  
              else {
                target = this.parent().next().children().first();
                if(target.length != 0 )                 
                  changeTo(target); 
                else {
                  changeTo($('#container .row').first().children().first());
                }
              }
            break;
            case 'right':
              target = this.prev();   
              if(target.length != 0 ){
                changeTo(target);  
              } else {
                target = this.parent().prev().children().last();
                if(target.length != 0 )                 
                  changeTo(target); 
                else {
                  changeTo($('#container .row').last().children().last());
                }
              }
            break;
            case 'up':              
              target = this.parent().next().children().first();             
              if(target.length != 0 ){                 
                changeTo(target);
              } else {                
                target = $('#container .row').first().children().first(); 
                changeTo(target);
              } 
            break;
            case 'down':
              target = this.parent().prev().children().first();                              
              if(target.length != 0 ){                 
                changeTo(target);
              } else {
                target = $('#container .row').last().children().first(); 
                changeTo(target);                                       
              }   
            break;            
          }
        }
      });       
  });
});