import { EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/interfaces/category';
import { BindingService } from 'src/app/services/binding.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  
  constructor
  (
    public cs: CategoryService,
    public bs: BindingService
  ){
  }
  
  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.cs.getCategories().subscribe(data => {
      // console.log(data);
      this. emitirCategorias(data);
    });
  }

  emitirCategorias(categorias: any) {
    this.bs.disparadorDeCategorias.emit({
      data: categorias
    });
  }

}
