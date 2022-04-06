import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginService } from 'src/Services/login.service';
import { RequestService } from 'src/Services/request.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MarqueeComponent } from './marquee/marquee.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ClockSnapComponent } from './clocks/clock-snap/clock-snap.component';
import { ClockHughDaiComponent } from './clocks/clock-hugh-dai/clock-hugh-dai.component';
import { ClockJoeComponent } from './clocks/clock-joe/clock-joe.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    MarqueeComponent,
    ClockSnapComponent,
    ClockHughDaiComponent,
    ClockJoeComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    MatSnackBarModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [RequestService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
