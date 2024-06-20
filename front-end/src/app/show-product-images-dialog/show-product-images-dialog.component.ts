import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FileHandle } from '../_bs-model/file-handle.model';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-show-product-images-dialog',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    NgFor 
  ],
  templateUrl: './show-product-images-dialog.component.html',
  styleUrl: './show-product-images-dialog.component.css'
})
export class ShowProductImagesDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.receiveImages();
  }

  receiveImages() {
    console.log(this.data);
  }

}
