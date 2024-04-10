import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerUathComponent } from './seller-uath/seller-uath.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrderComponent } from './my-order/my-order.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'seller-auth',component:SellerUathComponent},
  {path:'seller-home',canActivate:[authGuard] ,component:SellerHomeComponent},
  {component:SellerAddProductComponent,path:'seller-add-product',canActivate:[authGuard]},
  {component:SellerUpdateProductComponent,path:'seller-update-product/:id', canActivate:[authGuard]},

  {component:SearchComponent,path:'search/:qsrc'},
  {component:ProductDetailsComponent, path:'product-details/:productId'},
  {component:UserAuthComponent, path:"user-auth"},
  {component:MyCartComponent, path:'my-cart'},
  {component:CheckoutComponent,path:'checkout'},
  {component:MyOrderComponent,path:'my-order'}

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
