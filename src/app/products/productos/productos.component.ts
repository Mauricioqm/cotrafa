import { Input } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/interfaces/product';
import { BindingService } from 'src/app/services/binding.service';
import { ProductsCrudService } from 'src/app/services/products-crud.service';
import { CategoryComponent } from '../category/category.component';
import { EditarProductoComponent } from '../editar-producto/editar-producto.component';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  providers: [CategoryComponent, EditarProductoComponent]
})
export class ProductosComponent implements OnInit, OnDestroy {

  productos: any[] = [];
  categorias: any[] = [];

  public page!: number;
  pages: number = 1;

  formCrearProducto: FormGroup;

  suscripcion: Subscription | undefined;

  @ViewChild('cerrarForm') cerrarForm: any;

  constructor
    (
      public pcs: ProductsCrudService,
      public formBuilder: FormBuilder,
      public cc: CategoryComponent,
      public up: EditarProductoComponent,
      public bs: BindingService
    ) {
    this.formCrearProducto = formBuilder.group({

      producto: [
        '',
        Validators.compose([
          Validators.pattern('[a-zA-Z ]*'),
          Validators.required,
        ]),
      ],

      codigo: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],

      estado: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],

      descripcion: [
        '',
        Validators.compose([
          Validators.pattern('[a-zA-Z0-9 ]{2,254}'),
          Validators.required,
        ]),
      ],

      precio: [
        '',
        Validators.compose([
          Validators.pattern('^[0-9]+([.][0-9]*)?$'),
          Validators.required,
        ]),
      ],

      categoria: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],
    });
  }

  ngOnInit(): void {
    this.getProducts();

    // Escuchando cambios
    // this.suscripcion = this.pcs.refresh$.subscribe((res: any) => {
    //   this.getProducts();
    // })

    this.bs.disparadorDeCategorias.subscribe(data => {
      // console.log('Recibiendo data: ', data.data);
      this.categorias = data.data;
    })
  }

  ngOnDestroy(): void {
    this.suscripcion?.unsubscribe();
    console.log('observable cerrado');  
  }

  getProducts() {
    this.pcs.getProducts().subscribe(data => {
      console.log(data);
      this.productos = data
    });
  }

  getCategories() {
    this.cc.getCategories();
  }

  getCategoriesUpdate() {
    this.cc.getCategories();
  }

  createProduct() {
    if (this.formCrearProducto.valid) {
      // console.log(this.formCrearProducto.value);
      let producto = {
        producto: this.formCrearProducto.value.producto,
        codigo: this.formCrearProducto.value.codigo,
        estado: this.formCrearProducto.value.estado,
        descripcion: this.formCrearProducto.value.descripcion,
        precio: this.formCrearProducto.value.precio,
        idCategoria: this.formCrearProducto.value.categoria
      }

      this.pcs.createProduct(producto).subscribe(data => {
        // console.log(data);
        // Cambiar metodo
        this.getProducts();
        this.cerrarForm.nativeElement.click();
      })

    } else {
      alert("Por favor llene todos los campos")
    }
  }

  updateProduct(id: number) { }

  deleteProduct(id: number) {
    this.pcs.deleteProduct(id).subscribe(data => {
      // console.log(data);
      // Cambiar metodo
      this.getProducts();
    })
  }

}
