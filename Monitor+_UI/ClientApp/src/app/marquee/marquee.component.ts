import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/Services/request.service';

@Component({
  selector: 'app-marquee',
  templateUrl: './marquee.component.html',
  styleUrls: ['./marquee.component.css']
})
export class MarqueeComponent implements OnInit {

  constructor(public reqService:RequestService) { }

  ngOnInit(): void {
  }

}
