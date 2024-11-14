import React, { useState, useEffect } from 'react';
import { Search, PlusCircle, RefreshCw, X, ChevronRight } from 'lucide-react';
import axios from 'axios';

interface Pedido {
  ID_pedido: number;
  clientName?: string;
  fecha: string;
  estado: string;
  precio_total: string;
}

const PedidosList = () => {
  const [searchText, setSearchText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(false);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  // Cargar los pedidos desde la API
  const fetchPedidos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3300/pedidos');
      setPedidos(response.data); // Almacena los datos de la API en el estado
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  // Filtrar los pedidos según el texto de búsqueda
  const filteredData = pedidos.filter((pedido) =>
    (pedido.clientName?.toLowerCase().includes(searchText.toLowerCase()) || 
    pedido.ID_pedido.toString().includes(searchText))
  );

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'Pagado':
        return 'bg-green-100 text-green-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      fetchPedidos(); // Vuelve a cargar los pedidos
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Pedidos</h1>
            <button
              onClick={handleRefresh}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
          {/* Search Bar */}
          <div className="pb-4 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por cliente o número..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pedidos List */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        {loading ? (
          // Skeleton Loading
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow mb-4 p-4">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))
        ) : (
          // Pedidos Cards
          filteredData.map((pedido, index) => (
            <div
              key={pedido.ID_pedido}
              className="bg-white rounded-lg shadow mb-4 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer active:scale-98"
              style={{
                animation: `fadeInUp 0.5s ease-out forwards ${index * 0.1}s`
              }}
              onClick={() => {
                setSelectedPedido(pedido);
                setShowModal(true);
              }}
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      #{pedido.ID_pedido} - {pedido.clientName || 'Cliente Desconocido'}
                    </h3>
                    <p className="text-gray-600">{formatDate(pedido.fecha)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(pedido.estado)}`}>
                      {pedido.estado}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-gray-900 font-semibold">{pedido.precio_total}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && selectedPedido && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className="bg-white rounded-lg max-w-md w-full transform transition-all duration-300"
            style={{ animation: 'modalEnter 0.3s ease-out forwards' }}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">Detalles del Pedido #{selectedPedido.ID_pedido}</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="space-y-3">
                <p><span className="font-semibold">Cliente:</span> {selectedPedido.clientName || 'Cliente Desconocido'}</p>
                <p><span className="font-semibold">Fecha:</span> {formatDate(selectedPedido.fecha)}</p>
                <p><span className="font-semibold">Estado:</span> {selectedPedido.estado}</p>
                <p><span className="font-semibold">Monto:</span> {selectedPedido.precio_total}</p>
              </div>
            </div>
          </div>
        </div>
      )}

    

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes modalEnter {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .active\:scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
};

export default PedidosList;
