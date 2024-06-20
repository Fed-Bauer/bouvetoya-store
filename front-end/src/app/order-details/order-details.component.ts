import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_bs-services/product.service';
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    MatButtonToggleGroup,
    MatButtonToggle,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    NgIf,
    MatHeaderRow,
    MatRow,
    MatButton,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})

export class OrderDetailsComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Product Name', 'Name', 'Address', 'Contact No.', 'Status', 'Action'];
  dataSource = [];

  status: string = 'All';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin(this.status);
  }

  getAllOrderDetailsForAdmin(statusParameter: string) {
    this.productService.getAllOrderDetailsForAdmin(statusParameter).subscribe(
      (resp) => {
        // @ts-ignore
        this.dataSource = resp;
        console.log(resp);
      }, (error) => {
        console.log(error);
      }
    );
  }

  markAsDelivered(orderId: string) {
    console.log(orderId);
    this.productService.markAsDelivered(orderId).subscribe(
      (response) => {
        this.getAllOrderDetailsForAdmin(this.status);
        console.log(response);
      }, (error) => {
        console.log(error);
      }
    );
  }

}
