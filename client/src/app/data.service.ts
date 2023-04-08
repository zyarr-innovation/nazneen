import { Injectable } from '@angular/core';

export interface IUser {
  id: Date;
  name: string;
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

  caseList: ICase[] = [];
  constructor() { 
    
    this.caseList.push({
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

    this.caseList.push({
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

    this.caseList.push({
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

    this.caseList.push({
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
  }

  getCaseList () {
    return this.caseList;
  }

  getCase(index: number) {
    return this.caseList[index];
  }

  addCaseComm (index: number,
    currentDate: Date,
    comment: string
    ) {
      let comm: ICaseCommunication = {
        date:  currentDate,
        text: comment
      };

      let eachCase: ICase = this.caseList[index];      
      eachCase.communication.push(comm);
      return eachCase;
    }
}
