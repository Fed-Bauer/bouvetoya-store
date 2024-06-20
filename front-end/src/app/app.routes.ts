import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddProductComponent } from "./add-product/add-product.component";
import { AdminComponent } from "./admin/admin.component";
import { PurchaseProductResolverService } from "./purchase-product-resolver.service";
import { PurchaseProductComponent } from "./purchase-product/purchase-product.component";
import { CartComponent } from "./cart/cart.component";
import { ForbiddenComponent } from "./forbidden/forbidden.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { GetMyOrdersComponent } from "./get-my-orders/get-my-orders.component";
import { OrderConfirmationComponent } from "./order-confirmation/order-confirmation.component";
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { ProductResolveService } from "./product-resolve.service";
import { ProductViewDetailsComponent } from "./product-view-details/product-view-details.component";
import { RegisterComponent } from "./register/register.component";
import { ShowProductDetailsComponent } from "./show-product-details/show-product-details.component";
import { UserComponent } from "./user/user.component";
import { AuthGuard } from "./_bs-auth/auth.guard";
import {AboutUsComponent} from "./about-us/about-us.component";
import {HelpingComponent} from "./helping/helping.component";
import {SaleComponent} from "./sale/sale.component";
import {CatalogComponent} from "./catalog/catalog.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] },
  },
  {
    path: "user",
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { roles: ["User"] },
  },
  { path: "login", component: LoginComponent },
  { path: "forbidden", component: ForbiddenComponent },
  {
    path: "addProduct",
    component: AddProductComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] },
    resolve: {
      product: ProductResolveService,
    },
  },
  {
    path: "showProductDetails",
    component: ShowProductDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] },
  },
  {
    path: "orderInformation",
    component: OrderDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] },
  },
  {
    path: "productViewDetails",
    component: ProductViewDetailsComponent,
    resolve: { product: ProductResolveService },
  },
  {
    path: "purchaseProduct",
    component: PurchaseProductComponent,
    canActivate: [AuthGuard],
    data: { roles: ["User"] },
    resolve: {
      productDetails: PurchaseProductResolverService,
    },
  },
  {
    path: "cart",
    component: CartComponent,
    canActivate: [AuthGuard],
    data: { roles: ["User"] }
  },
  {
    path:"orderConfirm",
    component: OrderConfirmationComponent,
    canActivate: [AuthGuard],
    data: { roles: ["User"] }
  },
  {
    path:"getMyOrders",
    component: GetMyOrdersComponent,
    canActivate: [AuthGuard],
    data: { roles: ["User"] }
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "about-us",
    component: AboutUsComponent
  },
  {
    path: "helping",
    component: HelpingComponent
  },
  {
    path: "sale",
    component: SaleComponent
  },
  {
    path: "catalog",
    component: CatalogComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
