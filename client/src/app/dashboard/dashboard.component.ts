import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, ICaseCommunication, ICase, DataService } from '../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  caseList: ICase[] = [];
  caseDetailUrl = "casedetail";

  constructor (private router:Router,
    private dataService: DataService) {}
      
  ngOnInit(): void {
    this.caseList = this.dataService.getCaseList();
  }

  onDetail(elemIndex: number) {
    this.router.navigate([this.caseDetailUrl, elemIndex]);
  }
}
