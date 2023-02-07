import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';


@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {

  username:string = '';

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    passWord: new FormControl('', Validators.required)
  })

  // redirects:string = '';
  loginerrorMesg:boolean = false;

  
  constructor(private router:Router,private logindata: DataService) { }

  loginList:any;

  getloginCredts(){
    this.logindata.loginCredts().subscribe(data => {
      this.loginList = data;
      //console.log(data)
    })
  }

  

  loginSubmit(){
    
    this.loginList.forEach((e: any) => {
      if(this.loginForm.value.userName == e.username && this.loginForm.value.passWord == e.password){
        this.logindata.menuList = e.account;
         this.router.navigateByUrl(`/${e.account}/dashboard`); 
         this.loginerrorMesg = false;
        sessionStorage.setItem("user", e.account)
       // localStorage.setItem("user", e.account)
        }else{
          this.loginerrorMesg = true;
        }
    });
    
    // if(this.loginForm.value.userName == "vkandregula" && this.loginForm.value.passWord == "Mss@2k19"){
    //  this.router.navigateByUrl('/home'); 
    //  this.loginerrorMesg = false;
    // }else{
    //   this.loginerrorMesg = true;
    // }
    // console.log(this.loginForm.value.userName, this.loginForm.value.passWord)
 }

  ngOnInit(){
    this.getloginCredts()
  }

}
