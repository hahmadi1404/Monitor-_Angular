import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
declare var Snap: any;
declare var mina: any;
@Component({
  selector: 'app-clock-snap',
  templateUrl: './clock-snap.component.html',
  styleUrls: ['./clock-snap.component.css']
})
export class ClockSnapComponent implements AfterViewInit {

  constructor(@Inject(DOCUMENT) document: Document) { }


  ngAfterViewInit(): void {
	var s = Snap(document.getElementById("clock"));

	var seconds = s.select("#seconds"),
		minutes = s.select("#minutes"),
		hours   = s.select("#hours"),
		rim     = s.select("#rim"), 
		face    = {
		  elem: s.select("#face"),
		  cx: s.select("#face").getBBox().cx,
		  cy: s.select("#face").getBBox().cy,
		},
		angle   = 0,
		easing = function(a:any) {
		  return a==!!a?a:Math.pow(4,-10*a)*Math.sin((a-.075)*2*Math.PI/.3)+1;
		};

	var sshadow = seconds.clone(),
		mshadow = minutes.clone(),
		hshadow = hours.clone(),
		rshadow = rim.clone(),
		shadows = [sshadow, mshadow, hshadow];

	//Insert shadows before their respective opaque pals
	seconds.before(sshadow);
	minutes.before(mshadow);
	hours.before(hshadow);
	rim.before(rshadow);

	//Create a filter to make a blurry black version of a thing
	var filter = Snap.filter.blur(0.1) + Snap.filter.brightness(0);

	//Add the filter, shift and opacity to each of the shadows
	shadows.forEach(function(el){
		el.attr({
			transform: "translate(0, 2)",
			opacity: 0.2,
			filter: s.filter(filter)
		});
	})

	rshadow.attr({
		transform: "translate(0, 8) ",
  opacity: 0.5,
		filter: s.filter(Snap.filter.blur(0, 8)+Snap.filter.brightness(0)),
	})

	function update() {
	  var time = new Date();
	  setHours(time);
	  setMinutes(time);
	  setSeconds(time);
	}

	function setHours(t:Date) {
	  let hour = t.getHours();
	  let hhour = hour%12;
	  let hhhour =hhour+ Math.floor(t.getMinutes()/10)/6;
	  let angle = hour*360/12;
	  hours.animate(
		{transform: "rotate("+angle+" 244 251)"},
		100,
		mina.linear,
		function(){
		  if (angle === 360){
			hours.attr({transform: "rotate("+0+" "+face.cx+" "+face.cy+")"});
			hshadow.attr({transform: "translate(0, 2) rotate("+0+" "+face.cx+" "+face.cy+2+")"});
		  }
		}
	  );
	  hshadow.animate(
		{transform: "translate(0, 2) rotate("+angle+" "+face.cx+" "+face.cy+2+")"},
		100,
		mina.linear
	  );
	}
	function setMinutes(t:Date) {
	  var minute = t.getMinutes();
	  let mminute =minute% 60;
	  let mmminute = mminute+ Math.floor(t.getSeconds()/10)/6;
	  let angle = minute*360/60;
	  minutes.animate(
		{transform: "rotate("+angle+" "+face.cx+" "+face.cy+")"},
		100,
		mina.linear,
		function(){
		  if (angle === 360){
			minutes.attr({transform: "rotate("+0+" "+face.cx+" "+face.cy+")"});
			mshadow.attr({transform: "translate(0, 2) rotate("+0+" "+face.cx+" "+face.cy+2+")"});
		  }
		}
	  );
	  mshadow.animate(
		{transform: "translate(0, 2) rotate("+angle+" "+face.cx+" "+face.cy+2+")"},
		100,
		mina.linear
	  );
	}
	function setSeconds(t:Date) {
	  let tt = t.getSeconds();
	  let ttt = tt%60;
	  let angle = ttt*(360/60);
	  //if ticking over to 0 seconds, animate angle to 360 and then switch angle to 0
	  if (angle === 0) angle = 360;
	  seconds.animate(
		{transform: "rotate("+angle+" "+face.cx+" "+face.cy+")"},
		600,
		easing,
		function(){
		  if (angle === 360){
			seconds.attr({transform: "rotate("+0+" "+face.cx+" "+face.cy+")"});
			sshadow.attr({transform: "translate(0, 2) rotate("+0+" "+face.cx+" "+face.cy+2+")"});
		  }
		}
	  );
	  sshadow.animate(
		{transform: "translate(0, 2) rotate("+angle+" "+face.cx+" "+face.cy+2+")"},
		600,
		easing
	  );
	}
	setInterval(update, 1000);
  }

}
