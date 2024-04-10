import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


 popularProducts: undefined | Product[];

 trendyProduct:undefined | Product[];

  constructor(private productServiceObj: ProductService){}



  ngOnInit(): void {
    this.productServiceObj.popularProduct().subscribe((data)=>{
     // console.warn(data);
     
      this.popularProducts=data;

    })


    this.productServiceObj.trendyProducts().subscribe((result)=>{
      this.trendyProduct=result;
      console.warn(result);
      //console.log(this.trendyProduct);
    })
  }
}
