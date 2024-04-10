import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SellerService } from "./seller.service";

@Injectable({
  providedIn:'root'
})
export class authGuard implements CanActivate{

  constructor(private sellerServiceObj: SellerService){}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if(localStorage.getItem('seller'))
    {
      return true;
    }
    
    return this.sellerServiceObj.isSellerLogedIn;
  }

}