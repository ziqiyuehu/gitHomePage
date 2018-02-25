$(function(){
	console.log(Tool.weather.detail);
	
	var tipList = $(".today-tip .tip");
	var weatherIndex = Tool.weather.detail.index;
	$.each(tipList, function(idx, obj){
		tipList.eq(idx).find(".tip-title").text(weatherIndex[idx].tipt);
		tipList.eq(idx).find(".tip-text").text(weatherIndex[idx].des);
	})
	
	var dayList = $(".week-weather .one-day");
	var weatherData = Tool.weather.detail.weather_data;
	$.each(dayList, function(idx, obj){
		var currData = weatherData[3-idx];
		var subsDate = currData.date;
		dayList.eq(idx).find(".img img").attr("src",currData.dayPictureUrl);
		dayList.eq(idx).find(".temperature").text(currData.temperature);
		dayList.eq(idx).find(".detail").text(currData.weather);
		dayList.eq(idx).find(".wind").text(currData.wind);
		
		if(3-idx == 0){
			subsDate = subsDate.substring(0,subsDate.indexOf("("));
			dayList.eq(idx).find(".img img").attr("src",currData[Tool.weather.pictureType()]);
		}
		dayList.eq(idx).find(".date").text(subsDate);
	})
})