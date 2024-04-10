import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  
  cartData:cart[] | undefined;
  priceSummary:priceSummary={
    price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0
}

  constructor(private productServiceObj : ProductService, private routerObj:Router){}

  ngOnInit(): void {
    this.loadCartInfo();
  }

  


  removeToCart(cartId :number |undefined)
  {
    

   //console.log(this.cartData);
   cartId && this.cartData && this.productServiceObj.removeToCart(cartId)
   .subscribe((result)=>{
    if(result)
    {
       this.loadCartInfo();
    }
   })
  }


  loadCartInfo()
  {
    this.productServiceObj.currentCart().subscribe((result)=>{
      this.cartData=result;
      let price=0;
      result.forEach((item)=>{
        if(item.quantity)
        { 
        price=price+(+item.price * +item.quantity);//  (+item.price) - convert string to number
        }
      })

     // console.log("Price : "+price);
     this.priceSummary.price=price;
     this.priceSummary.discount=price/10;
     this.priceSummary.tax=price/10;
     this.priceSummary.delivery=50;

     this.priceSummary.total=price+(price/10)+50-(price/10);
    // console.log(this.priceSummary);

    if(!this.cartData.length)
    {
      this.routerObj.navigate(['/']);
    }

    })
  }


  checkout()
  {
    this.routerObj.navigate(['/checkout']);
  }

}
