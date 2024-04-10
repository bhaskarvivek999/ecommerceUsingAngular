import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Login, signUp } from './data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  
  isSellerLogedIn:boolean=true;


 
 isLoginError:boolean=false;

  constructor(private httpClientObj: HttpClient, private routerObj:Router ) { }

  userSignUp(data:signUp) // signup interface in data-type login
  {
    this.httpClientObj.post('http://localhost:3000/seller', data,{observe:"response"}, )
   .subscribe((result)=>{
  
   
    
    //this.isSellerLogedIn.next(true);
    this.isSellerLogedIn=true;
    localStorage.setItem('seller',JSON.stringify(result.body));
    console.log("OKKKK");
    console.log(result.body);
    this.routerObj.navigate(['seller-home']);
   })
   
  }

  reloadSeller(){
    if(localStorage.getItem('seller'))
    {
     
      this.isSellerLogedIn=true;
      this.routerObj.navigate(['seller-home']);
    }
  }

 
  userLogin(data:Login)  // login interface in data-type
  {
    //console.warn(data);

    // api call code will be there
    this.httpClientObj.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    {observe:"response"},).subscribe((result:any)=>{
      /* 
      {observe:"response"} - Access full http responce include status code, headers,body...
      
      inside result 
         body
         headers
        status
        statusText

      */

     //console.log("Check login result parameters..."); 
    //console.warn(result);
    if(result && result.body && result.body.length)  // length define number recored found...
    {
     // console.warn("User Logged in");

     localStorage.setItem('seller',JSON.stringify(result.body));
    this.routerObj.navigate(['seller-home']);

    }
    else
    {
     // console.log("LogIn Failed...");
      this.isLoginError=true;
    }

    })

  }
  

}
