export interface Producto {
    ID_producto: number;
    nombre: string;
    precio_neto: number;
    estado_producto: string;
    tipo_producto: number;
    categorias: number;
    imagen: File;
}