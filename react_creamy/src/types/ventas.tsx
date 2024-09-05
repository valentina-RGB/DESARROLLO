

export interface Ventas {
  Cliente: any;
  ID_venta: number;
  fecha: string;
  ID_cliente: number | null;
  precio_total: number;
  ID_estado_venta: number;
}