import React, { useState } from 'react';
import { Modal, Button } from 'reactstrap';
import VentaDetailModal from './VentaDetail';
import CreateVentaModal from './CreateVenta';
import { MaterialReactTable } from 'material-react-table'; 

interface Venta {
    id: number;
    fecha: string;
    cliente: string;
    total: number;
}

const VentasList: React.FC = () => {
    const [selectedVenta, setSelectedVenta] = useState(null);
    const [isDetailModalOpen, setDetailModalOpen] = useState(false);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    const handleOpenDetailModal = (venta: Venta) => {
        setSelectedVenta(venta);
        setDetailModalOpen(true);
    };

    const handleOpenCreateModal = () => {
        setCreateModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedVenta(null);
        setDetailModalOpen(false);
        setCreateModalOpen(false);
    };

    // Datos de prueba, cambiar por tus datos reales
    const ventas = [
        { id: 1, fecha: '2024-08-29', cliente: 'Juan Perez', total: 150.75 },
        // Agrega más ventas aquí
    ];

    return (
        <div>
            <Button onClick={handleOpenCreateModal} className="btn btn-primary mb-4">
                Agregar Venta
            </Button>

            <MaterialReactTable
                columns={[
                    { accessorKey: 'id', header: 'ID' },
                    { accessorKey: 'fecha', header: 'Fecha' },
                    { accessorKey: 'cliente', header: 'Cliente' },
                    { accessorKey: 'total', header: 'Total' },
                ]}
                data={ventas}
                renderRowActions={({ row }) => (
                    <Button color="info" onClick={() => handleOpenDetailModal(row.original)}>
                        Ver Detalle
                    </Button>
                )}
            />

            <VentaDetailModal isOpen={isDetailModalOpen} venta={selectedVenta} onClose={handleCloseModal} />
            <CreateVentaModal isOpen={isCreateModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default VentasList;
