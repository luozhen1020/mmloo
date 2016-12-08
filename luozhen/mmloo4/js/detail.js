$(function(){
	
	//获取list页面传来的值
		var idstr=location.search.replace("?id=","");
		
	
		
	
	$.get('../data/detail.txt', function(response){
		//console.log(response)
		var obj1 = JSON.parse(response);
		var obj={};
		$.each(obj1, function(index,val) {
			if(index==idstr){
				obj=val;
			}else{
				obj=obj1.meizu;
			}
		});
		
		console.log(obj1.idstr)
		$('<h3>'+obj.name+'</h3>').appendTo($('#product .sel-tit'));
		$('<p>'+obj.introduce+'</p>').appendTo($('#product .sel-tit'));
		$('<p>批 发 价： <span style="color:red;font-size: 26px;" class="price">'+obj.tradeprice+'</span> 一个也批发，单单返钱花</p>').prependTo($('#product .info'))
		$('<p>零 售 价： <span style="text-decoration: line-through;">'+obj.retailprice+'</span></p>').prependTo($('#product .info'))
		
		//商品详情
		$.each(obj.pic.detailspic, function(index,val) {
			$('<img src="'+val+'"/>').appendTo($('#detail .details-pic'))
		})
		//颜色选择
		$.each(obj.pic.chosecolor, function(index,val) {
			$('<div class="cor'+index+'"><img src="'+val+'"/></div>').appendTo($('#product .color'))
		});
		
			//点击加入购物车
   
		$('#product .color').find('div').click(function(){
			$(this).toggleClass('click');
			$(this).siblings().removeClass('click')
		})
		
		$('#product .memory').find('div').click(function(){
			$(this).toggleClass('click');
		})
		
		//大图
		$.each(obj.pic.bigpic,function(index,val){
			$('#product .ol-bigpic').append($('<li class="jqzoom bigPic"><img src="'+val+'" jqimg="'+val+'"/></li>'))
		})
		//初始化
		showPic(index);
		//鼠标移入大图显示翻页按钮
		$('#product .show ol li').mouseover(function(){
			$('.flip').show();
			//$('.big-ol').show()
		}).mouseout(function(){
			$('.flip').hide();
			//$('.big-ol').hide()
		})
		
			//放大功能
	  	$(".bigPic").jqueryzoom({
			  xzoom: 500,//放大区域宽度
			  yzoom: 500,//放大区域高度
			  preload: 1,//是否显示预加载
			  offset:100,//放大区域偏离小图的距离
			  position: "right",//放大区域显示的位置（left,right）
			  lens:true //是否显示小图上的透明区域
	  });
		
		
		//小图
		$.each(obj.pic.smallpic,function(index,val){
			$('#product .ul-smallpic').append($('<li><img src="'+val+'" /></li>'))
		})
		
		
		$('#product .show ul').find('li').mouseover(function(){
			index=$(this).index();
			//console.log(index);
			showPic(index);
		})
		
		
		//点击加入购物车的cookie
		$('#product .buy').find('.add').click(function(){
		//	console.log(document.cookie);
			var name=$('#product .sel-tit').find('h3').text();
			
			var price=parseFloat($('#product .info').find('.price').text().replace('¥',''));
			//var src=$('#product .cor0').find('img').prop("src");//????不行
			var src="../img/details/color (1).jpg"
			console.log($('#product .cor0').find('img'))
			console.log(src);
			//设置cookie
			savegood(name,price,src);
			console.log(getCookie(SRCS))
	})
		
	
	})
	
	
	
	
	//举报中心
	$('#sort .tip-off').find('span').mouseover(function(){
			//console.log($('#sort .tip-off').find('div'))
			$('#sort .tip-off').find('div').css({display:'block'}).mouseover(function(){
					$('#sort .tip-off').find('div').css({display:'block'}).find('a').css({color:"red","text-decoration":"underline"})
		}).mouseout(function(){
					$('#sort .tip-off').find('div').css({display:'none'}).find('a').css({color:"black","text-decoration":"none"})
		})
	}).mouseout(function(){
			$('#sort .tip-off').find('div').css({display:'none'})
	})
	
	
	
	
	var index=0;//图片索引
	function showPic(index){
		$('#product .show ol').find('li').eq(index).animate({opacity:1},100).siblings().animate({opacity:0},100);
		$('#product .show ul').find('li').eq(index).css('border-color','red').siblings().css('border-color','#ccc');	
	}
	
	
	
	
	
	
	
	
	//上一页，下一页
	$('.flip').mouseover(function(){
		$(this).show();
	})
	
	$(' .pre').click(function(){
		
		index--
		if(index<=0){
			index=0;
		}
		showPic(index);
	})
	
	$('.next').click(function(){
		index++;
		
		var x=$('.show ol li').length;
		
		if(index>=x-1){
			index=x-1;
		}
		showPic(index);
	})
	
	
	
	

	
	
	//评价
	
	var index=0;
	$('#detail .comment .star').find('img').bind({
		mouseout:function(){
			$(this).prop('src','../img/details/star1.png')
			$(this).prevAll('img').prop('src','../img/details/star1.png')
		},
		mouseover:function(){
			$(this).prop('src','../img/details/star2.png')
			$(this).prevAll('img').prop('src','../img/details/star2.png')
		}
		
	}).click(function(){
			//清除所有样式
			$(this).prop('src','../img/details/star1.png')
			$(this).siblings().prop('src','../img/details/star1.png')
			
			$(this).prop('src','../img/details/star3.jpg')
			$(this).prevAll('img').prop('src','../img/details/star3.jpg')
			
			index=parseInt($(this).index()+1);//获取下标
			console.log(index)
			//点击后就确定了分数
			$(this).unbind('mouseout').unbind(' mouseover');
			$(this).siblings().unbind('mouseout ').unbind(' mouseover');
	})
	
	 $('#detail .comment .sub').click(function(){
		 	var x=$(this).prev().val();
		 	var y='';
		 	for(var i=0;i<index;i++){
		 		y+="<img src='../img/details/star2.png' />"
		 	}
		 	console.log(x);
		 	if(x!=""||index!=0){
				$("<dl><dt>"+x+"</dt><dd>"+y+"</dd></dl>").appendTo("#detail .eva-comment");
		 	
		 	}
	 	
	 })
   			 	 
   			 	 
   
	
	//加减
	
	$('#product .quantity').find('.add1').click(function(){
		
			var x=parseInt($('#product .quantity').find('.nums').val())+1
			$('#product .quantity').find('.nums').val(x);
			//console.log(x)
	})
	
	$('#product .quantity').find('.minus1').click(function(){
		
			var x=parseInt($('#product .quantity').find('.nums').val())-1;
			if(x<=1){
				x=1;
			}
			$('#product .quantity').find('.nums').val(x);
			//console.log(x)
	})
	
	
	var NAMES="NAMES";
	var PRICES="PRICES";
	var SRCS="SRCS";
	var NUMS="NUMS";
	//获取cook
	var c_namestr=getCookie("NAMES");
	var c_pricestr=getCookie("PRICES");
	var c_srcstr=getCookie("SRCS");
	var c_numstr=getCookie("NUMS");
	
	var c_namearr=[];
	var c_pricearr=[];
	var c_srcarr=[];
	var c_numarr=[];
	
	if(c_namestr){
		  c_namearr=c_namestr.split("&");
		  c_pricearr=c_pricestr.split("&");
		  c_srcarr=c_srcstr.split("&");
		  c_numarr=c_numstr.split("&");
	}
	
	function savegood(name,price,src){
		//console.log("namearr"+c_namearr);
		c_namearr.push(name);
		c_pricearr.push(price);
		c_srcarr.push(src);
	//	c_numarr.push(num);
		//数组转成字符串
	//	console.log("numarr:"+c_numarr);
		
		var tem_name=c_namearr.join("&");
		var tem_price=c_pricearr.join("&");
		var tem_src=c_srcarr.join("&");
	//	var tem_num=c_numarr.join("$")
		//console.log("tem_name:"+tem_name);
		removeCookie(NAMES);
		removeCookie(PRICES);
		removeCookie(SRCS);
	//	removeCookie(NUMS);
		
		var d=new Date();
		d.setDate(d.getDate()+7);
		
		setCookie(NAMES,tem_name,d);
	//	console.log("tem_name:"+tem_name);
		setCookie(PRICES,tem_price,d);
		setCookie(SRCS,tem_src,d);
	//	setCookie(NUMS,tem_num,d);

}//savegood
	
	
	
	
	
	
	
})
