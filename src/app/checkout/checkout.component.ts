import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { cart, order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

totalPrice:number|undefined;

cartData:cart[] |undefined;

orderMsg:string |undefined;

constructor(private productServiceObj : ProductService, private routeObj:Router){}

ngOnInit(): void {
  
  this.productServiceObj.currentCart().subscribe((result)=>{
  
    this.cartData=result;
    let price=0;
    result.forEach((item)=>{
      if(item.quantity)
      { 
      price=price+(+item.price * +item.quantity);//  (+item.price) - convert string to number
      }
    })

    this.totalPrice=price+(price/10)+50-(price/10);
   

   //console.log("Total Price : "+this.totalPrice);
  })


}

  orderNow(data:{email:string, address:string, contact:string})
  {
     // console.log(data);

     let user=localStorage.getItem('user');
     let userId = user && JSON.parse(user).id;

     //console.log(user);

     if(this.totalPrice)
     {
      let orderData:order={
        ...data,
        id:undefined,
       totalPrice:this.totalPrice,
       userId,

      }


      this.cartData?.forEach((item)=>{
       // console.log("Foreach");
       // console.log(item.id);

       setTimeout(() => {
       item.id && this.productServiceObj.deleteCartItems(item.id);
       }, 1000);

       
      })


      this.productServiceObj.orderNow(orderData).subscribe((result)=>{
        
        this.orderMsg="Your order has been placed...";

        setTimeout(() => {
          this.orderMsg=undefined;
          this.routeObj.navigate(['/my-order']);
        }, 3000);

        


      })

     }

     
  }

}
