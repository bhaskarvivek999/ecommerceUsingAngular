import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Product, cart, order } from './data-type';
import { elementAt } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cardData=new EventEmitter<Product[] | []>();

  constructor(private httpObj:HttpClient ) { }

  addProduct(data:Product)
  {
    //console.log("service Called");
    return this.httpObj.post('http://localhost:3000/products',data);
  }

  productList(){
    return this.httpObj.get<Product[]>('http://localhost:3000/products');
  }

  productDelete(id:number)
  {
    return this.httpObj.delete('http://localhost:3000/products/'+id);
  }

  getProduct(id:any)
  {
    return this.httpObj.get<Product>('http://localhost:3000/products/'+id);
  }

  productUpdate(id:number,Obj:Product)
  {
    console.log("id Ok"+id,Obj);
    //console.warn("update servie  - "+Obj);
    return this.httpObj.put('http://localhost:3000/products/'+id,Obj);
  }

  popularProduct()
  {
    return this.httpObj.get<Product[]>('http://localhost:3000/products?_limit=3');
  }


  trendyProducts(){
    return this.httpObj.get<Product[]>('http://localhost:3000/products?_limit=8');
  }


  searchProduct(query:any)
  {
    return this.httpObj.get<Product[]>(`http://localhost:3000/products?category=${query}`);
  }


localAddToCart(data:Product)
{
  let cartData=[];

  let localCart=localStorage.getItem('localCart');
  if(!localCart)
  {
    localStorage.setItem('localCart',JSON.stringify([data]));
   this.cardData.emit([data]);
   
  }
  else
  {

   // console.log("else part in service");
    cartData=JSON.parse(localCart);
    cartData.push(data);
    localStorage.setItem('localCart',JSON.stringify(cartData));
    this.cardData.emit(cartData);
  }
 
} 


removeItemFromCart(ProductId:number)
{
  let cardData=localStorage.getItem('localCart');
  if(cardData)
  {
    let items:Product[]=JSON.parse(cardData);
    
    items = items.filter((item:Product)=>ProductId!==item.id);
     
    //console.log(items);

    localStorage.setItem('localCart',JSON.stringify(items));
  this.cardData.emit(items);


  }
}


addToCart(cartData :cart)
{
   return this.httpObj.post('http://localhost:3000/cart',cartData);
}

getCartList(userId : number)
{
 return this.httpObj.get<Product[]>('http://localhost:3000/cart?userId='+userId,{observe:'response'})
 .subscribe((result)=>{

  if(result && result.body)
  {
    this.cardData.emit(result.body);
  }


 })
}


removeToCart(cartId:number)
{
  return this.httpObj.delete('http://localhost:3000/cart/'+cartId);
}

currentCart()
{
  let userStore = localStorage.getItem('user');
  let userData = userStore && JSON.parse(userStore);

  return this.httpObj.get<cart[]>('http://localhost:3000/cart?userId='+userData.id);
}


orderNow(data:order)
{
  return this.httpObj.post('http://localhost:3000/orders',data);
}


orderList()
{

  let userStore = localStorage.getItem('user');
  let userData = userStore && JSON.parse(userStore);
  
  return this.httpObj.get<order[]>('http://localhost:3000/orders?userId'+userData.id);
}

deleteCartItems(cartId:number)
{
  return this.httpObj.delete('http://localhost:3000/cart/'+cartId,{observe:'response'}).subscribe((result)=>{
    if(result)
    {
      this.cardData.emit([]);
    }
  })
}

cancelOrder(orderId:number)
{
  return this.httpObj.delete('http://localhost:3000/orders/'+orderId);
}

}
