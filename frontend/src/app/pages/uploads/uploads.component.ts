import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Grade} from "../../models/Grade";
import {Subject} from "../../models/Subject";
import {UploadControlService} from "../../services/upload-control.service";
import bsCustomFileInput from 'bs-custom-file-input'
import {AbstractControl, FormControl, FormGroup, NgForm, Validator, ValidatorFn, Validators} from "@angular/forms";
import {AuthControlService} from "../../services/auth-control.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit {


  displayedColumns: string[] = ['title', 'grade', 'created_at','id'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(NgForm,{static: true}) form:NgForm;

  gradesArray: Grade[] = [];
  subjectArray: Subject[] = [];

  id;

  selectedSubjects: number;
  isPaper: boolean;
  fileData: File;
  selectedGrades: number;
  title: string;
  description: string;

  uploadForm:FormGroup;

  constructor(private uploadService: UploadControlService, private auth: AuthControlService) {

  }

  ngOnInit() {

    this.uploadForm=new FormGroup({
      title:new FormControl(),
      des:new FormControl(),
      grade:new FormControl(),
      sub:new FormControl(),
      file:new FormControl(),
      isTute:new FormControl(),
    });
     this.id = this.auth.getUser().id;

    bsCustomFileInput.init();
    this.uploadService.getSubjects(this.id).subscribe(res => {
      console.log(res);
      this.subjectArray = res;
    });

    this.uploadService.getGrades(this.id).subscribe((res: Grade[]) => {
      this.gradesArray = res;
    });

    this.getPapers()


  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onChangeFile(event) {
    this.fileData = event.srcElement.files[0];
    console.log(this.fileData);
  }

  radioChangeSub(event) {
    console.log(event);

    this.selectedSubjects = event;
  }


  radioChangeGrade(event) {
    // console.log(event);
    this.selectedGrades = event;
  }

  radioChange(event) {
    this.isPaper = event;
  }

  onSubmit() {
    const formdata = new FormData();
    formdata.append('title', this.title);
    formdata.append('description', this.description);
    formdata.append('isPaper', this.isPaper.toString());
    formdata.append('file', this.fileData);
    formdata.append('grade', this.selectedGrades.toString());
    formdata.append('subject', this.selectedSubjects.toString());
    formdata.append('user_id', this.auth.getUser().id.toString());
    this.uploadService.upload(formdata).subscribe(res => {
      console.log(res);
      this.getPapers();
      bsCustomFileInput.destroy();
      this.uploadForm.reset();
      bsCustomFileInput.init();

    })


  }

  getPapers(){
    this.uploadService.getAllPapers(this.id).subscribe(res=>{
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onDelete(id){
    this.uploadService.deletePaper(id).subscribe(res=>{
      this.getPapers();


    })
  }
  onUpdate(id){
    alert(id)
  }

}
