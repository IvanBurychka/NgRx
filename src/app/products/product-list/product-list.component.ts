import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productAction from '../state/product.action';


@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(private productService: ProductService,
              private store: Store<fromProduct.State>) { }

  ngOnInit(): void {
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   selectedProduct => this.selectedProduct = selectedProduct
    // );

    this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(
      currentProduct => {
        this.selectedProduct = {...currentProduct};
      }
    );


    this.store.dispatch(new productAction.Load());
    this.store.pipe(select(fromProduct.getProducts)).subscribe(products => {
      this.products = products;
    });

    // this.productService.getProducts().subscribe(
    //   (products: Product[]) => this.products = products,
    //   (err: any) => this.errorMessage = err.error
    // );

    // this.store.pipe(select('products')).subscribe(products => {
    //   this.displayCode = products.showProductCode;
    // });

    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(showProductCode => {
      this.displayCode = showProductCode;
    });
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productAction.ToggleProductCode(value));

    // this.store.dispatch({
    //   type: ProductActionTypes.ToggleProductCode,
    //   payload: value
    // });
  }

  newProduct(): void {
    this.store.dispatch(new productAction.InitializeCurrentProduct());
    // this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productAction.SetCurrentProduct(product));

    // this.productService.changeSelectedProduct(product);
  }

}
