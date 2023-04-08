import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

export interface IUser {
  id: number;
  name: string
}
export interface ICaseCommunication {
  date: Date;
  text: string;
}
export interface ICase {
  id: number
  title: string;
  date: Date;
  description: string;
  communication: ICaseCommunication[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  caseDB: {[username: string]: ICase[]} ={};
  constructor(private authService: AuthService,) { 
    
    //=================================
    let tempCase: ICase[] = [];
    tempCase.push({
      id: 1,
      title: "My Case 1",
      date: new Date (),
      description: "My inlaws are troubling me a lot",
      communication: [{
        date:  new Date (),
        text: "Inlaws are beating me"
      },{
        date:  new Date (),
        text: "What else they are doing"
      },{
        date:  new Date (),
        text: "They are not allowing me to sleep also."
      }]
    });

    tempCase.push({
      id: 2,
      title: "My Case 2",
      date: new Date (),
      description: "My husband is very bad",
      communication: [{
        date:  new Date (),
        text: "My husband beats me alot, abuses me also."
      },{
        date:  new Date (),
        text: "How he troubles you"
      },{
        date:  new Date (),
        text: "He kicks me, hit me sometimes throws me out of the house."
      }]
    });

    tempCase.push({
      id: 3,
      title: "My Case 3",
      date: new Date (),
      description: "My husband is very bad 3",
      communication: [{
        date:  new Date (),
        text: "My husband beats me alot, abuses me also.3"
      },{
        date:  new Date (),
        text: "How he troubles you 3"
      },{
        date:  new Date (),
        text: "He kicks me, hit me sometimes throws me out of the house. 3"
      }]
    });

    tempCase.push({
      id: 4,
      title: "My Case 4",
      date: new Date (),
      description: "My husband is very bad 4",
      communication: [{
        date:  new Date (),
        text: "My husband beats me alot, abuses me also.4"
      },{
        date:  new Date (),
        text: "How he troubles you 4"
      },{
        date:  new Date (),
        text: "He kicks me, hit me sometimes throws me out of the house. 4"
      }]
    });

    this.caseDB["admin"] = tempCase;
  }

  getCaseList (): ICase[] {
    let username = this.authService.getLoginUser();
    return this.caseDB[username!];
  }

  getCase(caseIndex: number): ICase  {
    let username = this.authService.getLoginUser();
    return this.caseDB[username!][caseIndex];
  }

  addCaseComm (caseIndex: number,
    comment: string
    ) : ICase  {
      let comm: ICaseCommunication = {
        date:  new Date(),
        text: comment
      };

      let username = this.authService.getLoginUser();
      let eachCase: ICase = this.caseDB[username!][caseIndex];     
      eachCase.communication.push(comm);
      return eachCase;
  }

  addCase (
    title: string,
    description: string
  ) {

    let username = this.authService.getLoginUser();
    let lastIndex = 0;
    if (!this.caseDB[username!]){
      lastIndex = 0 
      this.caseDB[username!] = [];
    } else {
      lastIndex = this.caseDB[username!].length;
    }
    
    let currentDate = new Date();

    let newCase: ICase = {
      id: lastIndex,
      title: title,
      date: currentDate,
      description: description,
      communication: []
    }

    this.caseDB[username!].push (newCase);
    return lastIndex;
  }
}
