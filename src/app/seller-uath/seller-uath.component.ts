import { Component, OnInit } from '@angular/core';
import { SellerService } from '../seller.service';
import { signUp } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-uath',
  templateUrl: './seller-uath.component.html',
  styleUrls: ['./seller-uath.component.css']
})
export class SellerUathComponent implements OnInit {
  
  constructor(private sellerserviecObj : SellerService, private routerObj:Router){}

  showLogin=false;

  isError:boolean=false;

  authError:string='';

  ngOnInit(): void {

    this.sellerserviecObj.reloadSeller();
    
  }

  signUp(data:signUp):void
  {
   
      this.sellerserviecObj.userSignUp(data);
  }



  Login(data:signUp):void
  {
    // console.warn(data);
    this.authError="";
    this.sellerserviecObj.userLogin(data);

    this.isError=this.sellerserviecObj.isLoginError;

      if(this.isError)
      {
        this.authError='Email or Password not correct...';
      }

    
  }
 


  openLogin()
  {
    this.showLogin=true;
  }

  openSingup()
  {
    this.showLogin=false;
  }

}
