import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ResultsService} from "../../services/results.service";
import {Paper} from "../../models/Paper";

import { Location } from '@angular/common';
import {AuthControlService} from "../../services/auth-control.service";
import {MatSnackBar} from "@angular/material/snack-bar";



@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {


  noResTute;
  noResPaper;


  index = 0;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  papersArray: Paper[] = null;
  tutesArray: Paper[] = null;

  blob;

  grade:string;
  constructor(private route: ActivatedRoute,
              private resultService: ResultsService,
              public loc:Location,
              private auth:AuthControlService,
              private snack: MatSnackBar,
              private router:Router) {
  }

  ngOnInit(): void {

    let gradeId = this.route.snapshot.paramMap.get('id');
     this.grade=this.route.snapshot.queryParams.g;
    this.index=parseInt(this.route.snapshot.queryParamMap.get('id'));
    this.getGradedPapers(gradeId);
    this.getGradedTutes(gradeId);

  }

  getGradedPapers(id) {
    this.resultService.getPapers(id).subscribe(res => {
      this.papersArray = res;
      if (this.papersArray.length==0){
        this.noResPaper="No results"
      }
    })
  }

  getGradedTutes(id) {
    this.resultService.getTutes(id).subscribe(res => {
      this.tutesArray = res;
      if (this.tutesArray.length==0){
        this.noResTute="No results"
      }
    })
  }


  onTabChange(event) {
    let index = event.index;
    if (index == 0 && this.papersArray == null) {

    }
  }


  onDownload(path){

    if (this.auth.isLoggedInUser()){
      let fileName=path.split('/',2);
      this.resultService.download(fileName[1]).subscribe(res=>{
        console.log(res);
        this.blob = new Blob([res], {type: 'application/pdf'});

        var downloadURL = window.URL.createObjectURL(res);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = fileName[1];
        link.click();
      })
    }
    else {
      let snackBarRef=this.snack.open('Log in before download','Log in',{
        duration:3000,
        horizontalPosition:"right"
      });

      snackBarRef.onAction().subscribe(() => {
        this.router.navigate(['login'])
      });
    }
  }


  onBack(){
    this.loc.back();
  }

}


