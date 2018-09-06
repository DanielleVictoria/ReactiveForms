import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Item } from '../models/item.interface';
import { Product } from '../models/product.interface';

export const STOCKINVENTORY_API = 'http://localhost:3000';

@Injectable()
export class StockInventoryService {
    constructor(private httpClient: HttpClient) { }

    getCartItems(): Observable<Item[]> {
        return this.httpClient.get<Item[]>(`${STOCKINVENTORY_API}/cart`).pipe(
            //map((response: Response) => response.json()),
            catchError((error: any) => Observable.throw(error))
        )
    }

    getProducts(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(`${STOCKINVENTORY_API}/products`).pipe(
            // /map((response: Response) => response.json()),
            catchError((error: any) => Observable.throw(error))
        );
    }
}