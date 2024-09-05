// EntriesList.tsx
import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { HistorialEntrada } from '../../types/historialEntradas';
import api from '../../api/api';

const EntriesList: React.FC = () => {
  const [entries, setEntries] = useState<HistorialEntrada[]>([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await api.get('/historial_entradas');
      setEntries(response.data);
    } catch (error) {
      console.error('Error al obtener las entradas:', error);
    }
  };

  const columns = useMemo<MRT_ColumnDef<HistorialEntrada>[]>(
    () => [
      {
        accessorKey: 'ID_insumo',
        header: 'ID Insumo',
      },
      {
        accessorFn: (row) => row.Insumo.descripcion_insumo,  // Acceso a la descripción dentro del objeto "Insumo"
        id: 'descripcion_insumo',
        header: 'Descripción del Insumo',
      },
      {
        accessorKey: 'cantidad',
        header: 'Cantidad',
        Cell: ({ cell }) => Math.floor(cell.getValue<number>()),  // Elimina los decimales
      },
      {
        accessorKey: 'fecha',
        header: 'Fecha de Entrada',
        Cell: ({ cell }) => {
          const date = new Date(cell.getValue<string>());
          return date.toLocaleDateString();  // Formateo adecuado de la fecha
        },
      },
    ],
    [],
  );

  return (
    <div className="tw-p-6 tw-bg-gray-100 tw-min-h-screen">
      <h1 className="page-heading">Historial de Entradas</h1>
      <MaterialReactTable columns={columns} data={entries} />
    </div>
  );
};

export default EntriesList;