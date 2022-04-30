export interface Producto {
  producto: string;
  codigo: string;
  estado: boolean;
  descripcion: string;
  precio: number;
  idCategoria: category
}

export interface category {
  id: number;
  nombre: string; 
}