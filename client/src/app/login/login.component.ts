import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginEnable = true;
  isRegistrationEnable = true;
  returnUrl = "dashboard";
  returnLogin = "login"
  errorMessage = "";

  loginForm: FormGroup = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]]
  });

  registerForm: FormGroup = this.fb.group({
    username: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
    password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
    email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    contact_number: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
  });
  
  get thisLogin(){
    return this.loginForm.controls;
  }
  get thisRegister(){
    return this.registerForm.controls;
  }

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {
    this.isLoginEnable = true;
    this.isRegistrationEnable = false;
  }

  ngOnInit() {
    this.disableRegistration();
    this.returnUrl = '/dashboard';
    this.returnLogin = '/login';
    this.authService.logoff();
  }

  enableRegistration() {
    this.isLoginEnable = false;
    this.isRegistrationEnable = true;
  }

  disableRegistration() {
    this.isLoginEnable = true;
    this.isRegistrationEnable = false;
  }

  login() {
    this.errorMessage = "";
    if (this.loginForm.invalid) {
      return;
    } else {
      let username = this.loginForm.controls["username"].value;
      let password = this.loginForm.controls["password"].value;
      if ( this.authService.login (username, password)) {
        this.router.navigate([this.returnUrl]);
      }
      else {
        this.errorMessage = "Either username and password is incorrect, or user is not registered";
      }
    }
  }

  register() {
    this.errorMessage =""
    if (this.registerForm.invalid) {
      return;
    } else {
      let username = this.registerForm.controls["username"].value;
      let password = this.registerForm.controls["password"].value;
      let email = this.registerForm.controls["email"].value;
      let contact_number = this.registerForm.controls["contact_number"].value;
      if ( this.authService.register (username, password, email, contact_number)) {
        this.disableRegistration();
      }
      else {
        this.errorMessage = "User already exist";
      }
    }
  }
}
