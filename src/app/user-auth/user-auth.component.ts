import { Component, EventEmitter, OnInit } from '@angular/core';
import { Login, Product, cart, signUp } from '../data-type';
import { UserService } from '../user.service';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

isUserLogin:boolean=false;
//invalidUserAuth =new EventEmitter<boolean>(false);
invalidUserAuth:boolean=false
authError:string="";
data:boolean=false
userAuth:any;
constructor(private userServiceObj : UserService , private productServiceObj : ProductService,private routerObj:Router){}

  ngOnInit(): void {
    this.userServiceObj.userReload();
  }


  signupUser(value:signUp)
  {
    //console.warn(value);
    this.userServiceObj.userSingup(value);
  }


  loginUser(value:Login) 
  {
   // console.log( "check on button"+value);
   this.userServiceObj.userLogin(value).subscribe((result)=>{
      this.userAuth=result

      //console.log(this.userAuth);
      //this.invalidUserAuth=false;
   
   if( this.userAuth &&  this.userAuth.body?.length)
    {
      //console.log("all okk");
      //console.log(this.userAuth);
      //this.invalidUserAuth.emit(false);
      this.invalidUserAuth=false
      //console.log('-----in userLogin::'+this.userAuth.body[0])
     localStorage.setItem('user',JSON.stringify(this.userAuth.body[0]));

     //console.log("check user");
    // console.log(localStorage.getItem('user'));

     this.routerObj.navigate(['/']);
     
    }
    else
    {
        //this.invalidUserAuth.emit(true);
        this.invalidUserAuth=true
    }
    
   if(this.invalidUserAuth)
   {
   // console.log("OLLL0"+data);
     this.authError="Please Enter valid email and Password";
   }
   else
   {
    //console.log("check in user auth after login ");
   // console.log(localStorage.getItem('user'));
    this.localCartToRemoteCart();
   }

  })
   
  }


  openLogin()
  {
    this.isUserLogin=true;
  }

  openSignup()
  {
    this.isUserLogin=false;
  }

  localCartToRemoteCart()
  {
   //console.log("checkUser in :");
   // console.log('---------------'+localStorage.getItem('user'));
      let data= localStorage.getItem('localCart');
      //console.log("local to remote");
      //console.log(localStorage.getItem('localCart'));
      //console.log(data);

      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      if(data)
      {
        let cartDataList:Product[]= JSON.parse(data);
       
       // console.log("User Id =");
       //console.log(user);

        cartDataList.forEach((product : Product, index)=>{

          let cartData:cart ={
            ...product,
            productId:product.id,
            userId
          };

          delete cartData.id;

          setTimeout(()=>{
            this.productServiceObj.addToCart(cartData).subscribe((data)=>{
              if(data)
              {
                console.log("Item stored in DB");
              }
            })

              if(cartDataList.length === index+1)
              {
                localStorage.removeItem('localCart');
              }


          },1000);

        })
      }



      setTimeout(() => {
        this.productServiceObj.getCartList(userId);
      }, 2000);

  }


}
