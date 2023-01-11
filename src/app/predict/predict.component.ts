import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css']
})
export class PredictComponent implements OnInit {
  preFormGroup!: FormGroup;
  predict! : any;
  result! : any;
  dynamicStyles = {'background-color': '#4CAF50'}
  hideClass = {'display': 'none'}


  constructor( private http : HttpClient,private router:Router,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.preFormGroup = this.fb.group({
      person_age: this.fb.control(null, [Validators.required, Validators.min(18)]),
      person_income : this.fb.control(null, [Validators.required]),
      person_home_ownership : this.fb.control(null, [Validators.required]),
      loan_intent :this.fb.control(null, [Validators.required]),
      loan_grade :this.fb.control(null, [Validators.required]),
      loan_amnt :this.fb.control(null, [Validators.required]),
      loan_int_rate :this.fb.control(null, [Validators.required]),
      loan_percent_income:this.fb.control(null, [Validators.required]),
      cb_person_default_on_file :this.fb.control(null, [Validators.required]),
      cb_person_cred_hist_length:this.fb.control(null, [Validators.required]),
      loan_status :this.fb.control(null),
      person_emp_length : this.fb.control(null, [Validators.required]),
    });
  }

  handlePredict() {
    //console.log(this.preFormGroup.value);
    //const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    let body = this.preFormGroup.value;
    this.http.post("http://127.0.0.1:7082/predict",body).subscribe({
      next: (data) => {
        this.preFormGroup.reset();
        this.predict = data;
        this.result = 100*this.predict[0][0];
        if(this.result<50){
          this.dynamicStyles = {'background-color': 'red'}
        }else{
          this.dynamicStyles = {'background-color': '#4CAF50'}
        }
        this.hideClass = {'display': 'block'}
        //this.router.navigateByUrl("/admin/products")
      }, error: err => {
        console.log(err);
      }
    });

  }

}
