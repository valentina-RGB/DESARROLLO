import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Producto } from '../../types/Producto';

interface CreateVentaModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateVentaModal: React.FC<CreateVentaModalProps> = ({ isOpen, onClose }) => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [nuevoProducto, setNuevoProducto] = useState<Producto>({
        id: 0,
        nombre: '',
        precio: 0,
        cantidad: 1,
    });

    const handleAddProducto = () => {
        setProductos([...productos, nuevoProducto]);
        setTotal(total + nuevoProducto.precio * nuevoProducto.cantidad);
        // Resetear el estado del nuevo producto
        setNuevoProducto({
            id: 0,
            nombre: '',
            precio: 0,
            cantidad: 1,
        });
    };

    const handleSubmit = () => {
        // Lógica para enviar la nueva venta
        console.log('Venta creada:', productos, total);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} toggle={onClose}>
            <ModalHeader toggle={onClose}>Agregar Venta</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="cliente">Cliente</Label>
                        <Input type="select" id="cliente">
                            {/* Mapear clientes aquí */}
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="producto">Producto</Label>
                        <Input
                            type="text"
                            id="productoNombre"
                            placeholder="Nombre del producto"
                            value={nuevoProducto.nombre}
                            onChange={(e) => setNuevoProducto({
                                ...nuevoProducto,
                                nombre: e.target.value,
                            })}
                        />
                        <Input
                            type="number"
                            id="productoPrecio"
                            placeholder="Precio del producto"
                            value={nuevoProducto.precio}
                            onChange={(e) => setNuevoProducto({
                                ...nuevoProducto,
                                precio: parseFloat(e.target.value),
                            })}
                        />
                        <Input
                            type="number"
                            id="productoCantidad"
                            placeholder="Cantidad"
                            value={nuevoProducto.cantidad}
                            onChange={(e) => setNuevoProducto({
                                ...nuevoProducto,
                                cantidad: parseInt(e.target.value),
                            })}
                        />
                        <Button color="primary" onClick={handleAddProducto}>Agregar Producto</Button>
                    </FormGroup>

                    <div>
                        <h5>Productos:</h5>
                        <ul>
                            {productos.map((producto, index) => (
                                <li key={index}>{producto.nombre} - {producto.precio} x {producto.cantidad}</li>
                            ))}
                        </ul>
                        <p>Total: ${total.toFixed(2)}</p>
                    </div>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>Guardar Venta</Button>
                <Button color="secondary" onClick={onClose}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    );
};

export default CreateVentaModal;
