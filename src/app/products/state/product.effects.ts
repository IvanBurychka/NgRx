import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as productAction from '../state/product.action';
import { mergeMap, map } from 'rxjs/operators';
import { Product } from '../product';

@Injectable()
export class ProductEffects {

    constructor(private action$: Actions,
                private productService: ProductService) {}

    @Effect()
    loadProducts$ = this.action$.pipe(
        ofType(productAction.ProductActionTypes.Load),
        mergeMap((action: productAction.Load) => this.productService.getProducts().pipe(
            map((products: Product[]) => (new productAction.LoadSuccess(products)))
        ))
    );
}
