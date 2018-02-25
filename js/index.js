
/**
 * 页面加载
 */
$(function(){
	Tool.initRelBox();
	
	/**
	 * 下拉框hover触发
	 */
	var dropTitle = $(".page-list-title");
	dropTitle.hover(function(){
		clearTimeout(Tool.drop.timer);
		Tool.drop.bodyShow(dropTitle);
	}, function(){
		Tool.drop.bodyHideDelay();
		Tool.drop.bodyHover();
	})
	dropTitle.click(function(){
		clearTimeout(Tool.drop.timer);
		Tool.drop.bodyShow(dropTitle);
		Tool.drop.bodyHideDelay();
		Tool.drop.bodyHover();
	})
	
	//url:"https://free-api.heweather.com/v5/weather?city=青岛&key=5c9b52bc5c924d399131e69b0dedec78",
	/** 加载天气 */
	Tool.weather.getCity().then(function(data){
		return Tool.weather.getDetail();
	}).then(function(data){
		Tool.weather.setHtml(data.results[0]);
		/** 天气详情 */
		$("#weather").click(function(){
			$("#pageBody").load("demo/weather/weather.html");
		})
	})
	
	/** demo跳转 */
	$(".page-item").click(function(){
		var tarPage = this.getAttribute("tarPage");
		tarPage && $("#pageBody").load(tarPage);
	})
	
})