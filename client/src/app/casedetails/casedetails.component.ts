import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnSameUrlNavigation, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { IUser, ICaseComment, ICase } from '../data.model';
import { ActivatedRoute } from '@angular/router'
import { DataService } from '../data.service';

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
    comments: ["", [Validators.required, Validators.minLength(3)]]
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private dataService: DataService,
    private activatedroute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.username = this.authService.getLoginUser() ?? "";

    let case_id = this.activatedroute.snapshot.paramMap.get("index");
    if (case_id) {
      this.dataService.getCase(+case_id).subscribe(
        data => this.caseDetail = data
      );
    }
  }

  addComments() {
    let comments = this.commentForm.controls["comments"].value;
    this.dataService.addComment(this.caseDetail!, comments).subscribe(
      data => this.caseDetail = data
    );
    this.commentForm.reset();
  }

  addPhone() {
    let user = this.authService.getLoginUser();
    let comments = `Added a meeting with Nazneen expert on your phone with number ${user} within one hour today.`;
    this.dataService.addComment(this.caseDetail!, comments).subscribe(
      data => this.caseDetail = data
    );
    this.commentForm.reset();
  }

  addWhatsup() {
    let user = this.authService.getLoginUser();
    let comments = `Added a meeting with Nazneen export on your whatsup number ${user} within one hour today.`;
    this.dataService.addComment(this.caseDetail!, comments).subscribe(
      data => this.caseDetail = data
    );
    this.commentForm.reset();
  }

  addInpersonMeet() {
    let user = this.authService.getLoginUser();
    let comments = `You have requested for in-person meeting with Nazneen expert. Please call on toll free number 1800 800 800 from your registered mobile number ${user} and confirm the meeting venue and time.`;
    this.dataService.addComment(this.caseDetail!, comments).subscribe(
      data => this.caseDetail = data
    );
    this.commentForm.reset();
  }

  doCancel() {
    this.router.navigate([this.dashboarUrl]);
  }
}
