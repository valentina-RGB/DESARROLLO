import React, { useState, ChangeEvent, DragEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { toast } from "react-hot-toast";
import { List, UploadIcon } from "lucide-react";
import Modal from "react-modal";
import AddInsumoProductos from "./insumo-add";
import { Input } from "@mui/material";


Modal.setAppElement("#root");


type Insumo = {
  ID_insumo: number;
  descripcion_insumo: string;
  estado_insumo: string;
  precio: number;
  ID_tipo_insumo: number;
  Producto_insumos: {
    cantidad: number;
    configuracion: string;
    precio: number;
  };
};


// type Producto = {
//   ID_producto: number;
//   nombre: string;
//   descripcion: string;
//   precio_neto: number;
//   ID_estado_productos: number | null;
//   ID_tipo_productos: number;
//   ID_categorias: number;
//   imagen: string;
//   Insumos: Insumo[];
// };

// type Input ={
//   ID_insumo: number;
//   descripcion_insumo: string;
//   precio: number | string;
//   cantidad: number;
//   configuracion: number | string;
// }

interface AddCategories {
  onClose: () => void;
}

const AddProductos: React.FC<AddCategories> = ({ onClose }) => {
  const [descripcion, setDescripcion] = useState<string>("");
  const [estado, setEstado] = useState<string>("A");
  const [imagen, setImagen] = useState("");
  const [categorias, setCategorias] = useState<Array<{ ID_categoria: number; descripcion: string }>>([]);
  // const [Insumos, setInsumos] = useState<Insumo[]>([]);
  const [tipo, setTipo] = useState<Array<{ ID_tipo_producto: number; descripcion: string }>>([]);
  const [error, setError] = useState<string | unknown>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    descripcion: "",
    imagen: "",
  });

  const [formData, setFormData] = useState<{
    nombre: string;
    descripcion: string;
    precio_neto: number;
    ID_estado_productos: number | string;
    ID_tipo_productos: number | string;
    ID_categorias: number | string;
    imagen: File | null;
    Insumos: Insumo[]
  }>({
    nombre: "",
    descripcion: "",
    precio_neto: 0,
    ID_estado_productos: 0,
    ID_tipo_productos: 0,
    ID_categorias: 0, // Por ejemplo, inicializar como 0
    imagen: null,
    Insumos: []
  });

  const fetchCategorias = async () => {
    try {
      const response = await api.get("/categorias");
      setCategorias(response.data);
    } catch (err: unknown) {
      console.error("Error al cargar las categorías :", err);
      setError(err);
    }
  };

  const fetchTipo = async () => {
    try {
      const response = await api.get("/tipo_producto");
      setTipo(response.data);
    } catch (err: unknown) {
      console.error("Error al cargar el  tipo de producto :", err);
      setError(err);
    }
  };



  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // setModalConfig({type:null, id:null});
    fetchTipo();
    fetchCategorias();
  };

  // 2. Manejo de cambio en los inputs

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "descripcion") {
      setErrors((prev) => ({ ...prev, descripcion: "" }));
    }
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setErrors((prev) => ({ ...prev, image: "" }));
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio_neto: formData.precio_neto,
      ID_estado_productos: formData.ID_estado_productos,
      ID_tipo_productos: formData.ID_tipo_productos,
      ID_categorias: formData.ID_categorias, // Por ejemplo, inicializar como 0
      imagen: formData.imagen || '',
      Insumos: inputs
    };
    console.log(data)

    const newErrors = { descripcion: "", imagen: "" };
    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "El nombre de la categoría es obligatorio";
    }
    //   if (!formData.imagen) {
    //     newErrors.imagen = 'La imagen es obligatoria';
    //   }
    setErrors(newErrors);
    if (!newErrors.descripcion) {
      try {
        await api.post("/productos", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        onClose();
        toast.success("La categoría ha agregada exitosamente.");
        navigate("/Categorias");
        resetForm();
      } catch (error) {
        toast.error(
          "No se pudo agregar la categoría. Por favor, intente nuevamente."
        );
        setError(error);
      }
    }
  };

  const resetForm = () => {
    setDescripcion(descripcion);
    setEstado(estado);
    setImagen(imagen);

  }

  // DESDE AQUI SE HACE LA CREACIÓN DE INSUMOS

  const [searchTerm, setSearchTerm] = useState("") //LO USARE PARA BUSCAR INSUMOS

  const [inputs, setInputs] = useState<Insumo[]>([]);
  const [searchResults, setSearchResults] = useState<Insumo[]>([]);
  const [selectedInsumo, setSelectedInsumo] = useState<Insumo | null>(null); // Insumo seleccionado


  const loadInputs = async () => {
    try {
      const response = await api.get("/Insumos");
      const data: Insumo[] = await response.data; // Filtra los resultados según el término de búsqueda
      const filteredInputs = data.filter((input) =>
        input.descripcion_insumo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredInputs);
    } catch (error) {
      console.error("Error al cargar los insumos:", error);
    }
  };



  // Llama a la función de búsqueda cada vez que cambia el término de búsqueda
  // useEffect(() => {

  // }, [searchTerm]);

  // Función para agregar un insumo a la lista
  const addInput = (insumo: Insumo) => {
    const productExists = inputs.some((input) => input.ID_insumo === insumo.ID_insumo);

    if (!productExists) {
      setInputs([
        ...inputs,
        {
          ID_insumo: insumo.ID_insumo,
          descripcion_insumo: insumo.descripcion_insumo,
          estado_insumo: insumo.estado_insumo,
          precio: insumo.precio,
          ID_tipo_insumo: insumo.ID_tipo_insumo,
          Producto_insumos: {
            cantidad: 1,
            configuracion: "",
            precio: insumo.precio
          }
        },
      ]);
    }
  };


  // const addInput = () => {
  //   // setInputs([...se, { ID_insumo: inputs.length + 1, descripcion_insumo: ""}]);
  // };

  const updateQuantity = (id: number, amount: number) => {
    const newInputs = inputs.map((input) => {
      if (input.ID_insumo === id) {
        const newQuantity = isNaN(input.Producto_insumos.cantidad + amount) ? 1 : input.Producto_insumos.cantidad + amount;
        const precio = isNaN(input.precio * newQuantity) ? 1 : input.precio * newQuantity;
        return {
          ...input,
          Producto_insumos: {
            ...input.Producto_insumos,
            cantidad: newQuantity,
            precio: precio,
          },
        };
      }
      return input;
    });
    setInputs(newInputs);

  };

  const removeInput = (id: number) => {
    const newInputs = inputs.filter((input) => input.ID_insumo !== id);
    setInputs(newInputs);
  };

  useEffect(() => {
    fetchTipo();
    fetchCategorias();
    if (searchTerm) {
      loadInputs();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);



  // Función para manejar la selección de un insumo
  const handleSelectInsumo = (insumo: Insumo) => {
    setSelectedInsumo(insumo);
  };

  console.log("searchResults:", searchResults);
  console.log("inputs:", inputs);
  console.log("selectedInsumo:", selectedInsumo);
  console.log("Renderizando componente");

  return (
    <>
      <div className="tw-bg-[#f8faf] dark:tw-bg-[#f5f3ff] tw-p-6 tw-rounded-lg tw-shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="tw-mb-4">
            <div className="tw-flex tw-flex-col tw-items-start tw-gap-2">
              <h2 className="tw-text-2xl tw-font-bold tw-text-[#6b46c1]">
                Nuevo Producto
              </h2>
              <p className="tw-text-gray-500 dark:tw-text-gray-400">
                Completa los siguientes campos para agregar un nuevo producto a tu
                catálogo.
              </p>
            </div>
          </div>
          <div className="tw-mb-6 tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6">

            {/* Columna de información del producto */}
            <div className="tw-col-span-2 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
              <div className="tw-grid tw-gap-2">
                <label
                  htmlFor="nombre"
                  className="tw-text-gray-800 dark:tw-text-gray-800"
                >
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Nombre del producto"
                  className="tw-bg-white dark:tw-bg-[#ddd6fe] tw-text-gray-700 dark:tw-text-gray-800 tw-border-gray-300 dark:tw-border-gray-600 tw-rounded-md tw-p-2 focus:tw-ring-[#6b46c1] focus:tw-border-[#6b46c1]"
                />
              </div>
              <div className="tw-grid tw-gap-2">
                <label
                  htmlFor="price"
                  className="tw-text-gray-800 dark:tw-text-gray-800"
                >
                  Precio Neto
                </label>
                <input
                  id="price"
                  type="number"
                  min="1000"
                  max="50000"
                  step="100"
                  placeholder="Ingresa el precio"
                  className="tw-bg-white dark:tw-bg-[#ddd6fe] tw-text-gray-700 dark:tw-text-gray-800 tw-border-gray-300 dark:tw-border-gray-600 tw-rounded-md tw-p-2 focus:tw-ring-[#6b46c1] focus:tw-border-[#6b46c1]"
                />
              </div>
              <div className="tw-grid tw-gap-2">
                <label
                  htmlFor="categoria"
                  className="tw-text-gray-800 dark:tw-text-gray-800"
                >
                  Categoría
                </label>
                <select
                  id="categorias"
                  name="ID_categorias"
                  value={formData.ID_categorias}
                  onChange={handleInputChange}
                  className="tw-bg-white dark:tw-bg-[#ddd6fe] tw-text-gray-700 dark:tw-text-gray-800 tw-border-gray-300 dark:tw-border-gray-600 tw-rounded-md tw-p-2 focus:tw-ring-[#6b46c1] focus:tw-border-[#6b46c1]"
                >
                  <option value={0} disabled>
                    Selecciona un producto
                  </option>
                  {categorias.map((c) => (
                    <option key={c.ID_categoria} value={c.ID_categoria}>
                      {c.descripcion}
                    </option>
                  ))}
                </select>
              </div>
              <div className="tw-grid tw-gap-2">
                <label
                  htmlFor="type"
                  className="tw-text-gray-600 dark:tw-text-gray-400"
                >
                  Tipo de Producto
                </label>
                <select
                  id="type"
                  name="ID_tipo_productos"
                  value={formData.ID_tipo_productos}
                  onChange={handleInputChange}
                  className="tw-bg-white dark:tw-bg-[#ddd6fe] tw-text-gray-700 dark:tw-text-gray-800 tw-border-gray-300 dark:tw-border-gray-600 tw-rounded-md tw-p-2 focus:tw-ring-[#6b46c1] focus:tw-border-[#6b46c1]"
                >
                  <option value={0} disabled>
                    Selecciona un tipo
                  </option>
                  {tipo.map((t) => (
                    <option key={t.ID_tipo_producto} value={t.ID_tipo_producto}>
                      {t.descripcion}
                    </option>
                  ))}
                  ;
                </select>
              </div>
              <div className="tw-grid tw-gap-2 tw-col-span-2 md:tw-col-span-2">
                <label
                  htmlFor="descripcion"
                  className="tw-text-gray-600 dark:tw-text-gray-400"
                >
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  type="text"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  placeholder="Describe el producto"
                  className="tw-bg-white dark:tw-bg-[#ddd6fe] tw-text-gray-700 dark:tw-text-gray-300 tw-border-gray-300 dark:tw-border-gray-600 tw-rounded-md tw-p-2 focus:tw-ring-[#6b46c1] focus:tw-border-[#6b46c1]"
                />
              </div>
            </div>
            {/* Columna de imagen del producto */}
            <div className="tw-space-y-2">
              <label
                htmlFor="image"
                className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
              >
                Imagen
              </label>
              <div
                className={`tw-border-2 tw-border-dashed tw-rounded-lg tw-p-4 tw-text-center ${dragActive ? "tw-border-indigo-400" : "tw-border-gray-300"
                  } `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageChange(e.target.files?.[0] || null)
                  }
                  className="tw-hidden"
                />
                {preview ? (
                  <div className="tw-relative tw-w-full tw-h-48">
                    <img
                      src={preview}
                      alt="Vista previa"
                      className="tw-w-full tw-h-full tw-object-cover tw-rounded-lg"
                    />
                    <button
                      type="button"
                      className="tw-absolute tw-top-2 tw-right-2 tw-px-2 tw-py-1 tw-bg-white tw-text-gray-700 tw-text-sm tw-rounded tw-shadow"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, image: null }));
                        setPreview(null);
                      }}
                    >
                      {" "}
                      Cambiar
                    </button>
                  </div>
                ) : (
                  <label htmlFor="image" className="tw-cursor-pointer">
                    <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-py-8">
                      <UploadIcon className="tw-w-12 tw-h-12 tw-text-gray-400" />
                      <p className="tw-mt-2 tw-text-sm tw-text-gray-500">
                        Arrastra y suelta una imagen aquí, o haz clic para
                        seleccionar
                      </p>
                    </div>
                  </label>
                )}
              </div>
              <div className="">
                <button
                  onClick={() => handleModal()}
                  className="tw-bg-[#6b46c1] hover:tw-bg-[#553c9a] tw-text-white tw-rounded-md tw-px-4 tw-py-2 focus:tw-ring-[#6b46c1] focus:tw-ring-offset-2"
                >Añadir insumos +
                </button>
              </div>
            </div>

          </div>



          {/* 
      AGREGAR INSUMOS */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            className="tw-bg-white tw-p-0 tw-mb-12 tw-rounded-lg tw-border tw-border-gray-300 tw-max-w-lg tw-w-full tw-mx-auto"
            overlayClassName="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-40 tw-z-50 tw-flex tw-justify-center tw-items-center"
          >

            <div className="tw-w-full tw-max-w-md tw-mx-auto tw-p-6 tw-bg-white tw-rounded-lg tw-shadow-md">
              <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
                <h2 className="tw-text-2xl tw-font-bold">Agregar Insumos</h2>


              </div>

              <div className="tw-space-y-4">
                <div className="tw-flex tw-items-center tw-gap-4 tw-mb-4">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar insumo..."
                    className="tw-flex-1 tw-border-[#ff6b00] tw-border tw-p-2 tw-rounded-lg focus:tw-ring-[#ff6b00]"
                  />
                </div>

                {searchResults.map((input) => (
                  <div key={input.ID_insumo} className="tw-flex tw-items-center tw-justify-between tw-bg-[#f2f2f2] tw-rounded-md tw-p-4">
                    <div className="tw-flex tw-items-center tw-gap-4 tw-flex-1">
                      <span className="tw-font-medium">{input.descripcion_insumo}</span>
                      <div className="tw-flex tw-items-center tw-gap-2">
                        {/* <button
                  onClick={() => updateQuantity(input.ID_insumo, -1)}
                  disabled={input.cantidad <= 1}
                  className="tw-text-[#ff6b00] tw-p-2 tw-rounded-full hover:tw-bg-[#ff6b00] hover:tw-text-white disabled:tw-opacity-50"
                >
                  <MinusIcon className="tw-w-4 tw-h-4" />
                </button>
                <span className="tw-font-medium">{input.cantidad}</span>
                <button
                  onClick={() => updateQuantity(input.ID_insumo, 1)}
                  className="tw-text-[#ff6b00] tw-p-2 tw-rounded-full hover:tw-bg-[#ff6b00] hover:tw-text-white"
                >
                  <PlusIcon className="tw-w-4 tw-h-4" />
                </button> */}
                      </div>
                    </div>
                    <button
                      onClick={() => removeInput(input.ID_insumo)}
                      className="tw-text-[#ff6b00] tw-p-2 tw-rounded-full hover:tw-bg-[#ff6b00] hover:tw-text-white"
                    >
                      <XIcon className="tw-w-4 tw-h-4" />
                    </button>
                    <button
                      onClick={() => addInput(input)}
                      className="tw-text-[#ff6b00] tw-p-2 tw-rounded-full hover:tw-bg-[#ff6b00] hover:tw-text-white"
                    >
                      <PlusIcon className="tw-w-4 tw-h-4" />
                    </button>


                  </div>

                ))}

              </div>
              <div className="tw-flex tw-items-center tw-justify-end">
                <button
                  onClick={() => {
                    if (selectedInsumo) {
                      addInput(selectedInsumo);
                      setSearchTerm(""); // Limpiar el término de búsqueda
                    }
                  }}
                  disabled={!selectedInsumo}
                  className="tw-flex tw-items-center tw-gap-2 tw-bg-[#ff6b00] tw-text-white tw-py-2 tw-px-4 tw-rounded-lg"
                >
                  <PlusIcon className="tw-w-4 tw-h-4" />
                  Agregar Insumo
                </button>
              </div>

              <div className="tw-mt-6">
                <h3 className="tw-text-xl tw-font-semibold">Insumos Agregados</h3>
                <div className="tw-space-y-4">
                  {inputs.map((input) => (
                    <div key={input.ID_insumo} className="tw-flex tw-items-center tw-justify-between tw-bg-[#f2f2f2] tw-rounded-md tw-p-4">
                      <div className="tw-flex tw-items-center tw-gap-4 tw-flex-1">
                        <span className="tw-font-medium">{input.descripcion_insumo} </span>
                        <div className="tw-flex tw-items-center tw-gap-2">
                          <button
                            onClick={() => updateQuantity(input.ID_insumo, -1)}
                            disabled={input.Producto_insumos.cantidad <= 1}
                            className="tw-text-[#ff6b00] tw-p-2 tw-rounded-full hover:tw-bg-[#ff6b00] hover:tw-text-white disabled:tw-opacity-50"
                          >
                            <MinusIcon className="tw-w-4 tw-h-4" />
                          </button>
                          <span className="tw-font-medium">{input.Producto_insumos.cantidad}</span>
                          <button
                            onClick={() => updateQuantity(input.ID_insumo, 1)}
                            className="tw-text-[#ff6b00] tw-p-2 tw-rounded-full hover:tw-bg-[#ff6b00] hover:tw-text-white"
                          >
                            <PlusIcon className="tw-w-4 tw-h-4" />
                          </button>
                        </div>
                      </div>
                      <span>
                        <span className="tw-font-medium">{input.Producto_insumos.precio} </span>
                      </span>
                      <button
                        onClick={() => removeInput(input.ID_insumo)}
                        className="tw-text-[#ff6b00] tw-p-2 tw-rounded-full hover:tw-bg-[#ff6b00] hover:tw-text-white"
                      >
                        <XIcon className="tw-w-4 tw-h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>




            </div>



          </Modal>









          <div className="tw-mt-4">
            <button
              type="submit"
              className="tw-bg-[#6b46c1] hover:tw-bg-[#553c9a] tw-text-white tw-rounded-md tw-px-4 tw-py-2 focus:tw-ring-[#6b46c1] focus:tw-ring-offset-2">
              Guardar Producto
            </button>
          </div>

        </form>
      </div>




    </>
  );
}
function MinusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
export default AddProductos;
