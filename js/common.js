(function(){
	var Tool = {
		drop: {
			body:{},
			timer:'',
			bodyShow: function(title){
				var tarId = "#"+title.parent().attr("id")+"_relto";
				this.body = $(tarId).fadeIn();
				this.itemHover();
			},
			bodyHideDelay: function(){
				this.timer = setTimeout(function(){Tool.drop.body.hide();},200);
			},
			bodyHover: function(){
				var _self = this;
				this.body.hover(function(){
					clearTimeout(_self.timer);
				},function(){
					_self.bodyHideDelay();
				})
			},
			itemHover: function(){
				var hoverItem,contentWidth;
				var pageItem = $(".page-item");
				var limitWidth = pageItem.outerWidth();
				pageItem.hover(function(){
					hoverItem = $(this);
					contentWidth = hoverItem.find("a").outerWidth();
					if(contentWidth > limitWidth){
						//this.style.display = 'inline-block';
						hoverItem.animate({width:contentWidth+"px"},200);
					}
				},function(){
					if(contentWidth > limitWidth){
						//hoverItem.animate({width:limitWidth+"px"},200);
						hoverItem.width(limitWidth);
						//this.style.display = 'block';
					}
				})
			}
		},
		
		weather:{
			city:"",
			detail:{},
			getCity: function(){
				var _self = this;
				var promCity = new Promise(function(resolve, reject){
					/** 地理位置 */
					$.getScript('https://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js',function(_result){
				        if(remote_ip_info.ret=='1'){
				        	resolve("success");
				        	_self.city = remote_ip_info.city;
				            console.log('国家：'+remote_ip_info.county+'\n省：'+remote_ip_info.province+'\n市：'+remote_ip_info.city+'\n区：'+remote_ip_info.district+'\nISP：'+remote_ip_info.isp+'\n类型：'+remote_ip_info.type+'\n其他：'+remote_ip_info.desc);
				        }else{
				        	reject("fail");
				        	console.log('没有找到匹配的IP地址信息！');
				        }
				    });
				});
				return promCity;
			},
			getDetail: function(){
				var _self = this;
				/** 天气情况 */
				var promDetail = new Promise(function(resolve, reject){
					$.ajax({  
				        url:"https://api.map.baidu.com/telematics/v3/weather?location="+_self.city+"&output=json&ak=H7W5CxI0BPzKtwGcBHmpGPAz50xP1Qjw",  
				        dataType:"jsonp",  
				        success:function(data){
				        	console.log(data);
				        	_self.detail = data.results[0];
				        	resolve(data);
				        }
					})
				})
				return promDetail;
			},
			setHtml: function(){
				var weaToday = this.detail.weather_data[0];
				var oWeather = $("#weather");
				oWeather.find(".weather-img").find("img").attr("src",weaToday[this.pictureType()]);
				oWeather.find(".weather-all").text(weaToday.weather);
				oWeather.find(".weather-temperature").text(weaToday.temperature);
			},
			pictureType: function(){
				var hours = new Date().getHours();
				if(hours >= 6 && hours <= 18){
					return "dayPictureUrl";
				}
				return "nightPictureUrl";
			}
		},
		
		initRelBox: function(){
			var relList = $(".relative-box>div");
			$.each(relList, function(idx, rel){
				rel.hasAttribute("relativeTo") && $(rel).relativeBox();
			})
		}
	}
	
	window.Tool = Tool;
	
	$.fn.relativeBox = function(){
		var relTo = this.attr("relativeTo");
		var targetDom = $(relTo);
		var left = targetDom.offset().left + "px";
		var top = (targetDom.offset().top + targetDom.outerHeight()) + 'px';
		this.css({left:left,top:top,width:targetDom.outerWidth()});
		this.attr("id",relTo.substr(1)+"_relto");
	}
})()