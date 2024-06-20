import {Component, NgIterable, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {ProductService} from "../_bs-services/product.service";
import {ImageProcessingService} from "../image-processing.service";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import {Product} from "../_bs-model/product.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [
    MatHint,
    MatGridList,
    MatGridTile,
    MatFormField,
    MatLabel,
    MatButton,
    NgForOf,
    MatInput,
    NgIf
  ],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css'
})
export class SaleComponent implements OnInit {

  pageNumber: number = 0;
  productDetails: any = [];
  showLoadButton = false;

  constructor(private productService: ProductService,
              private imageProcessingService: ImageProcessingService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(searchKey: string = "") {
    this.productService.getAllProducts(this.pageNumber, searchKey)
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
      .subscribe(
        (resp: Product[]) => {
          console.log(resp);
          this.showLoadButton = resp.length == 12;
          // @ts-ignore
          resp.forEach(p => this.productDetails.push(p));
        }, (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  showProductDetails({productId}: { productId: any }) {
    this.router.navigate(['/productViewDetails', {productId: productId}]);
  }
}
