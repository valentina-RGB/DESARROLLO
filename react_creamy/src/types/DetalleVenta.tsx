import { Cliente } from './clientes';
import { ProductoVenta } from './productoventa';
import { EstadoVenta } from './EstadoVenta';
import { Ventas } from './Ventas';

export interface DetalleVenta extends Ventas {
  cliente: Cliente | null;
  productos: ProductoVenta[];
  estado_venta: EstadoVenta | null;
}