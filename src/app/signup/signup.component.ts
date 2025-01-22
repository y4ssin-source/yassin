import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class signupComponent implements OnInit {
   public signupForm !:FormGroup
   constructor(private formbuilder: FormBuilder,private http :HttpClient,private router:Router){}

ngOnInit(): void {
    this.signupForm=this.formbuilder.group({
      fullname:[''],
      mobile:[''],
      email:[''],
      password:['']
   
    })
  } 
 signUp(){
  this.http.post<any>("http://localhost:3000/signupusers",this.signupForm.value)
.subscribe(res=>{
  alert("Signup successfull");
  this.signupForm.reset();
  this.router.navigate(['login']);
},err=>{
  alert("something went wrong")

})
 }
}
