import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos/productos.component';
import { CategoryComponent } from './category/category.component';
// Formularios reactivos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Paginación
import { NgxPaginationModule } from 'ngx-pagination';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';




@NgModule({
  declarations: [
    CategoryComponent,
    HeaderComponent,
    ProductosComponent,
    EditarProductoComponent,
  ],
  exports: [
    ProductosComponent,
    CategoryComponent,
    EditarProductoComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule,
    
  ]
})
export class ProductsModule { }
