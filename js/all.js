//aos

AOS.init({
  offset: 200,
  duration: 1000,
  easing: 'ease-in-out-sine',
  delay: 0,
});


// 首頁文字特效
jQuery(document).ready(function($) {
  /* Act on the event */
  function textAnimate(){
    $('.aniTxt .letters').each(function(){
      $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });

    anime.timeline({loop: false})
      .add({
        targets: '.aniTxt .letter',
        scale: [0, 1],
        duration: 1500,
        elasticity: 600,
        delay: function(el, i) {
          return 45 * (i+1)
        }
      }).add({
        targets: '.aniTxt',
        opacity: 1,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
      });

    };

    textAnimate();
});

    //下滑離開header時，文字消失，回到區塊，文字出現
      function scrollTopTextAnimate(){
        $(window).scroll(function(event) {
          /* Act on the event */
          var nowScroll = $(window).scrollTop();
          var headerHeight = $('.slogan').offset().top+50;
          // console.log(nowScroll,headerHeight);
          if (nowScroll > headerHeight ) {
            $('.aniTxt').css({'opacity':'0','transform':'translateY(50px)'});
          }else{
            $('.aniTxt').css({'opacity':'1','transform':'translateY(0px)'});
          }
        });
      };

      scrollTopTextAnimate();

    // 首頁主圖隨背景移動
  jQuery(document).ready(function() {
      var bg = $('header');
      $(document).mousemove(function(event) {
        var event = event || window.event;
        var mouseX = event.screenX;
        var mouseY = event.screenY;
        var headerH = $('header').height()/2;
        var headerW = $('header').width()/20;
        var trasX = (mouseX-headerW)/20+5+'%';
        var trasY = (mouseY-headerH)/20+10+'%';
        // console.log(mouseX,headerH);
        $('header').css({'background-position-x':trasX,'background-position-y':trasY,'background-size':'cover'});
      }).mouseleave(function(event) {
    /* Act on the event */
        $('header').css({'background-position-x':'center','background-position-y':'center','background-size':'cover'});
      });
  });

  //nav下滑動畫
  jQuery(document).ready(function() {
    $(window).scroll(function(event) {
      /* Act on the event */
       var nowScroll = $(window).scrollTop();
       if (nowScroll > 100) {
        $('nav').addClass('active');
       }else{$('nav').removeClass('active');}
    });
  });

  //nav錨點設定
  jQuery(document).ready(function() {
    var anchor = $('nav').find('a');
    anchor.click(function(event) {
      event.preventDefault();
      var href = $(this).attr('href');
      var hrefPos = $(href).offset().top-87;
      //if是為了判斷現在是不是手機的nav，是的話再下滑後，還要移除'open'class
      if($('nav').hasClass('open') == false){$('html, body').animate({scrollTop:hrefPos},1000);}
      else{$('html, body').animate({scrollTop:hrefPos},1000);$('nav').removeClass('open');}
    });
    // $(window).scroll(function(event) {
    //   var nowScroll = $(window).scrollTop();
    //   anchor.each(function() {
    //     var href = $(this).attr('href')
    //     var hrefPos = $(href).offset().top-87;
    //     var hrefH = $(href).outerHeight();
    //     // console.log(href,hrefPos);
    //     // var H = $(document).height();
    //     // var scroll = $(window).scrollTop();
    //     // console.log(H,scroll);
    //     if (nowScroll >= hrefPos && (hrefPos + hrefH) > nowScroll) {$(this).addClass('active');}
    //     else{$(this).removeClass('active')}
    //       var contact = $('nav').find('li').eq(3).find('a');
    //       // console.log(contact);
    //     // if (nowScroll >= 2393) {anchor.removeClass('active');contact.addClass('active');}
    //   });
    // });
  });





  //作品區banner 互換設定
  jQuery(document).ready(function() {
    //電腦向右選
    function workNext(event) {
      var work_active = $('.gallery li.active');
      var work_first = $('.gallery li.first');
      var work_second = $('.gallery li.second');
      var work_des = $('.work .txtbox a').parent().siblings('ul').find('li');
      /* Act on the event */
      event.preventDefault();
      work_first.removeClass('first').addClass('active');
      work_active.removeClass('active').addClass('second');
      work_second.removeClass('second').addClass('first');

      work_des.each(function() {
          if ( $(this).hasClass('second') === true) {$(this).removeClass('second').addClass('first');}
          else if($(this).hasClass('first') === true){$(this).removeClass('first').addClass('active');}
          else if($(this).hasClass('active') === true){$(this).removeClass('active').addClass('second');}
      });
    }

    $('.work .txtbox a.next').on('click',workNext);
    //手機向右滑動
    $('.gallery li').on('swipe', function(e, Dx, Dy){
       // Dx == 1 means right
       // Dx == -1 means left
       // Dy == 1 means top
       // Dy == -1 means bottom
       if(Dx == 1){
          workNext(event);
       }
    });
    //電腦向左選
    function workPrev(event) {
      var work_active = $('.gallery li.active');
      var work_first = $('.gallery li.first');
      var work_second = $('.gallery li.second');
      var work_des = $('.work .txtbox a').parent().siblings('ul').find('li');
      /* Act on the event */
      event.preventDefault();
      work_second.removeClass('second').addClass('active');
      work_active.removeClass('active').addClass('first');
      work_first.removeClass('first').addClass('second');

      work_des.each(function() {
          if ( $(this).hasClass('second') === true) {$(this).removeClass('second').addClass('active');}
          else if($(this).hasClass('first') === true){$(this).removeClass('first').addClass('second');}
          else if($(this).hasClass('active') === true){$(this).removeClass('active').addClass('first');}
      });
    }
    $('.work .txtbox a.prev').on('click',workPrev);
    //手機向左滑動
    $('.gallery li').on('swipe', function(e, Dx, Dy){
       // Dx == 1 means right
       // Dx == -1 means left
       // Dy == 1 means top
       // Dy == -1 means bottom
       if(Dx == -1){
          workPrev(event);
       }
    });
  });

  //footer
  jQuery(document).ready(function() {
    $('footer .inbox a').hover(function() {
      $(this).toggleClass('up');
    });
    function phoneAnimate(){
      if($(window).width() < 800){
        $('footer .inbox a').addClass('up');
      }
    }
    phoneAnimate();
  });

  //parallax
  jQuery(document).ready(function() {
          var userAgent = navigator.userAgent;
          var isOpera = userAgent.indexOf("Opera") > -1;
          var isMaxthon = userAgent.indexOf("Maxthon") > -1 ;
          var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera ;
          var isFF = userAgent.indexOf("Firefox") > -1 ;
          var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") < 1 ;
          var isChrome = userAgent.indexOf("Chrome") > -1 ;
          var isIE5 = isIE55 = isIE6 = isIE7 = isIE8 = false;
        // function broserCheck(){
        //   // if(isFF){console.log('yy')}
        //   // if(isMaxthon){console.log('ss');}
        //   // if(isOpera){console.log('ss');}
        //   // if(isSafari){console.log('ss');}
        //   // if(isChrome){console.log('ss');}
        //   // if(isIE){console.log('ss');}
        // }
        // broserCheck();

     $(window).scroll(function parallax(event) {
      var nowScroll = $(window).scrollTop();
      $('.about figure').css('transform','translateY('+(-nowScroll/20)+'px)');
      $('.box01.about .title').css('transform','translateY('+(-nowScroll/40)+'px)');
      $('.box01.work .title').css('transform','translateY('+(nowScroll/40)+'px)');
      $('.skill').css('background-position-y', nowScroll/20);
      $('header').css('background-position-y', -nowScroll/10);
    });
  });

  //mobile btn
  jQuery(document).ready(function($) {
    $('.phoneBtn').click(function(event) {
      $('nav').toggleClass('open');
    });
  });

  // function broserCheck(){
  //   var userAgent = navigator.userAgent;
  //   var isOpera = userAgent.indexOf("Opera") > -1;
  //   var isMaxthon = userAgent.indexOf("Maxthon") > -1 ;
  //   var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera ;
  //   var isFF = userAgent.indexOf("Firefox") > -1 ;
  //   var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") < 1 ;
  //   var isChrome = userAgent.indexOf("Chrome") > -1 ;
  //   var isIE5 = isIE55 = isIE6 = isIE7 = isIE8 = false;

  //   if(isFF){console.log('yy')}
  //   if(isMaxthon){console.log('ss');}
  //   if(isOpera){console.log('ss');}
  //   if(isSafari){console.log('ss');}
  //   if(isChrome){console.log('ss');}
  //   if(isIE){console.log('ss');}
  // }
  // firefox();




