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

  $('#scr1').data('x',0).data('y',0);
  $('#scr2').data('x',sWidth).data('y',0);
  $('#scr3').data('x',0).data('y',sHeight);
  $('#scr4').data('x',sWidth).data('y',sHeight);  
  
  $('#scr2,#scr4').css({left:sWidth+'px'});
  $('#scr3,#scr4').css({top:sHeight+'px'});
  
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
    $('.screen').swipe({
        swipe:function(event, direction, distance, duration, fingerCount) {
          switch(direction){
            case 'left':
              var next = $(this).data('right');
              if(next){
                $('#container').stop().animate({left: -$('#'+next).data('x')+'px',top: -$('#'+next).data('y')+'px'});
                $(this).removeClass('active');
                $('#'+next).addClass('active');
              }  
            break;
            case 'right':
              var next = $(this).data('left');
              if(next){
                $('#container').stop().animate({left: -$('#'+next).data('x')+'px',top: -$('#'+next).data('y')+'px'});
                $(this).removeClass('active');
                $('#'+next).addClass('active');
              }  
            break;
            case 'down':
              var next = $(this).data('up');
              if(next){
                $('#container').stop().animate({left: -$('#'+next).data('x')+'px',top: -$('#'+next).data('y')+'px'});
                $(this).removeClass('active');
                $('#'+next).addClass('active');
              }  
            break;
            case 'up':
              var next = $(this).data('down');
              if(next){
                $('#container').stop().animate({left: -$('#'+next).data('x')+'px',top: -$('#'+next).data('y')+'px'});
                $(this).removeClass('active');
                $('#'+next).addClass('active');
              }  
            break;
          }
        }
      });       
  });
});