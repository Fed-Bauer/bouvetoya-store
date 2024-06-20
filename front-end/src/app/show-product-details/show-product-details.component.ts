import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from '../image-processing.service';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { Product } from '../_bs-model/product.model';
import { ProductService } from '../_bs-services/product.service';
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-show-product-details',
  standalone: true,
  imports: [
    MatIcon,
    MatHint,
    MatFormField,
    MatTable,
    MatLabel,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatIconButton,
    MatHeaderRow,
    MatRow,
    MatButton,
    MatHeaderRowDef,
    MatRowDef,
    NgIf,
    MatCellDef,
    MatHeaderCellDef,
    MatInput
  ],
  templateUrl: './show-product-details.component.html',
  styleUrl: './show-product-details.component.css'
})

export class ShowProductDetailsComponent implements OnInit {

  showLoadMoreProductButton = false;
  showTable = false;
  pageNumber: number = 0;
  productDetails: Product[] = [];
  displayedColumns: string[] = [
    'Id',
    'Product Name',
    'description',
    'Product Discounted Price',
    'Product Actual Price',
    'Actions'
  ];

  constructor(private productService: ProductService,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  searchByKeyword(searchkeyword: string) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchkeyword);
  }

  public getAllProducts(searchKeyword: string = "") {
    this.showTable = false;
    this.productService.getAllProducts(this.pageNumber, searchKeyword)
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (resp: Product[]) => {
        resp.forEach(product => this.productDetails.push(product));
        console.log('msg', this.productDetails);
        this.showTable = true;
        this.showLoadMoreProductButton = resp.length == 12;
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }

  deleteProduct(productId: number) {
    this.productService.deleteProductDetails(productId).subscribe(
      (resp) => {
        this.getAllProducts();
      },
      (error:HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  showImages(product: Product) {
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages
      },
      height: '500px',
      width: '800px'
    });
  }

  editProductDetails(productId: string) {
    this.router.navigate(['/addProduct', {productId: productId}]);
  }
}

