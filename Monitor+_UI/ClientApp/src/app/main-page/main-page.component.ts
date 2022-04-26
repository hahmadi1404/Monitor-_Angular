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
        // console.log(data);
        if(data != null ){
          let a=<MediaResponse[]>data;
          if(JSON.stringify(a) != JSON.stringify(this.reqService.mediaSourceTemp) ){
            console.log("a!=this.reqService.mediaSourceTemp");
          this.reqService.mediaSourceTemp=a;
          this.reqService.mediaSource=this.reqService.mediaSourceTemp[0];
          this.reqService.mediaSourceIndex=0;
          this.videoplayer.nativeElement.load();
          await this.delay(500);
          this.videoplayer.nativeElement.play();
        }else{

        }
        }else{
          this.reqService.mediaSourceTemp=[];
          this.videoplayer.nativeElement.load();
          this.videoplayer.nativeElement.play();
        }
      });


      this.reqService.checkmarquee().subscribe((data:any) => {
        // console.log("m: "+data);
        if(data != null ){
          let a=<MarqueeResponse[]>data;
          if(a!=this.reqService.MarqueeTextTemp){
            this.reqService.MarqueeText="";
          a.forEach((element,index) => {
            this.reqService.MarqueeText+= element.text ;
            if(index!=a.length-1 && a.length>1){this.reqService.MarqueeText+=
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
            +"******"
            +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
          }
          });
          this.reqService.MarqueeTextTemp=a;
        }else{

        }

        }else{
          this.reqService.MarqueeText="";
        }
      });
    },6000);



  }

  async ended(){
    // alert("ended");
    // console.log(this.reqService.mediaSourceTemp.length-1);
    // console.log(this.reqService.mediaSourceIndex);
    if(this.reqService.mediaSourceTemp.length-1 >  this.reqService.mediaSourceIndex){
      this.reqService.mediaSource=this.reqService.mediaSourceTemp[this.reqService.mediaSourceIndex+1];
      this.reqService.mediaSourceIndex+=1;
    }else{
      this.reqService.mediaSource=this.reqService.mediaSourceTemp[0];
      this.reqService.mediaSourceIndex=0;
    }
        this.videoplayer.nativeElement.load();
        await this.delay(500);
        this.videoplayer.nativeElement.play();
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

}
