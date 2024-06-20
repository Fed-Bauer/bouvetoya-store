import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routes';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {RouterModule, RouterOutlet} from '@angular/router';
import { AuthGuard } from './_bs-auth/auth.guard';
import { AuthInterceptor } from './_bs-auth/auth.interceptor';
import { UserService } from './_bs-services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddProductComponent } from './add-product/add-product.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { DragDirective } from './drag.directive';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ShowProductImagesDialogComponent } from './show-product-images-dialog/show-product-images-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';
import { PurchaseProductComponent } from './purchase-product/purchase-product.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { GetMyOrdersComponent } from './get-my-orders/get-my-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {UserAuthService} from "./_bs-services/user-auth.service";
import {CommonModule} from "@angular/common";
import {AppComponent} from "./app.component";
import {TokenService} from "./_bs-services/token.service";
import {AboutUsComponent} from "./about-us/about-us.component";
import {HelpingComponent} from "./helping/helping.component";
import {SaleComponent} from "./sale/sale.component";
import {CatalogComponent} from "./catalog/catalog.component";

@NgModule({
  declarations: [
  ],
  imports: [
    AppComponent,
    CommonModule,
    RouterOutlet,
    ShowProductDetailsComponent,
    ShowProductImagesDialogComponent,
    ProductViewDetailsComponent,
    PurchaseProductComponent,
    OrderConfirmationComponent,
    RegisterComponent,
    CartComponent,
    GetMyOrdersComponent,
    OrderDetailsComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    AddProductComponent,
    BrowserModule,
    FormsModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonToggleModule,
    DragDirective,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AboutUsComponent,
    HelpingComponent,
    SaleComponent,
    CatalogComponent,
    TokenService
  ],
  providers: [
    AuthGuard,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [
    DragDirective
  ]
})

export class AppModule { }
