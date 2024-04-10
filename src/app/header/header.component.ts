import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ProductService } from '../product.service';
import { Product } from '../data-type';
import {faLocationArrow} from '@fortawesome/free-solid-svg-icons'



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{


  locationLogo=faLocationArrow;

  sellerName:string='';

  userName:string='';

  cartItem=0;

  constructor(private routerObj:Router, private productServiceObj : ProductService){}

  menuType:string='default';  // used for conditions add in html page

  searchResult:undefined | Product[];

ngOnInit(): void {
  
  this.routerObj.events.subscribe((val:any)=>{  //check current path
   // console.warn(value.url);
   if(val.url)
   {
     // if(localStorage.getItem('seller') && val.url.includes('seller'))
      if(localStorage.getItem('seller')  && val.url.includes('seller-home'))
      {
        
      // check value present in localstorage && check go with which paage
      
          //console.warn("in seller Area");          
            let sellerStore=localStorage.getItem('seller');
           //console.log("sller array");
          // console.log(sellerStore);

           let sellerData;
           if(sellerStore && JSON.parse(sellerStore)[0])
            {
             sellerData=sellerStore && JSON.parse(sellerStore)[0];   //For Login  
            }
            else
            {
              sellerData=sellerStore && JSON.parse(sellerStore);  // for signUp
            }

            
            //console.log(sellerData);
           this.sellerName=sellerData.name;
            console.log("Seller Info");
            console.log(this.sellerName);
            this.menuType='seller';  
           
            
      }else  if(localStorage.getItem('user'))
      // check value present in localstorage && check go with which paage
      {
          //console.warn("in user Area");          
            let userStore=localStorage.getItem('user');
            let userData=userStore && JSON.parse(userStore);
            this.userName=userData.name;
            this.menuType='user';   
            
            this.productServiceObj.getCartList(userData.id);
      }

      else
      {
       //console.warn("outside selller");
       this.menuType='default';
      }
   }
  })


  let cartData=localStorage.getItem('localCart');
  if(cartData)
  {
    this.cartItem=JSON.parse(cartData).length;
  }

  this.productServiceObj.cardData.subscribe((items)=>{
    this.cartItem=items.length;
  })

}

logout()
{
  localStorage.removeItem('seller');
  this.routerObj.navigate(['/']);
}


userLogout()
{
  localStorage.removeItem('user');
  this.routerObj.navigate(['/user-auth']);
  this.productServiceObj.cardData.emit([]);
}


searchProduct(query:KeyboardEvent)
{

  console.log("keyup call");
  //console.log(query);
  if(query)
  {
    //console.log(query);


    //query.target - reffers the event object   |  
    // as HTMLInputElement-its typecaste , tell typescript compiler query.target treat as a HTMLInputElement
    const element= query.target as HTMLInputElement;  
    
    //console.warn(element.value);
    this.productServiceObj.searchProduct(element.value).subscribe((data)=>{
      //console.warn(data);
      if(data.length>5)
      {
        data.length=5;
      }
     
      this.searchResult=data;
    })

  }
   
}


hideSearch()
{
  this.searchResult=undefined;
}


submitSearch(value:string)
{
 //console.log(value);
 this.routerObj.navigate([`search/${value}`]);
}

redirectToDetails(id:number)
{
  this.routerObj.navigate(['/product-details/'+id])
}


}
