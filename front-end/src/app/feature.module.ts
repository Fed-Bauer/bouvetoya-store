
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterModule, RouterOutlet} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    RouterOutlet,
    OrderConfirmationComponent,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatButtonToggleModule
  ]
})

export class FeatureModule { }
