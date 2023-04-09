import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnSameUrlNavigation, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { IUser, ICaseComment, ICase, DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-casedetails',
  templateUrl: './casedetails.component.html',
  styleUrls: ['./casedetails.component.css']
})
export class CasedetailsComponent implements OnInit {

  caseDetail!: ICase;
  dashboarUrl = "/dashboard";

  currentDate = new Date();
  comment = "";
  username = "";
  commentForm: FormGroup = this.fb.group({
    comments: ["",  [Validators.required, Validators.minLength(3)]]
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private dataService: DataService,
    private activatedroute:ActivatedRoute) {

      this.username = authService.getLoginUser()?? "";

      let caseId = this.activatedroute.snapshot.paramMap.get("index");
      if (caseId) {
        let caseInfo = this.dataService.getCase(+caseId);
        if (caseInfo) {
          this.caseDetail = caseInfo;
        }
      }
  }

  ngOnInit(): void {
  }

  addComments () {
    let comments = this.commentForm.controls["comments"].value;
    this.caseDetail = this.dataService.addCaseComm(this.caseDetail!, comments);
    this.commentForm.reset();
  }
  
  addPhone () {
    let user = this.authService.getLoginUser();
    let comments = `Added a meeting with Nazneen expert on your phone with number ${user} within one hour today.`;
    this.caseDetail = this.dataService.addCaseComm(this.caseDetail, comments);
    this.commentForm.reset();
  }

  addWhatsup() {
    let user = this.authService.getLoginUser();
    let comments = `Added a meeting with Nazneen export on your whatsup number ${user} within one hour today.`;
    this.caseDetail = this.dataService.addCaseComm(this.caseDetail, comments);
    this.commentForm.reset();
  }

  addInpersonMeet() {
    let user = this.authService.getLoginUser();
    let comments = `You have requested for in-person meeting with Nazneen expert. Please call on toll free number 1800 800 800 from your registered mobile number ${user} and confirm the meeting venue and time.`;
    this.caseDetail = this.dataService.addCaseComm(this.caseDetail, comments);
    this.commentForm.reset();
  }
  
  doCancel () {
    this.router.navigate([this.dashboarUrl]);
  }
}
