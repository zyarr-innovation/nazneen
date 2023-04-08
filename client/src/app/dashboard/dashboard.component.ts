import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, ICaseCommunication, ICase, DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  caseList: ICase[] = [];
  caseDetailUrl = "casedetail";

  caseInfo: FormGroup = this.fb.group({
    title: ["",  [Validators.required, Validators.minLength(5)]],
    description: ["",  [Validators.required, Validators.minLength(5)]]
  });
  
  constructor (private router:Router,
    private fb: FormBuilder,
    private dataService: DataService) {

  }
  get thisCaseInfo(){
    return this.caseInfo.controls;
  }

  ngOnInit(): void {
    this.caseList = this.dataService.getCaseList();
  }

  addCase() {
    let title = this.caseInfo.controls["title"].value;
    let description = this.caseInfo.controls["description"].value;
    let lastIndex = this.dataService.addCase(title, description);
    this.router.navigate([this.caseDetailUrl, lastIndex]);
  }

  onDetail(elemIndex: number) {
    this.router.navigate([this.caseDetailUrl, elemIndex]);
  }
}
