function myFunction(dataArray){
		
	//console.log(dataArray);
	
	//keeping track of total time/ hours
	var totalHours=
	{
		'driving':{hours:0,minutes:0},
		'on-duty':{hours:0,minutes:0},
		'off-duty':{hours:0,minutes:0},
		'sleep':{hours:0,minutes:0}
	};
	
	//declaring necessary variable
	var d = new Date();		//date object	
	var bar="<!-- bar-->";	//holds the html for the stackable graph
	var ctr=0;				//keeps track of what dataArray element we are at
	var lastMinute = 0;		//minute of the prev dataArray object
	var lastHour = 00;		//keeps track of the pre dataArray object hour
	var thisDataHour;		//current objects hour
	var thisDataMinutes;	//current objects minute value
	var firstState;			//the state the driver starts in by default off duty
	var arraySize = 0;		//size of dataArray
	var width;				//width of each division will be in %
	var state;				//the current state the driver is in
	var prevState;			//the prev state
	//loop through each dataArray to get the size
	for(var time in dataArray)
	{
		if(dataArray.hasOwnProperty(time))arraySize++;
	}
			
	//sets the first state
	if(dataArray['0:00']==null)
	{
		var temp={'0:00' : 'off-duty'};
		for (var key in dataArray) 
		{ 
			temp[key] = dataArray[key]; 
		}
		dataArray = temp;
	}
			
	
	for(var time in dataArray)
	{
		state = dataArray[time];
					
		// parse time
		var s = time.split(":");
		thisDataHour = s[0];
		thisDataMinutes = s[1];
					
		//gets rid of 0 at the beginning of minutes
		if(thisDataMinutes[0]==0)
			thisDataMinutes=thisDataMinutes[1];
					
		if(ctr==0)//first iteration
		{
			bar += "<div class ='block-"+state+"'";
			prevState = state;
			lastHour=0;
			lastMinute=0;
		}
		else
		{
			//converts time into minutes
			var time = +thisDataHour*60;
			time = time + +thisDataMinutes; 
						
			var temp = +lastHour*60;
			temp = temp+ +lastMinute;
						
			time = time - +temp;
			//console.log(time);
						
			//console.log('t '+time+' l '+temp);
			//console.log(time- +temp)
				
			var h = time/60;
			h = ((""+h).split('.'))[0];
						
			var m = time- +h*60;
			m=((""+m).split('.'))[0];
						
			h = Math.abs(h);
			m = Math.abs(m);
						
			width = ((100/24)*(+h +(+m/60)));
			bar += "style = 'width:"+width+"%'>"+h+":";
			if(m<10)
				bar += "0"+m+"</div>";
			else 
				bar+=m+"</div>";
			bar += "<div class ='block-"+state+"'";

			
		lastMinute = thisDataMinutes;
		lastHour = thisDataHour;
		
					
			//update total hours
			for(var s in totalHours)
			{
				//console.log('ctr:'+ctr)
				/*console.log('s:'+s);
				console.log('current:'+state);
				console.log('prev:'+prevState);
				console.log('h:'+h);
				console.log('m:'+m);*/
				if(m<1) break;
				if(s == prevState)
				{
					//console.log('working on:'+s);
					var hr = (totalHours[s])['hours'];
					var min = (totalHours[s])['minutes'];
					if(min[0]==0)min=min[1];
					if(m[0]==0)m=m[1];
					var t_hour = +hr + +h;
					var t_min = +min + +m;
					/*console.log('h:'+h+'hr:'+hr);
					console.log(hr + +h);
					
					console.log('m:'+m+'min:'+min);
					console.log(min + +min);
					*/
					
					//if minutes are >60
					if(t_min >=60)
					{
						console.log('tmin:'+t_min/60);
						var additionalHr = t_min /60;
						additionalHr = ((""+additionalHr).split('.'))[0];
						t_hour +=additionalHr;
						
						t_min = ((""+additionalHr).split('.'))[1];
						
						t_hour = Math.abs(t_hour);
						t_min = Math.abs(t_min);
					}
					if(t_min[2]!=null){
						t_min= t_min[1]+""+t_min[2];
					}
					//if(t_min[1]==null)t_min="0"+t_min;
					((totalHours[s])['hours'])=t_hour;
					((totalHours[s])['minutes'])=t_min;
					
					//console.log(totalHours);
				}
			}
			
			prevState = state;
		
		}
		
		
		ctr++;
	}//end for loop	
	
				//console.log(lastHour);
				//console.log(lastMinute);
	
	//last iteration
	{
		var h;
		var m;
		if(d.getHours()>=lastHour)// if there is time left in day
		{
			//converts time into minutes
			var time = +lastHour*60;
			time = time + +lastMinute; 
			
			var temp = +d.getHours()*60;
			temp = temp+ +d.getMinutes();
			
			time = time - +temp;
			//console.log(time);
						
			//console.log('t '+time+' l '+temp);
			//console.log(time- +temp)
			h = time/60;
			//console.log(h);
			h = ((""+h).split('.'))[0];
						
			m = time- +h*60;
			m=((""+m).split('.'))[0];
			//console.log('msplit'+m);
						
			h = Math.abs(h);
			m = Math.abs(m);
					
			//width = ((h*60+m)/3600)*100;
			width = ((100/24)*(h+(m/60)));
			
			bar += "style = 'width:"+width+"%'>"+h+":";
			if(m<10)
				bar += "0"+m+"</div>";
			else 
				bar+=m+"</div>";
		}
		else//if day is over
		{
			//converts time into minutes
			var time = +lastHour*60;
			time = time + +lastMinute; 
						
			var temp = +23*60;
			temp = temp+ +60;
						
			time = time - +temp;
			//console.log(time);
						
			h = time/60;
			//console.log(h);
			h = ((""+h).split('.'))[0];
						
			m = time- +h*60;
			m=((""+m).split('.'))[0];
						
			h = Math.abs(h);
			m = Math.abs(m);
						
			width = ((100/24)*(h+(m/60)));
			bar += "style = 'width:"+width+"%'>"+h+":";
			if(m<10)
				bar += "0"+m+"</div>";
			else 
				bar+=m+"</div>";
					
			thisDataHour=24;
			thisDataMinute=0;
		}//end else
			
		//update total hours
		for(var s in totalHours)
		{
			if(m<1) break;
			if(s == state)
			{
				var hr = (totalHours[s])['hours'];
				var min = (totalHours[s])['minutes'];
				var t_hour = hr + h;
				var t_min = min + m;
				
				if(t_min >=60)
				{
					var additionalHr = t_min /60;
					additionalHr = ((""+additionalHr).split('.'))[0];
					t_hour +=additionalHr;
					
					t_min = ((""+additionalHr).split('.'))[1];
					
					t_hour = Math.abs(t_hour);
					t_min = Math.abs(t_min);
				}
				((totalHours[s])['hours'])=t_hour;
				((totalHours[s])['minutes'])=t_min;
				//console.log(totalHours);
			}
		}
	
		//time left
		if(thisDataHour<24){
			h = 23-d.getHours();
			m = 60-d.getMinutes();
						
			width = ((100/24)*(h+(m/60)));
						
			bar += "<div class = 'block-time-left' style = 'width:"+width+"%'>X</div>";
		}
					
		//set the current State after writing the time left
		document.getElementById('current-state').innerHTML =state;
	}
		
	//console.log(bar)
	
	//draw the stackable bar graph on screen
	document.getElementById('myGraph').innerHTML = bar;
			
	//make all the times on top of the bar 
	//console.log(totalHours);
	var w = (100/24);
	var time = "";
			
	for(var i = 1; i<25; i++)
	{
		time += "<div style='width:"+w+"%; float:left;'>"+i+"</div>";
	}
	
	//console.log(time);
	//adds the hours on top of the bar
	document.getElementById('times').innerHTML = time;
			
	//the date is made here
	var date = "Date: "+d.getMonth()+"-"+d.getDate()+"-"+d.getFullYear();
	//console.log(date);
	document.getElementById('date-container').innerHTML = date;
			
	//the onscreen time clock is created here				
	var mins=d.getMinutes();
				
	if(d.getMinutes()<10)
		mins="0"+mins;
		
	var currentTime = d.getHours()+":"+mins;
	console.log(currentTime);
	document.getElementById('current-time').innerHTML=
	currentTime;
	
	var totalTimeHtml = "<div> <span class='status-driving'> Driving: "+totalHours['driving']['hours']+":"+totalHours['driving']['minutes']+" </span>";
	
	totalTimeHtml += "<span class='status-sleep'> Sleeping: "+totalHours['sleep']['hours']+":"+totalHours['sleep']['minutes']+" </span>";
	
	totalTimeHtml += "<span class='status-off-duty'> Off Duty: "+totalHours['off-duty']['hours']+":"+totalHours['off-duty']['minutes']+" </span>";
	
	totalTimeHtml += "<span class='status-on-duty'> On Duty: "+totalHours['on-duty']['hours']+":"+totalHours['on-duty']['minutes']+" </span></div>";
	
	document.getElementById('totalHours').innerHTML=totalTimeHtml;
}//end myFunction