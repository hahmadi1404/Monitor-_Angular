import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock-hugh-dai',
  templateUrl: './clock-hugh-dai.component.html',
  styleUrls: ['./clock-hugh-dai.component.css']
})
export class ClockHughDaiComponent implements OnInit {

  constructor(@Inject(DOCUMENT) document: Document) { }
  stylesDeg:string="";
  ngOnInit(): void {
    (function(){

      //generate clock animations
      var now       = new Date(),
          hourDeg   = now.getHours() / 12 * 360 + now.getMinutes() / 60 * 30,
          minuteDeg = now.getMinutes() / 60 * 360 + now.getSeconds() / 60 * 6,
          secondDeg = now.getSeconds() / 60 * 360,
          stylesDeg = [
              "@-webkit-keyframes rotate-hour{from{transform:rotate(" + hourDeg + "deg);}to{transform:rotate(" + (hourDeg + 360) + "deg);}}",
              "@-webkit-keyframes rotate-minute{from{transform:rotate(" + minuteDeg + "deg);}to{transform:rotate(" + (minuteDeg + 360) + "deg);}}",
              "@-webkit-keyframes rotate-second{from{transform:rotate(" + secondDeg + "deg);}to{transform:rotate(" + (secondDeg + 360) + "deg);}}",
              "@-moz-keyframes rotate-hour{from{transform:rotate(" + hourDeg + "deg);}to{transform:rotate(" + (hourDeg + 360) + "deg);}}",
              "@-moz-keyframes rotate-minute{from{transform:rotate(" + minuteDeg + "deg);}to{transform:rotate(" + (minuteDeg + 360) + "deg);}}",
              "@-moz-keyframes rotate-second{from{transform:rotate(" + secondDeg + "deg);}to{transform:rotate(" + (secondDeg + 360) + "deg);}}"
          ].join("");

          
  })();
  }

}
