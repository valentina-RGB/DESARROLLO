export interface Producto {
    ID_producto: number;
    nombre: string;
    precio_neto: number;
    ID_estado_producto: number;
    tipo_producto: number;
    categorias: number;
    imagen: File;
}