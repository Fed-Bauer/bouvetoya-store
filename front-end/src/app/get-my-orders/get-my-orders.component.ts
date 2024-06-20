import { Component, OnInit } from '@angular/core';
import { GetMyOrderDetails } from '../_bs-model/order.model';
import { ProductService } from '../_bs-services/product.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";

@Component({
  selector: 'app-get-my-orders',
  standalone: true,
  imports: [
    MatTable,
    MatCell,
    MatHeaderCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef
  ],
  templateUrl: './get-my-orders.component.html',
  styleUrl: './get-my-orders.component.css'
})

export class GetMyOrdersComponent implements OnInit {

  displayedColumns = ["Name", "Address", "Contact No.", "Amount", "Status"];

  getMyOrderDetails: GetMyOrderDetails[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.productService.getMyOrders().subscribe(
      (resp: GetMyOrderDetails[]) => {
        console.log(resp);
        this.getMyOrderDetails = resp;
      }, (err)=> {
        console.log(err);
      }
    );
  }

}
