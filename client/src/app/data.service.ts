import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { TestData } from './data.test';
import { EnumCommentStatus, ICase, ICaseComment } from './data.model';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  caseListUrl = 'http://localhost:8000/caselist'; //:username
  caseDetailUrl = 'http://localhost:8000/casedetail'; ///:caseId
  addCaseUrl = 'http://localhost:8000/addcase';
  addCommentUrl = 'http://localhost:8000/addcomment';

  caseDB:TestData = new TestData();
  constructor(private httpClient: HttpClient,
    private authService: AuthService,) { 
  }

  getCaseList (): Observable <ICase[]> {
    let username = this.authService.getLoginUser();
    return this.httpClient.get<ICase[]>(this.caseListUrl + `/${username}`);
  }

  getCase(caseId: number): Observable <ICase>  {
    let username = this.authService.getLoginUser();
    return this.httpClient.get<ICase>(this.caseDetailUrl + `/${caseId}`);
  }

  addComment (caseInfo: ICase,
    commentText: string
    ) : Observable <ICase>  {

      let username = this.authService.getLoginUser();
      let comment: ICaseComment = {
        id: 0,
        caseId: caseInfo.id,
        username: username!,
        date:  new Date(),
        text: commentText
      };

      return this.httpClient.post<ICase>(this.addCommentUrl, comment);
  }

  addCase (
    title: string,
    description: string
  ): Observable <ICase> {

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
    return this.httpClient.post<ICase>(this.addCaseUrl, newCase);
  }
}
