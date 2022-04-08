import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css']
})
export class DateTimeComponent implements OnInit {

  constructor() { }
  dateNow:Date =new Date();
  ngOnInit(): void {
    setInterval(() => {
      this.dateNow =new Date();
    },1000);
  }

}
