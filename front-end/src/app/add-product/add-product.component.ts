import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {FormsModule, NgForm} from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { FileHandle } from "../_bs-model/file-handle.model";
import { Product } from "../_bs-model/product.model";
import { ProductService } from "../_bs-services/product.service";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FeatureModule} from "../feature.module";
import {MatButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {DragDirective} from "../drag.directive";

@Component({
  selector: "app-add-product",
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    FormsModule,
    MatLabel,
    MatFormField,
    FeatureModule,
    MatButton,
    NgForOf,
    NgIf,
    MatInput,
    DragDirective
  ],
  templateUrl: "./add-product.component.html",
  styleUrl: './add-product.component.css'
})

export class AddProductComponent implements OnInit {
  isNewProduct = true;

  product: Product = {
    productId: 0,
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: [],
  };

  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];

    if(this.product && this.product.productId) {
      this.isNewProduct = false;
    }
  }

  addProduct(productForm: NgForm) {
    const formData = this.prepareFormDataForProduct(this.product);
    console.log('Form Data:', formData);

    this.productService.addProduct(formData).subscribe(
      (response: Product) => {
        console.log('Response:', response);
        productForm.reset();
        this.product.productImages = [];
      },
      (error: HttpErrorResponse) => {
        console.log('Error:', error);
      }
    );
  }

  prepareFormDataForProduct(product: Product): FormData {
    const uploadImageData = new FormData();
    uploadImageData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    for (var i = 0; i < this.product.productImages.length; i++) {
      uploadImageData.append(
        "imageFile",
        this.product.productImages[i].file,
        this.product.productImages[i].file.name
      );
    }
    return uploadImageData;
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ),
      };
      this.product.productImages.push(fileHandle);
    }
  }

  removeImages(i: number) {
    this.product.productImages.splice(i, 1);
  }

  fileDropped(fileHandle: FileHandle) {
    this.product.productImages.push(fileHandle);
  }
}

