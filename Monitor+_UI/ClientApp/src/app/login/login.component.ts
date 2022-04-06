import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/interfaces/user-model';

import { LoginService } from 'src/Services/login.service';
import { RequestService } from '../../Services/request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  animating:boolean = true;
  loginShow=true;
  processing:boolean = false;
  success:boolean = false;
  active:boolean = false;
  submitPhase1:number = 0;
  submitPhase2:number = 0;
  appShow=false;

  constructor(private loginService:LoginService,private router: Router,private route: ActivatedRoute,private _snackBar: MatSnackBar) { }
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ngOnInit(): void {
    // alert("start");
    this.route.queryParams.subscribe(params => {
      console.log(params['token']);
      // alert(params['token']);
      if(params['token'] != undefined) {
        this.loginShow=false;
        this.loginService.ssoLogin(params['token']).subscribe(e =>{
          if(e!=null)
          {
            let data=<UserModel> e;

              this.loginService.setCookie('user',data.userName,100000 );
              this.loginService.setCookie('username',data.userName,100000 );
              this.loginService.setCookie('token', data.password, 100000);
              // alert(data.pass);
              this.loginService.isLogin = true;
              this.router.navigate(['/']);
          }
          });

      }
    });

    this.animating = false;
    this.submitPhase1 = 1100;
    this.submitPhase2 = 400;

  }

  submit(form:NgForm){

    if (this.animating) return;
    this.animating = true;
    this.processing=true;
    setTimeout(()=>{


    this.loginService.login(form.value.userName,form.value.password).subscribe(e =>{
      if(e!=null)
      {
        let data=<UserModel> e;
        this.success=true;
        this.appShow=true;
        // setTimeout(()=>{


        // }, (this.submitPhase2 - 70));

        // setTimeout(()=>{

        //   this.loginShow=true;
        // }, this.submitPhase2);

        setTimeout(()=>{

          // this.reqService.token = data.pass;
          // console.log(this.reqService.token);
          this.loginService.setCookie('user',data.userName,100000 );
          this.loginService.setCookie('username',data.userName,100000 );
          this.loginService.setCookie('token', data.password, 100000);
          this.loginService.isLogin = true;
          this.router.navigate(['/']);
        }, 400);



      }else{
        this._snackBar.open("نام کاربری یا کلمه عبور اشتباه می باشد", "خطا", {
          duration: 3500,
          horizontalPosition:this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.animating = false;
        this.processing=false;

      }
    });

  }, 1500);
    // var that = this;

    // $(that).addClass("processing");
    // setTimeout(function() {
      // $(that).addClass("success");
      // setTimeout(function() {
        // $app.show();
        // $app.css("top");
        // $app.addClass("active");
      // }, (this.submitPhase2 - 70));
      // setTimeout(function() {
        // $login.hide();
        // $login.addClass("inactive");
        // this.animating = false;
        // $(that).removeClass("success processing");
      // }, this.submitPhase2);
    // }, this.submitPhase1);

  }

}
