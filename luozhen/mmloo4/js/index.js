$(function(){
	/*$('#wrap-header').load('header.html');
	$('#search').load("search.html");
	$("#nav").load("nav.html")
	$('#wrap_service').load("service.html");
	$('#foot-link').load("foot-link.html");
	$('#footer').load('footer.html')*/
	
	//console.log(document.cookie);
	//判断是否保存了账号和密码
    var oldUsername = getCookie("username");
    var oldPassword = getCookie("userpass");
	//console.log(oldUsername);
    if (oldUsername.length) {
    	//console.log(oldUsername.length)
    	//console.log($('#header .head-l').find('a1'))
    	$("#wrap_banner").find('.entry').hide()
    	$("#wrap_banner").find('.wel-1').css('padding',47)
    	$('#header .head-l').find('.a1').html('您好，'+oldUsername+'欢迎来到米米乐商城')
      	$('#header .head-l').find('.a2').html('[退出]')
      	$('#header .head-l').find('.a2').prop('href','login.html').click(function(){
      		removeCookie("username");
      		removeCookie("userpass");
      		//$(this).
      		//window.location.href='index.html'
      	})
       
    } 
	
	
	
	//head
	$('.head-r').find('li').mouseover(function(evt){
		$(this).css("background-color","white").find(".head-box").css({display:'block'})
	}).mouseout(function(){
		$(this).css("background-color","#fafafa").find(".head-box").css({display:'none'})
	})
	
	$('.head-box').find('a').mouseover(function(){
			$(this).css("background-color","#fafafa")
		}).mouseout(function(){
			$(this).css("background-color","#fff")
		})
		
		
		
	
	//nav
	$('.menu').find('li:eq(4)').mouseover(function(){
		$('.menu-box').css('top','-200px')
	})
	$('.menu').find('li:eq(3)').mouseover(function(){
		$('.menu-box').css('top','0')
	})
	
	$('.menu').find('li').mouseover(function(){
		$(this).css('background-color',"#777").find('.menu-box').css("display",'block')
	}).mouseout(function(){
		$(this).css('background-color',"#000").find('.menu-box').css("display",'none')
	})
	
	
	
	//显示图片的函数
	function show(){
        // 处理index值，使其实现循环轮播
        if(index<0){
            index = len - 1;
        }else if(index > len - 1){
            index = 0;
        }
        // 大图
        $('.big-bg').find('li').eq(index).animate({opacity:1}).siblings().animate({opacity:0});
        // 小图
        $('.small-bg').find('a').eq(index).css({'background':"rgba(0,0,0,0.6)"}).siblings().css({'background':"rgba(0,0,0,0.2)"})
    }
	
	 // 轮播函数
    function carousel(){
        index++;
        show();
    }
            
            
	//banner 轮播
	var index=0;
	var timer;
	var len = $('.big-bg').find('li').length;//图片数量
	// 初始化
    show();
    
    // 设置定时器，3秒切换一张图片
    var timer=setInterval(function(){
    	carousel();
    },2000);
    
    // 鼠标移入清除定时器，鼠标移出重启定时器
    $('.big-bg li').mouseenter(function(){
        clearInterval(timer);
        $('.ban-m').find("span").css("display","block");
    }).mouseleave(function(){
        timer = setInterval(carousel,3000);
         $('.ban-m').find("span").css("display","none");
    })
    
    
    $(document).click(function(evt){
    	console.log(evt.target)
    })
    
    // 点击前后按钮实现切换
    $('.s1').click(function(){
        index--;
        console.log(index);
        show();
    })
    
    $('.s2').click(function(){
        index++;
         console.log(index);
        show();
    });
    
    
    //// 点击小图切换
    $('.small-bg').find('a').mouseover(function(){
        index = $(this).index();
        console.log(index);
        show();
    });
    
    
    
    
    
    //content选项卡切换
    $('.mid-content ').eq(0).show()
    $('.mid-content ').eq(0).siblings().hide();
    $('.c-list').find('li').eq(0).css("background","orange")
    //$('.c-list').find('li').eq(0).css("background","orange").find("a").css("color","white");
    $('.c-list').find('li').mouseover(function(){
    	$(this).css("background","orange");
    	$(this).siblings().css("background","white");
    	var index=$(this).index();
    	//console.log(index);
    	$('.mid-content ').eq(index).show()
    	 $('.mid-content ').eq(index).siblings().hide();
    })
    
   
   
  /*本月总排行*/
   $('.li4').find("li").mouseover(function(evt){
   	
   		$(this).animate({height:"150px"},200).find("dl").animate({height:"150px"},200)
   		$(this).siblings().animate({height:"30px"},200).find("dl").animate({height:"0"},200)
   	})
   
   
   //话费
	$('.convenient').find('li').mouseenter(function(){
		$(this).find("i").animate({top:0},100)
			$(this).find("i").animate({top:30},100)
			
		
	})
   
   
   
   
   
	})


	
