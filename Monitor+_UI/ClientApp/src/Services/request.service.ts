import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { LoginService } from './login.service';
import { MarqueeResponse } from 'src/interfaces/marquee-response';
import { MediaResponse } from 'src/interfaces/media-response';



// import { MatTableDataSource } from '@angular/material/table';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  // dataSource: MatTableDataSource<DataResultModel> = new MatTableDataSource();
  constructor(private http: HttpClient,private loginService:LoginService) { }

  public token: string = "";
  public MarqueeText="";
  public MarqueeTextTemp:MarqueeResponse[]=[];
  public mediaSource:MediaResponse | undefined;
  public mediaSourceIndex=-1;
  public mediaSourceTemp:MediaResponse[]=[];
  userId="";
  checkVideo(){
    return this.http.get( './api/monitorPlus/checkVideo?user=' +this.loginService.getCookie("user") , { headers: { "Authorization": `Bearer ${this.loginService.getCookie("token") }` } });
  }

  checkmarquee(){
    return this.http.get( './api/monitorPlus/checkmarquee?user=' +this.loginService.getCookie("user") , { headers: { "Authorization": `Bearer ${this.loginService.getCookie("token")}` } });
  }



}
