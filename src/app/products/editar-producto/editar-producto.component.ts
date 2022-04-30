import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsCrudService } from 'src/app/services/products-crud.service';
import { BindingService } from 'src/app/services/binding.service';
import { Producto } from 'src/app/interfaces/product';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss']
})
export class EditarProductoComponent implements OnInit {

  formEditarProducto: FormGroup;
  categorias: any[] = [];
  titulo = '';
  id: any;

  constructor
  (
    private aRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    public pcs: ProductsCrudService,
    public bs: BindingService
  )
  {
    this.id = this.aRouter.snapshot.paramMap.get('id');

    this.formEditarProducto = formBuilder.group({
      id: [
        '',
        Validators.compose([
          Validators.maxLength(5),
          Validators.pattern('[0-9]*'),
          Validators.required,
        ]),
      ],

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

      idCategoria: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],
    });
  }

  ngOnInit(): void {
    this.editar();

    this.bs.disparadorDeCategorias.subscribe(data => {
      // console.log(data);     
      this.categorias = data.data;
    })
  }

  editar(){
    if (this.id !== null) {
      this.titulo = 'Editar empleado';
      this.pcs.getProductByID(this.id).subscribe(data => {
        // console.log(data);
        this.titulo = data.producto
        
        this.formEditarProducto.setValue({
          id: data.id,
          producto: data.producto,
          codigo: data.codigo,
          estado: data.estado,
          descripcion: data.descripcion,
          precio: data.precio,
          idCategoria: data.idCategoria,
        })
      })
    }
  
  }

  updateProduct(){
    const Producto: Producto = {
      producto: this.formEditarProducto.get('producto')?.value,
      codigo: this.formEditarProducto.get('codigo')?.value,
      estado: this.formEditarProducto.get('estado')?.value,
      descripcion: this.formEditarProducto.get('descripcion')?.value,
      precio: this.formEditarProducto.get('precio')?.value,
      idCategoria: this.formEditarProducto.get('idCategoria')?.value,
    }

    this.pcs.updateProduct(this.id, Producto).subscribe(data => {
      console.log(data);
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.formEditarProducto.reset();
    })
  }

}
