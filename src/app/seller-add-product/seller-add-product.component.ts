import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {

  addProductMessage:string|undefined;

  constructor(private productServiceObj : ProductService){}

  addProducts(data:Product)
  {
    //console.warn(data);
    this.productServiceObj.addProduct(data).subscribe((result)=>{
      //console.log(result);

      if(result)
      {
        this.addProductMessage="Product is successfully Added....";

      }
      setTimeout(()=>(this.addProductMessage=undefined),3000);


    })
  }

}
