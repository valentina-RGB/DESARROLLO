export interface Ventas {
    ID_venta: number;
    fecha: string;
    ID_cliente: number | null;
    precio_total: number;
    ID_estado_venta: number;
  }
  
  export interface DetalleVenta extends Ventas {
    // Aquí puedes añadir detalles adicionales si los hay
  }