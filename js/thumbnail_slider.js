//<![CDATA[
$(function(){
    var setId = '#slideshow';
    var fadeTime = 1000;//フェードが切り替わるのに1秒//
    var delayTime = 8000;//フェードスピードは8秒間隔//


    $(setId + ' div div').each(function(i){
        $(this).attr('id','view' + (i + 1).toString());
        $(setId + ' div div').css({zIndex:'98',opacity:'0'});
        $(setId + ' div div:first').css({zIndex:'99'}).stop().animate({opacity:'1'},fadeTime);
    });

    $(setId + ' ul li').mouseover(function(){
        clearInterval(setTimer);

        var connectCont = $(setId + ' ul li').index(this);
        var showCont = connectCont+1;

        $(setId + ' div div#view' + (showCont)).siblings().stop().animate({opacity:'0'},fadeTime,function(){$(this).css({zIndex:'98'})});
        $(setId + ' div div#view' + (showCont)).stop().animate({opacity:'1'},fadeTime,function(){$(this).css({zIndex:'99'})});

        $(this).addClass('active');
        $(this).siblings().removeClass('active');

        timer();

    });

    $(setId + ' ul li:not(.active)').hover(function(){
        $(this).stop().animate({opacity:'1'},200);
    },function(){
        //$(this).stop().animate({opacity:'0.5'},200);
    });

    //$(setId + ' ul li').css({opacity:'0.5'});
    $(setId + ' ul li:first').addClass('active');
	


    timer();

    function timer() {
        setTimer = setInterval(function(){
            $('li.active').each(function(){
                var listLengh = $(setId + ' ul li').length;
                var listIndex = $(setId + ' ul li').index(this);
                var listCount = listIndex+1;

                if(listLengh == listCount){
                    $(setId + ' ul li:first').mouseover()
                } else {
                    $(this).next('li').mouseover();
                };
            });
        },delayTime);
    };
});
//]]>