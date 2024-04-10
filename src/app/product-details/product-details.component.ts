import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product, cart } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productData: undefined | Product;

  productQuntity:number=1;

  removeCart=false;   //used for visible remove to cart button on details page

  cartData:Product|undefined;

  constructor(private RuteObj:ActivatedRoute, private productservieObj : ProductService){}

  ngOnInit(): void {
    let productId= this.RuteObj.snapshot.paramMap.get('productId');
    //console.log("Product Id :"+productId);
    productId && this.productservieObj.getProduct(productId).subscribe((data)=>{
      //console.warn(data);

      this.productData=data;

      let cardData=localStorage.getItem('localCart');
      if(productId && cardData)
      {
        let items=JSON.parse(cardData);
        items=items.filter((item:Product) => productId==item.id.toString());
        if(items.length)
        {
          this.removeCart=true;
        }
        else
        {
          this.removeCart=false;
        }
      }

      let user=localStorage.getItem('user');   // For after login addtoCart
      

      if(user)
      {
        let userId=user && JSON.parse(user).id;

        this.productservieObj.getCartList(userId);

        this.productservieObj.cardData.subscribe((result)=>{
        let item =  result.filter((item:Product)=>productId?.toString()===item.productId?.toString());

        if(item.length)
        {
          this.cartData=item[0];
          this.removeCart=true;
        }
        })
      

      }
    


    })

  }

  handleQuntity(value:string)
  {
    if(this.productQuntity <20 && value==='plus')
    {
      this.productQuntity+=1;
    }
    else if(this.productQuntity > 1  && value==='min')
    {
      this.productQuntity-=1;
    }
  }



  addToCart()
  {
    if(this.productData)
    {
      this.productData.quantity=this.productQuntity;
    //console.log('In add to cart--------'+localStorage.getItem('user'))
      if(!localStorage.getItem('user'))
      {
        //console.log('If');
           //console.log(this.productData.quantity); 
           this.productservieObj.localAddToCart(this.productData);
           this.removeCart=true;
      }
      else
      {
        console.log('User is logged in');
        //console.log(localStorage.getItem('user'));

        let user=localStorage.getItem('user');
        let userId=user && JSON.parse(user).id;
       // console.log(userId);
        let cartData:cart ={
          ...this.productData,
          userId,
          productId:this.productData.id
        }

        delete cartData.id;
       // console.warn("KOKOKO"+cartData);


        this.productservieObj.addToCart(cartData).subscribe((result)=>{
          if(result)
          {
            alert("Product is added");
           // console.log(result);

           this.productservieObj.getCartList(userId);
           this.removeCart=true;

          }
        })

      }
    }
  }



  removeToCart(productId:number)
  {
   // console.log(productId);

      if(!localStorage.getItem('user'))
      {
        this.productservieObj.removeItemFromCart(productId);
        
      }
      else
      {

        let user=localStorage.getItem('user');
        let userId=user && JSON.parse(user).id;

       //console.log(this.cartData);
       this.cartData && this.productservieObj.removeToCart(this.cartData.id)
       .subscribe((result)=>{
        if(result)
        {
          this.productservieObj.getCartList(userId);
        }
       })
      }
      this.removeCart=false;


   }

   

}
