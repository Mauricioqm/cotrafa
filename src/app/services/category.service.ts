import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseURL: string = 'http://localhost:3000/categorias';

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<any>{
    return this.httpClient.get(this.baseURL);
  }
}
