import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  orderData:order[] |undefined;
constructor(private productServiceObj : ProductService){}

ngOnInit(): void {
 this.getOrderList();
}


cancelOrder(orderId:number | undefined){

  orderId && this.productServiceObj.cancelOrder(orderId).subscribe((result)=>{
    this.getOrderList();
  })

}

getOrderList()
{
  this.productServiceObj.orderList().subscribe((result)=>{
    this.orderData=result;
   // console.log(this.orderData);
  })
}


}
