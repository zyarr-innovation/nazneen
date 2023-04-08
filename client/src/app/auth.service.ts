import { Injectable } from '@angular/core';

export interface IUser {
  name: string,
  password: string,
  email: string,
  contact_number: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  model: { [username: string]: IUser} = {};
  constructor() {
    let adminUser:IUser ={
      name: "admin",
      password: "admin@123",
      email: "admin@ge.com",
      contact_number: "9323053063"
    }
    this.model["admin"] = adminUser;

    let testUser:IUser ={
      name: "test",
      password: "admin@123",
      email: "test@ge.com",
      contact_number: "9323053063"
    }
    this.model["test"] = testUser;
   }

  isLoggedIn () {
    return localStorage.getItem('isLoggedIn') == "true";
  }
  
  login(username: string, password: string) {
    if (this.model[username]){
      if(username == this.model[username].name && password == this.model[username].password) {
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', username);
        return true;
      }
    }
    return false;
  }

  register(username: string, password: string,
    email: string, contact_number: string) {

      if (!this.model[username]){
        let userInfo: IUser = {
          name: username,
          password: password,
          email: email,
          contact_number: contact_number
        }
        this.model[username] = userInfo;
        return true;
      }

    return false;
  }

  logoff(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
  }

  getLoginUser() {
    let loginUser: string | null = "";
    if (this.isLoggedIn ()) {
      loginUser = localStorage.getItem('token');
    }
    return loginUser;
  }
}
