import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { TestData } from './data.test';

export enum EnumCommentStatus {
  new,
  request,
  response,
  close
}
export interface IUser {
  id: number;
  name: string
}
export interface ICaseComment {
  id: number;
  caseId: number;
  date: Date;
  username: string;
  text: string;
}
export interface ICase {
  id: number
  title: string;
  date: Date;
  description: string;
  commentStatus: EnumCommentStatus;
  username: string;
  communication?: ICaseComment[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  caseDB:TestData = new TestData();
  constructor(private authService: AuthService,) { 
  }

  getCaseList (): ICase[] {
    let username = this.authService.getLoginUser();
    return this.caseDB.getCaseList(username!);
  }

  getCase(caseId: number): ICase| null  {
    let username = this.authService.getLoginUser();
    return this.caseDB.getCaseDetail(caseId);
  }

  addCaseComm (caseInfo: ICase,
    commentText: string
    ) : ICase  {

      let username = this.authService.getLoginUser();
      let comment: ICaseComment = {
        id: 0,
        caseId: caseInfo.id,
        username: username!,
        date:  new Date(),
        text: commentText
      };

      let eachCase: ICase = this.caseDB.addComment(username!, caseInfo, comment);     
      return eachCase;
  }

  addCase (
    title: string,
    description: string
  ): ICase {

    let username = this.authService.getLoginUser();
    let currentDate = new Date();

    let newCase: ICase = {
      id: 0,
      title: title,
      date: currentDate,
      description: description,
      commentStatus : EnumCommentStatus.new,
      username: username!,
      communication: []
    }

    let caseInfo = this.caseDB.addCase(username!, newCase);
    return caseInfo;
  }
}
