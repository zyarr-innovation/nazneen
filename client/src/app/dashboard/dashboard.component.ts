import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, ICaseComment, ICase, EnumCommentStatus } from '../data.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  caseList$: Observable<ICase[]> = of([]);
  caseDetailUrl = "casedetail";

  caseInfo: FormGroup = this.fb.group({
    title: ["", [Validators.required, Validators.minLength(5)]],
    description: ["", [Validators.required, Validators.minLength(5)]]
  });

  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private dataService: DataService) {

  }
  get thisCaseInfo() {
    return this.caseInfo.controls;
  }

  ngOnInit(): void {
    this.caseList$ = this.dataService.getCaseList()
  }
  isAdminUser() {
    return this.authService.getLoginUser() == "admin";
  }

  //[style.background]="someFunction()"
  //[ngStyle]="{'background-color': (eachCase.comment_status == 2) ? '#ffe0cc' : }"
  getBackgroundColor(caseInfo: ICase) {
    let retStatus = "";
    if (caseInfo.comment_status == EnumCommentStatus.request) {
      retStatus = "#ffffcc";
    } else if (caseInfo.comment_status == EnumCommentStatus.response) {
      retStatus = "#ffe0cc";
    }
    return retStatus;
  }

  addCase() {
    let title = this.caseInfo.controls["title"].value;
    let description = this.caseInfo.controls["description"].value;
    this.dataService.addCase(title, description).subscribe(
      data => this.router.navigate([this.caseDetailUrl, data.id])
    )
  }

  onDetail(elemIndex: number) {
    this.router.navigate([this.caseDetailUrl, elemIndex]);
  }
}
