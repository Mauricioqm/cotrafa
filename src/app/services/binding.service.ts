import { EventEmitter, Output } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BindingService {
  @Output() disparadorDeCategorias: EventEmitter<any> = new EventEmitter();

  constructor() { }
}
