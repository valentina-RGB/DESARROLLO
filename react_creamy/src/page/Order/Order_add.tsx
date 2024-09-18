import React, { useState, useEffect } from 'react'
import { Minus, Plus, Search, ShoppingCart, Trash2, Package } from 'lucide-react'
import api from '../../api/api'
import { toast } from "react-hot-toast";


// const saboresDisponibles = [
//   "Vainilla", "Chocolate", "Fresa", "Menta", "Dulce de Leche",
//   "Pistacho", "Cookies & Cream", "Mango", "Limón", "Café"
// ]

type Insumo_adicion = {
    descripcion_insumo: string,
    ID_tipo_Insumo:number,
    precio: number,
      Adiciones_Insumos: {
          cantidad: number 
    }
}

// type Tipo_Insumo = {
//   ID_tipo_Insumo : number,
//   descripcion_tipo : string
// }

type Adiciones = {
  
    ID_adicion: number,
    cantidad: number,
    total: number,
    Productos_adiciones: {
      cantidad: number
    },
    insumos: Insumo_adicion[]
}


type Insumos = {
    descripcion_insumo: string,
    precio: number,
    Producto_insumos: {
      cantidad: number
    }  
}

type Producto = {
  ID_producto: number;
  nombre: string,
  descripcion: string,
  precio_neto: number,
  estado_productos: string,
  ID_tipo_productos: number | string,
  ID_categorias: null | string,
  imagen: string,
  ID_estado_productos: number | string,
  Producto_Pedidos: {
          cantidad: number,
          precio_neto:number,
          sub_total: number
        },
        Insumos: Insumos[],
        adicion: Adiciones[]
}

