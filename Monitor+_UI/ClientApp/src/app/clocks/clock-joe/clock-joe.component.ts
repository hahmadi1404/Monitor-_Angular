import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock-joe',
  templateUrl: './clock-joe.component.html',
  styleUrls: ['./clock-joe.component.css']
})
export class ClockJoeComponent implements OnInit {

  constructor(@Inject(DOCUMENT) document: Document) { }
  hour:number =0;
  minute:number=0;
  second:number=0;
  
  clock() {
    const date = new Date();

    const hours = ((date.getHours() + 11) % 12 + 1);
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    this.hour = hours * 30;
    this.minute = minutes * 6;
    this.second = seconds * 6;
    
    // document.querySelector('.hour').style.transform = `rotate(${hour}deg)`
    // document.querySelector('.minute').style.transform = `rotate(${minute}deg)`
    // document.querySelector('.second').style.transform = `rotate(${second}deg)`
  }

  ngOnInit(): void {

    
    this.clock();

    setInterval((()=>{
      this.clock();
    }), 1000);

  }

}
