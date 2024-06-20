import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../_bs-services/product.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatTable
} from "@angular/material/table";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatButton,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'Description', 'Price', 'Discounted Price', 'Action'];
  cartDetails: any[] = [];

  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCartDetails();
  }

  delete(cartId: string) {
    console.log(cartId);
    this.productService.deleteCartItem(cartId).subscribe(
      (resp) => {
        console.log(resp);
        this.getCartDetails();
      }, (err) => {
        console.log(err);
      }
    );
  }

  getCartDetails() {
    // @ts-ignore
    this.productService.getCartDetails().subscribe(
      (response: Object) => {
        console.log(response);
        this.cartDetails = response as any[];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  checkout() {
    this.router.navigate(['/purchaseProduct', {
      isSingleProductCheckout: false, id: 0
    }]);
  }
}
