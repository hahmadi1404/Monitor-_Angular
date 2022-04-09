import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/Services/auth-guard.service';
import { ClockCanvasComponent } from './clocks/clock-canvas/clock-canvas.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './login/logout/logout.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  { path: 'logout',  component: LogoutComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'clock',  component: ClockCanvasComponent},
  { path: '', component: MainPageComponent ,canActivate: [AuthGuard]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
