import React from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

interface VentaDetailModalProps {
    isOpen: boolean;
    venta: any;
    onClose: () => void;
}

const VentaDetailModal: React.FC<VentaDetailModalProps> = ({ isOpen, venta, onClose }) => {
    if (!venta) return null;

    return (
        <Modal isOpen={isOpen} toggle={onClose}>
            <ModalHeader toggle={onClose}>Detalle de Venta</ModalHeader>
            <ModalBody>
                <p>ID Venta: {venta.id}</p>
                <p>Fecha: {venta.fecha}</p>
                <p>Cliente: {venta.cliente}</p>
                <p>Total: {venta.total}</p>
                {/* Mostrar más detalles aquí */}
            </ModalBody>
            <Button color="secondary" onClick={onClose}>
                Cerrar
            </Button>
        </Modal>
    );
};

export default VentaDetailModal;