type Pedido = {
  fecha: string,
  ID_clientes: number | string,
  precio_total: number,
  ID_estado_pedido: number | string,
  ProductosLista: Producto[]
}
export default function OrderAdd() {
  
  const [productosAgregados, setProductosAgregados] = useState<Producto[]>([])
  const [productoActual, setProductoActual] = useState<string | null>(null)
  const [IDActual, SetIDActual] = useState<number | null>(null)
  
  // const [productosDisponibles, setProductosDisponibles] = useState<Producto[]>([])
  // const [tamaño, setTamaño] = useState<Producto[]>([])
  const [TipoInsumo, setTipoInsumo] =useState<Tipo_Insumo[]>([])
  const [modalAbierto, setModalAbierto] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [cantidadSabores, setCantidadSabores] = useState<{ [key: string]: number }>({});
  const [busqueda, setBusqueda] =useState<Producto[]>([])
  const [insumos, setInsumo] =useState<Insumos[]>([])

  const [saboresSeleccionados, setSaboresSeleccionados] = useState<Insumo_adicion[]>([])
 


    const fetchProductos = async () => {
      const url = `/productos`;
      console.log(url)
      const response = await api.get(url);
      if (response.status === 200) {
          const data:Producto[] = await response.data;
       
          setBusqueda(data);      
      } else {
          console.error('Error al cargar los productos:', response.data);
        }
      };


      const fetchTipoInsumo = async () => {
        const url = `/Insumos?ID_tipo_insumo=2`;
        console.log(url)
        const response = await api.get(url);
        if (response.status === 200) {
            const data:Insumos[] = await response.data;
            const dato = await response.data;



            const datos: Insumo_adicion[] = dato.map((insumo: any) => ({
              descripcion_insumo: insumo.descripcion_insumo,
              precio: insumo.precio,
              ID_tipo_Insumo: insumo.ID_tipo_insumo,  // Valor por defecto
              Adiciones_Insumos: {
                  cantidad: 0
                    // Valor por defecto
              }
          }));
  
            // setTipoInsumo(data);
            setInsumo(data)
            setSaboresSeleccionados(datos)
            console.log(saboresSeleccionados)
  
  
            
            
            
            // setBusqueda(data);      
        } else {
            console.error('Error al cargar los productos:', response.data);
          }
        };




        // const addInput = (adicion: Insumo_adicion) => {
        //   const AdicionExists = saboresSeleccionados.some((input) => input.descripcion_insumo === adicion.descripcion_insumo);
         
        //   if (AdicionExists) {
        //   // updateQuantity(insumo.ID_insumo, 1);
        //   // Mostramos un mensaje toast
        //   toast.success(`La cantidad de ${adicion.descripcion_insumo} ha sido actualizada.`);
        // } else {
         
         
        //   setSaboresSeleccionados([
            
        //     ...saboresSeleccionados,
        //     {  
        //       descripcion_insumo: adicion.descripcion_insumo,
        //       precio: adicion.precio,
        //       ID_tipo_Insumo: adicion.ID_tipo_Insumo,
        //       Adiciones_Insumos: {
        //         cantidad: + 1 
        //       }
        //     }
        //   ]);
          
        //   // Mostramos un mensaje toast
        //   toast.success(`${adicion.descripcion_insumo} ha sido actualizado.`);
        //   return saboresSeleccionados;
        // }
        // };
        




        const addInput = (adicion: Insumo_adicion) => {
          const AdicionExists = saboresSeleccionados.some((input) => input.descripcion_insumo === adicion.descripcion_insumo);
        
          if (AdicionExists) {
            // Actualiza la cantidad de sabores si ya está agregado
            setSaboresSeleccionados(prev => 
              prev.map(input =>
                input.descripcion_insumo === adicion.descripcion_insumo
                  ? { 
                      ...input,
                      Adiciones_Insumos: {
                        cantidad: input.Adiciones_Insumos.cantidad + 1
                      }
                    }
                  : input
              )
            );
            toast.success(`La cantidad de ${adicion.descripcion_insumo} ha sido actualizada.`);
          } else {
            // Agrega un nuevo sabor si no está en la lista
            setSaboresSeleccionados([
              ...saboresSeleccionados,
              {  
                descripcion_insumo: adicion.descripcion_insumo,
                precio: adicion.precio,
                ID_tipo_Insumo: adicion.ID_tipo_Insumo,
                Adiciones_Insumos: {
                  cantidad: 1 // Inicializa la cantidad en 1
                }
              }
            ]);
            toast.success(`${adicion.descripcion_insumo} ha sido agregado.`);
          }
        };

  useEffect(() => {
    if (!searchTerm) {
       fetchProductos()
        // setProductosDisponibles(data);
        // setBusqueda(data); 
      } else {
        const productosFiltrados = busqueda.filter((producto) =>
            producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())|| 
            producto.ID_producto.toString().includes(searchTerm)
        );    
        setBusqueda(productosFiltrados); // Actualizar los resultados de la búsqueda
      }
  
      fetchTipoInsumo()

  
  }, [searchTerm]);

  

  // const calcularPrecioTotal = () => {
  //   const precioBase = precios[tamaño]
  //   const precioExtra = Math.max(0, saboresSeleccionados.length - 2) * 0.5
  //   return precioBase + precioExtra
  // }

  const agregarProducto = () => {
    if (productoActual) {
      const nuevoProducto: Producto = {
        ID_producto: IDActual,
        nombre: productoActual,
        sabores: saboresSeleccionados,
        ID_tipo_productos:1,
        precio: calcularPrecioTotal(),
        cantidad: 1,
      }
      setProductosAgregados(prev => [...prev, nuevoProducto])
      setModalAbierto(false)
      setProductoActual(null)
      setSaboresSeleccionados([])
    //   setTamaño('mediano')
    }
  }



  const eliminarHelado = (index: number) => {
    setSaboresSeleccionados(prev => prev.filter((_, i) => i !== index))
    
  }



  const updateQuantity = (id: string, amount: number) => {
    const newInputs = saboresSeleccionados.map((input) => {
      const newQuantity = isNaN(input.Adiciones_Insumos.cantidad + amount)? 1: input.Adiciones_Insumos.cantidad + amount;
      // const precio = isNaN(input.precio * newQuantity)? 1: input.precio * newQuantity;
      if (input.descripcion_insumo === id) {
        
        return {
          ...input,
          Adiciones_Insumos: {
            ...input.Adiciones_Insumos,
            cantidad: newQuantity,
            // precio: precio
          },
        };
       
      }
      return input;
    });

    setSaboresSeleccionados(newInputs);
   
  };
  console.log(saboresSeleccionados)

  // onst updateQuantity = (descripcion: string, amount: number) => {

  //   setCantidadSabores(prev => ({
  //     ...prev,
  //     [descripcion]: Math.max(0, (prev[descripcion] || 0) + amount), // Nunca menos de 0
  //   }));
   
  // };



  // console.log(cantidadSabores);


  
  const actualizarCantidad = (index: number, incremento: number) => {
    setProductosAgregados(prev => prev.map((producto, i) => 
      i === index
        ? { ...producto, cantidad: Math.max(1, producto.Producto_Pedidos.cantidad + incremento) }
        : producto
    ))
  }

  const eliminarProducto = (index: number) => {
    setProductosAgregados(prev => prev.filter((_, i) => i !== index))
  }

 

  const totalPedido = productosAgregados.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0)

  return (
    <div className="tw-container tw-mx-auto tw-p-4">
  {/* <h1 className="tw-text-3xl tw-font-bold tw-mb-6 tw-text-center">Heladería Delicia Fría</h1> */}
  
  {/* Grid de dos columnas */}
  <div className="tw-grid tw-md:grid-cols-2 tw-gap-6">
    {/* Columna 1: Buscar productos */}
    <div className="tw-bg-white tw-p-3 tw-shadow-md tw-rounded-md">
      <div className="tw-flex tw-mb-3">
        <h2 className="tw-text-xl ">Productos</h2>
        <Package className="tw-mr-2 tw-h-4 tw-w-4" />
      </div>
      <div className="tw-relative tw-mb-4">
        <Search className="tw-absolute tw-left-2 tw-top-2.5 tw-h-4 tw-w-4 tw-text-muted-foreground" />
        <input
          type='text'
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) =>setSearchTerm(e.target.value)}
          className="tw-pl-8 tw-py-2 tw-border tw-rounded-md tw-w-full"
        />
      </div>
      <div className="tw-h-60 tw-overflow-y-auto">
        {busqueda.map((producto) => (
          <div key={producto.ID_producto} className="tw-flex tw-justify-between tw-items-center tw-py-2 tw-border-b">
           <div className='tw-flex tw-gap-6'>
           <span>{producto.ID_producto}</span>
           <span>{producto.nombre}</span>
           
           </div>
            <button
              className=" tw-bg-[#6b46c1] hover:tw-bg-[#553c9a] tw-text-white tw-border tw-px-4 tw-py-2 tw-rounded-md tw-text-sm "
              onClick={() => {
                setProductoActual(producto.nombre)
                SetIDActual(producto.ID_producto)
                setModalAbierto(true)
              }}
            >
              Agregar
            </button>
          </div>
        ))}
      </div>
    </div>

    {/* Columna 2: Tu pedido */}
    <div className="tw-bg-white tw-p-2 tw-shadow-md tw-rounded-md">
      <div className="tw-mb-4">
        <h2 className="tw-text-xl tw-font-semibold">Tu Pedido</h2>
      </div>
      <div className="tw-h-64 tw-overflow-y-auto">
        {productosAgregados.map((producto, index) => (
          <div key={index} className="tw-flex tw-justify-between tw-items-center tw-py-2 tw-border-b">
            <div className="tw-flex-1">
              <p className="tw-font-semibold">{producto.nombre}</p>
              {/* <p className="tw-text-sm tw-text-muted-foreground">Sabores: {producto..join(', ')}</p> */}
              <p className="tw-text-sm">Precio: ${producto.precio_neto.toFixed(2)}</p>
            </div>
            <div className="tw-flex tw-items-center tw-space-x-2">
              <button className="tw-border tw-p-2" onClick={() => actualizarCantidad(index, -1)}>
                <Minus className="tw-h-4 tw-w-4" />
              </button>
              <span className="tw-w-8 tw-text-center">{producto.Producto_Pedidos.cantidad}</span>
              <button className="tw-border tw-p-2" onClick={() => actualizarCantidad(index, 1)}>
                <Plus className="tw-h-4 tw-w-4" />
              </button>
              <button className="tw-text-red-600 tw-p-2" onClick={() => eliminarProducto(index)}>
                <Trash2 className="tw-h-4 tw-w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="tw-flex tw-justify-between tw-mt-4">
        <span className="tw-text-lg tw-font-semibold">Total del Pedido:</span>
        <span className="tw-text-lg tw-font-bold">${totalPedido.toFixed(2)}</span>
      </div>
      <button className="tw-w-full tw-bg-[#6b46c1] hover:tw-bg-[#553c9a] tw-text-white tw-px-4 tw-py-2 tw-mt-4 tw-rounded-md tw-flex tw-items-center tw-justify-center">
        <ShoppingCart className="tw-mr-2 tw-h-4 tw-w-4 " /> Realizar Pedido
      </button>
    </div>
  </div>

  {/* Modal para personalizar producto */}
  {modalAbierto && (
    <div className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-black tw-bg-opacity-50">
      <div className=" tw-p-4 tw-bg-white tw-p-0 tw-mb-12 tw-rounded-lg tw-border tw-border-gray-200 tw-max-w-lg tw-w-full tw-mx-auto tw-h-[90vh]">
        <h3 className="tw-text-lg page-heading tw-mb-4">Configuración de {productoActual}</h3>
        <div className="tw-mb-4">
          <p className="tw-font-semibold">Selecciona los sabores:</p>
          <div className="tw-h-60 tw-overflow-y-auto tw-border tw-rounded-md tw-p-2">
            {saboresSeleccionados.map((sabor,index) => (
              <div key={sabor.descripcion_insumo} className="tw-flex tw-justify-between tw-items-center tw-py-2 tw-border-b">
              <div className="tw-flex-1">
                <p className="tw-font-semibold">{sabor.descripcion_insumo}</p>
                {/* <p className="tw-text-sm tw-text-muted-foreground">Sabores: {producto..join(', ')}</p> */}
                <p className="tw-text-sm">Precio: ${sabor.precio.toFixed(2)}</p>
              </div>
              <div className="tw-flex tw-items-center tw-space-x-2">
                <button className="tw-border tw-p-2" onClick={() => updateQuantity(sabor.descripcion_insumo, -1)}>
                  <Minus className="tw-h-4 tw-w-4" />
                </button>
                <span className="tw-w-8 tw-text-center"> {sabor.Adiciones_Insumos.cantidad} {/* Mostrar la cantidad actual */}</span>
                <button className="tw-border tw-p-2" onClick={() =>  updateQuantity(sabor.descripcion_insumo, 1)}>
                  <Plus className="tw-h-4 tw-w-4" />
                </button>
                <button className="tw-text-red-600 tw-p-2" onClick={() => eliminarHelado(index)}>
                  <Trash2 className="tw-h-4 tw-w-4" />
                </button>
              </div>
            </div>
              
            ))}
          </div>
        </div>

        <div className="tw-mb-4">
          <p className="tw-font-semibold">Selecciona el tamaño:</p>
          <div className="tw-flex tw-space-x-4">
            {/* {tamaño.map((size) => (
              <label key={size.ID_tipo_productos} className="tw-flex tw-items-center">
                <input
                  type="radio"
                  name="tamaño"
                  value={size.ID_tipo_productos}
                  checked={ size.ID_tipo_productos}
                  onChange={() => setTamaño(size as 'pequeño' | 'mediano' | 'grande')}
                  className="tw-h-4 tw-w-4"
                />
                <span className="tw-ml-2 capitalize">{size.ID_tipo_productos}</span>
              </label>
            ))} */}
          </div>
        </div>

        <div className="tw-flex tw-justify-between">
          <button
            onClick={() => setModalAbierto(false)}
            className="tw-bg-gray-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md"
          >
            Cancelar
          </button>
          <button
            onClick={agregarProducto}
            className="tw-bg-[#6b46c1] hover:tw-bg-[#553c9a] tw-text-white tw-px-4 tw-py-2 tw-rounded-md"
          >
            Agregar al pedido
          </button>
        </div>
      </div>
    </div>
  )}
</div>

  )
}