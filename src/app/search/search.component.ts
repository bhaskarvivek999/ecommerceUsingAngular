import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchResult:undefined | Product[];

  constructor(private ActiveRouteObj: ActivatedRoute,private productserviceObj : ProductService){}

  ngOnInit(): void {
    let query= this.ActiveRouteObj.snapshot.paramMap.get('qsrc');
    console.warn(query);
    if(query)
    {

      this.productserviceObj.searchProduct(query).subscribe((result)=>{
        this.searchResult=result;
  
        //console.log(this.searchResult);
      })
      
    }

  }

}
