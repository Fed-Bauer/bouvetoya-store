import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from './image-processing.service';
import { Product } from './_bs-model/product.model';
import { ProductService } from './_bs-services/product.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseProductResolverService implements Resolve<Product[]>{

  // let isSingleProductCheckout = false;

  constructor(private productServcice: ProductService,
    private imageProcessingService: ImageProcessingService) {

    }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {

    const id = route.paramMap.get("id");
    const isSingleProductCheckout = route.paramMap.get("isSingleProductCheckout");
    return this.productServcice.getProductDetails(isSingleProductCheckout, id)
      .pipe(
        map(
          (x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product))
        )
      );
  }
}
