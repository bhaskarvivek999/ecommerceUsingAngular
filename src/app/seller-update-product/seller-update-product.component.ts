import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  productData:undefined | Product;

  
  constructor(private routeObj: ActivatedRoute, private productServiceObj: ProductService , private routerObj: Router){}

  updateProductMessage:string='';

  ngOnInit(): void {
    let productId:string | null;
   productId =  this.routeObj.snapshot.paramMap.get('id') ;
    //console.warn(productId);

    this.productServiceObj.getProduct(productId).subscribe((result)=>{
      //console.warn(result);
      this.productData=result;

    })
  }

  updateProducts(product:Product)
  {
      //console.warn(product);
      if(this.productData)
      {
        product.id = this.productData.id;
      }

      //console.warn("OKK"+product.id,product);

      this.productServiceObj.productUpdate(product.id, product).subscribe((result)=>{
        if(result)
        {
         // console.warn("Updated");
         this.updateProductMessage='Product has Updated...';
        }

        setTimeout(() => {
          this.updateProductMessage='';
          this.routerObj.navigate(['seller-home']);
        }, 2000);

      })

     

     
  }
}
