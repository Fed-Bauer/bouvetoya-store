import { ChangeDetectorRef, Component, Injector, NgZone, OnInit } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetails } from '../_bs-model/order-details.model';
import { Product } from '../_bs-model/product.model';
import { ProductService } from '../_bs-services/product.service';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {NgForOf} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-purchase-product',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatLabel,
    NgForOf,
    MatInput,
    MatButton
  ],
  templateUrl: './purchase-product.component.html',
  styleUrl: './purchase-product.component.css'
})

export class PurchaseProductComponent implements OnInit {

  isSingleProductCheckout: string | null = '';
  productDetails: Product[] = [] ;

  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: []
  }

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private injector: Injector) { }

  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");

    this.productDetails.forEach(
      x => this.orderDetails.orderProductQuantityList.push(
        {productId: x.productId, quantity: 1}
      )
    );
    console.log(this.productDetails)
    console.log(this.orderDetails);
  }

  public placeOrder(orderForm: NgForm) {
    this.productService.placeOrder(this.orderDetails, this.isSingleProductCheckout).subscribe(
      (resp) => {
        console.log(resp);
        orderForm.reset();

        const ngZone = this.injector.get(NgZone);
        ngZone.run(
          () => {
            this.router.navigate(["/orderConfirm"]);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getQuantityForProduct({productId}: { productId: any }) {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteredProduct[0].quantity;
  }

  getCalculatedTotal({productId, productDiscountedPrice}: { productId: any, productDiscountedPrice: any }) {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteredProduct[0].quantity * productDiscountedPrice;
  }

  onQuantityChanged({q, productId}: { q: any, productId: any }) {
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity = q;
  }

  getCalculatedGrandTotal() {
    let grandTotal = 0;

    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity) => {
        const price = this.productDetails.filter(product => product.productId === productQuantity.productId)[0].productDiscountedPrice;
        grandTotal = grandTotal + price * productQuantity.quantity;
      }
    );

    return grandTotal;
  }

  processResponse(resp: any, orderForm:NgForm) {
    this.placeOrder(orderForm);
  }
}
