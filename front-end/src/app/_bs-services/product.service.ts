import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetails } from '../_bs-model/order-details.model';
import { GetMyOrderDetails } from '../_bs-model/order.model';
import { Product } from '../_bs-model/product.model';
import { environment } from '../environments/environment';
import {UserAuthService} from "./user-auth.service";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private tokenService: TokenService
    ) {}

  public markAsDelivered(orderId: string): Observable<Product> {
    return this.tokenService.post<Product>(`/markOrderAsDelivered/${orderId}`, {});
    //return this.httpClient.get(`${this.apiUrl}/markOrderAsDelivered/${orderId}`);
  }

  public getAllOrderDetailsForAdmin(status: string): Observable<GetMyOrderDetails[]> {
    return this.tokenService.get<GetMyOrderDetails[]>(`/getAllOrderDetails/${status}`);
    //return this.httpClient.get<GetMyOrderDetails[]>(`${this.apiUrl}/getAllOrderDetails/${status}`);
  }

  public getMyOrders(): Observable<GetMyOrderDetails[]> {
    return this.tokenService.get<GetMyOrderDetails[]>(`/getOrderDetails`);
    //return this.httpClient.get<GetMyOrderDetails[]>(`${this.apiUrl}/getOrderDetails`);
  }

  public deleteCartItem(cartId: string): Observable<void> {
    return this.tokenService.delete<void>(`/deleteCartItem/${cartId}`);
    //return this.httpClient.delete(`${this.apiUrl}/deleteCartItem/${cartId}`);
  }

  public addProduct(product: FormData): Observable<Product> {
    console.log('Product Service: addProduct()');
    return this.tokenService.post<Product>('/addProduct', product);
    //return this.httpClient.post<Product>(`${this.apiUrl}/addProduct`, product);
  }

  public getCartDetails(): Observable<any> {
    return this.tokenService.get<any>(`/getCartDetails`);
    //return this.httpClient.get(`${this.apiUrl}/getCartDetails`);
  }

  public getAllProducts(pageNumber: number, searchKeyword = ""): Observable<Product[]> {
    return this.tokenService.get<Product[]>(`/getAllProducts?pageNumber=${pageNumber}&searchKey=${searchKeyword}`);
    //return this.httpClient.get<Product[]>(`${this.apiUrl}/getAllProducts?pageNumber=${pageNumber}&searchKey=${searchKeyword}`);
  }

  public getProductDetailsById(productId: string): Observable<Product> {
    return this.tokenService.get<Product>(`/getProductDetailsById/${productId}`);
    //return this.httpClient.get<Product>(`${this.apiUrl}/getProductDetailsById/${productId}`);
  }

  public deleteProductDetails(productId: number): Observable<void> {
    return this.tokenService.delete<void>(`/deleteProductDetails/${productId}`);
    //return this.httpClient.delete(`${this.apiUrl}/deleteProductDetails/${productId}`);
  }

  public getProductDetails(isSingleProductCheckout: string | null, productId: any): Observable<Product[]> {
    return this.tokenService.get<Product[]>(`/getProductDetails/${isSingleProductCheckout}/${productId}`);
    //return this.httpClient.get<Product[]>(`${this.apiUrl}/getProductDetails/${isSingleProductCheckout}/${productId}`);
  }

  public placeOrder(orderDetails: OrderDetails, isCartCheckout: any): Observable<any> {
    return this.tokenService.post<any>(`/placeOrder/${isCartCheckout}`, orderDetails);
    //return this.httpClient.post(`${this.apiUrl}/placeOrder/${isCartCheckout}`, orderDetails);
  }

  public addToCart(productId: string): Observable<any> {
    return this.tokenService.get<any>(`/addToCart/${productId}`);
    //return this.httpClient.get(`${this.apiUrl}/addToCart/${productId}`);
  }
}

