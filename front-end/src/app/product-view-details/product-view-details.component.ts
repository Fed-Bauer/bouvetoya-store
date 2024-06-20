import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_bs-model/product.model';
import { ProductService } from '../_bs-services/product.service';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-product-view-details',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatButton,
    NgForOf
  ],
  templateUrl: './product-view-details.component.html',
  styleUrl: './product-view-details.component.css'
})

export class ProductViewDetailsComponent implements OnInit {

  selectedProductIndex = 0;
  product: Product;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService) {
    this.product = {} as Product
  }

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product)
  }

  addToCart(productId: any) {
    this.productService.addToCart(productId).subscribe(
      (response) => {
        console.log(response);
      }, (error)=> {
        console.log(error);
      }
    );
  }

  changeIndex(index: any) {
    this.selectedProductIndex = index;
  }

  purchaseProduct(productId: any ) {
    this.router.navigate(['/purchaseProduct', {
      isSingleProductCheckout: true, id: productId
    }]);
  }
}

