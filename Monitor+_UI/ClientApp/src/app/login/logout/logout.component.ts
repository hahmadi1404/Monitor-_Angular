import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/Services/login.service';


@Component({
  selector: 'app-logout',
  template: './logout.component.html',
})
export class LogoutComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.logout();
  }

}
