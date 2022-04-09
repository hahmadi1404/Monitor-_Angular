import { DOCUMENT } from '@angular/common';
import { Component, HostBinding, Inject, Input, OnInit } from '@angular/core';
import { RequestService } from 'src/Services/request.service';

@Component({
  selector: 'app-marquee',
  templateUrl: './marquee.component.html',
  styleUrls: ['./marquee.component.css']
})
export class MarqueeComponent implements OnInit {

  constructor(public reqService:RequestService,@Inject(DOCUMENT) document: Document) { }
  // @HostBinding("style.--duration")
  // @Input()
  // duration: string="70s";
  ngOnInit(): void {

  }

}
