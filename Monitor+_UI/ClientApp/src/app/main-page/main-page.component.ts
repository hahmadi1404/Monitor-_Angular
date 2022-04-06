import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MarqueeResponse } from 'src/interfaces/marquee-response';
import { MediaResponse } from 'src/interfaces/media-response';
import { RequestService } from 'src/Services/request.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  @ViewChild('videoPlayer', { static: false })videoplayer!: ElementRef;
  constructor(@Inject(DOCUMENT) document: Document,public reqService:RequestService) { }

  elem: any;


  ngOnInit(): void {

    setInterval(() => {

      this.reqService.checkVideo().subscribe(async (data:any) => {
        data=<MediaResponse>data;
        if(data != null ){

          if("./media/"+data.fileName!=this.reqService.mediaSource){
            this.reqService.mediaSource="./media/"+data.fileName;
            this.videoplayer.nativeElement.load();
            await this.delay(500);
            this.videoplayer.nativeElement.play();

          }
        }else{
          this.reqService.mediaSource="";
          this.videoplayer.nativeElement.load();
          this.videoplayer.nativeElement.play();
        }
      });


      this.reqService.checkmarquee().subscribe((data:any) => {
        data=<MarqueeResponse>data;
        if(data != null ){

          this.reqService.MarqueeText=data.text;

        }else{
          this.reqService.MarqueeText="";
        }
      });
    },6000);
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

}
