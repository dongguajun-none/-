
function star(){
	var start = document.getElementById("start");
	start.style.backgroundImage = "none";
	//背景图滚起来
	var oBg1 = document.getElementById("bg1");
	var oBg2 = document.getElementById("bg2");
	var timer = setInterval(function(){
		oBg1.style.top = oBg1.offsetTop + 1 +"px";
		oBg2.style.top = oBg2.offsetTop + 1 +"px";
		if(oBg1.offsetTop >= 700){
			oBg1.style.top = "-700px";
		}
		if(oBg2.offsetTop >= 700){
			oBg2.style.top = "-700px";
		}
	},10)
	
	
	//飞机位置变化
	//获取飞机位置
	var oPlane = document.getElementById("airplane");
	oPlane.addEventListener("click",function(e){
		var ev = e || window.event;
		var planeX = ev.pageX;
		var planeY = ev.pageY;
		var moveX = 0;
		var moveY = 0;
		// console.log(planeX,planeY);
		//让飞机随鼠标移动
		document.getElementById("box").addEventListener("mousemove",function(e){
			var en = e || window.event;
			 moveX = en.pageX - planeX;
			planeX = en.pageX;
			 moveY = en.pageY - planeY;
			planeY = en.pageY;
			 // console.log(en.pageX,en.pageY);
			 // console.log(moveX,moveY);
			 oPlane.style.left = oPlane.offsetLeft + moveX + "px";
			 oPlane.style.top = oPlane.offsetTop + moveY +"px";
		},false)
	},false)
	
	//发射子弹
	var timerbullet = setInterval(function(){
		var bullet = document.createElement("div");
		box.appendChild(bullet);
		bullet.className = "bullet";
		bullet.time = timerfly;
		bullet.style.top = oPlane.offsetTop - 10 + "px";
		bullet.style.left = oPlane.offsetLeft + 25 + "px";
		
		//让子弹动起来
		var timerfly = setInterval(function(){
			bullet.style.top = bullet.offsetTop - 10 +"px";
			if(bullet.offsetTop <= -20){
				clearInterval(timerfly);
				box.removeChild(bullet);
			}
		},50)
		
	},500)
	
	
	//敌人下落
		//创建坦克
	var timertank = setInterval(function(){
		var tank = document.createElement("div");
		box.appendChild(tank);
		
		tank.className = "tank";
		tank.time = timerrun;
		tank.style.top =  "0px";
		
		//随机数函数封装
		function Random(min,max){
			return Math.random() * (max-min) + min;
		} 
		
		
		tank.style.left = Random(0,550) + "px";
		
		//让tank动起来
		var timerrun = setInterval(function(){
			tank.style.top = tank.offsetTop + 10 +"px";
			if(tank.offsetTop >= 700){
				clearInterval(timerrun);
				box.removeChild(tank);
			}
		},50)
		
	},1000)
	
	//子弹与坦克碰撞检测
	// var numL = 0;
	// var num = document.getElementById("num");
	var pzjc = setInterval(function(){
		var allTank = document.getElementsByClassName("tank");
		var allBullet = document.getElementsByClassName("bullet");
		//生成分数
		
		for(var i = 0;i < allTank.length;i++){
			for(var j = 0;i < allBullet.length;j++){
				var t = allTank[i];
				var b = allBullet[j];
				if(check_box_collision(b,t)){
					clearInterval(t.time);
					clearInterval(b.time);
					box.removeChild(t);
					box.removeChild(b);
					break;
				}
			}
		}
		},50)
	// console.log(numL);
	// if(num < 10){
	// 	num.innerHTML = "0" + numL ;
	// }else{
	// 	num.innerHTML = numL;
	// }
	
	//飞机和坦克碰撞
	var pzjcdie = setInterval(function(){
		var allTank = document.getElementsByClassName("tank");
		
		for(var i = 0;i < allTank.length;i++){
			
				var t = allTank[i];
				
				if(check_box_collision(oPlane,t)){
					for(var j = 0;j < 100;j++){
						clearInterval(j);
					}
					
				}
			
		}
	},50)
	//封装函数
	
		function check_box_collision(thingA,thingB){
								var left1 = parseInt(window.getComputedStyle(thingA).left);
								var left2 = parseInt(window.getComputedStyle(thingB).left);
								
								var top1 = parseInt(window.getComputedStyle(thingA).top);
								var top2 = parseInt(window.getComputedStyle(thingB).top);
								
								var height1 = parseInt(window.getComputedStyle(thingA).height);
								var height2 = parseInt(window.getComputedStyle(thingB).height);
								
								var width1 = parseInt(window.getComputedStyle(thingA).width);
								var width2 = parseInt(window.getComputedStyle(thingB).width);
								
								var center1 = {
									x : left1 + width1 / 2,
									y : top1 + height1 / 2
								}
								var center2 = {
									x : left2 + width2 / 2,
									y : top2 + height2 / 2
								}
								var distanceX = Math.abs(center1.x - center2.x);
								var distanceY = Math.abs(center1.y - center2.y);
								if(distanceX <= (width1 + width2)/2 && distanceY <= (height1 + height2)/2){
									return true;
								}else{
									return false;
								}
							}
		
		}

