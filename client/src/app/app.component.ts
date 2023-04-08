import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'women';
  
  loginUrl = "login";
  isLoggedIn = false;
  loginUser: string| null = "";

  constructor( private router: Router,
    private authService: AuthService) {}

  ngOnInit(): void {
      this.isLoggedIn = this.authService.isLoggedIn();
      this.loginUser = this.authService.getLoginUser();
  }

  checkUserLogin () {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.loginUser = this.authService.getLoginUser();
    }
    return this.isLoggedIn;
  }

  logoff() {
    this.authService.logoff();
    this.loginUser = "";
    this.router.navigate([this.loginUrl]);
  }
}
