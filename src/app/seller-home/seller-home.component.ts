import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../data-type';
import { faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  productList:undefined | Product[];

  productMessage:string='';

  deleteIcon=faTrashCan;
  editIcon=faEdit;

  constructor(private productServiceObj: ProductService){}

  getAllData()
  {
    this.productServiceObj.productList().subscribe((result)=>{
      //console.warn(result);
      this.productList=result;
      //console.log(this.productList);
    })
  }

ngOnInit(): void {

  this.getAllData();
  
}

deleteProduct(id:number)
{
    //console.log(id);
    this.productServiceObj.productDelete(id).subscribe((result)=>{
     if(result)
     {
     // console.log("deleted");
     this.productMessage="Successfully deleted....";
     }
    setTimeout(()=>(this.productMessage=''),3000);
     
    this.getAllData();

    })
}

}
