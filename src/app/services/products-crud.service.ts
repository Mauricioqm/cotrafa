import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Producto } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsCrudService {

  baseURL: string = 'http://localhost:3000/productos';

  private _refresh$ = new Subject<void>();

  constructor(private httpClient: HttpClient) { }

  get refresh$ () {
    return this._refresh$;
  }

  createProduct(product: Producto): Observable<any> {
    return this.httpClient.post(this.baseURL, product);
  }

  getProducts(): Observable<any> {
    return this.httpClient.get(this.baseURL)
    .pipe(
      tap(() => {
        // Refresca antes de que el componente reciba la data
        this._refresh$.next();
      })
    );
  }

  getProductByID(id: number): Observable<any> {
    return this.httpClient.get(this.baseURL + '/' + id);
  }

  updateProduct(id: number, product: Producto): Observable<any> {
    return this.httpClient.put(this.baseURL + '/' + id, product);
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(this.baseURL + '/' + id);
  }
}
