import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { CategoryComponent } from './products/category/category.component';
import { EditarProductoComponent } from './products/editar-producto/editar-producto.component';
import { ProductosComponent } from './products/productos/productos.component';

const routes: Routes = [
  {path: '', component: ProductosComponent, canActivate: [AuthGuard]},
  {path: 'categorias', component: CategoryComponent},
  {path: 'editar-producto/:id', component: EditarProductoComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
