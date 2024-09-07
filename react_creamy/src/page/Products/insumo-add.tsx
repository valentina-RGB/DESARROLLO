"use client";

import { useState, useEffect } from "react";

interface AddInsumoProductos { 
    id: number,
    onClose: () => void;
  }
  

  interface Ingredient {
    ID_insumo: number;
    nombre: string;
    descripcion: string;
    cantidad: string;
    unidad: string;
  }
  

  const AddInsumoProductos: React.FC<AddInsumoProductos> = ({ id, onClose }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
    const [newIngredient, setNewIngredient] = useState<Ingredient>({
      ID_insumo: 0,
      nombre: "",
      descripcion: "",
      cantidad: "",
      unidad: "",
    });
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  
    useEffect(() => {
      // Fetch all ingredients from the API
      fetch("/insumos")
        .then((response) => response.json())
        .then((data) => setIngredients(data as Ingredient[]))
        .catch((error) => console.error("Error fetching ingredients:", error));
    }, []);
  
    const filteredIngredients = ingredients.filter((ingredient) =>
      ingredient.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const handleIngredientSelect = (ingredient: Ingredient) => {
      setSelectedIngredients([...selectedIngredients, ingredient]);
      setNewIngredient({
        ID_insumo: 0,
        nombre: "",
        descripcion: "",
        cantidad: "",
        unidad: "",
      });
    };
  
    const handleNewIngredientChange = (field: keyof Ingredient, value: string) => {
      setNewIngredient((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    };
  
    const handleSave = () => {
      if (newIngredient.nombre.trim() !== "") {
        setSelectedIngredients([...selectedIngredients, newIngredient]);
        setNewIngredient({
          ID_insumo: 0,
          nombre: "",
          descripcion: "",
          cantidad: "",
          unidad: "",
        });
  
        // Send a POST request to the API to save the new ingredient-product association
        fetch("/producto_insumos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ID_productos_tipo: id,
            ID_insumos_tipo: selectedIngredients.map(ing => ing.ID_insumo),
            cantidad: newIngredient.cantidad,
            configuracion: newIngredient.unidad,
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log("Saved:", data))
          .catch((error) => console.error("Error saving ingredient:", error));
      }
    };
  
    const handleRemoveIngredient = (index: number) => {
      const updatedIngredients = [...selectedIngredients];
      updatedIngredients.splice(index, 1);
      setSelectedIngredients(updatedIngredients);
    };
  
  return (
<div className="tw-grid tw-gap-4 tw-py-4 tw-grid-cols-2">
  <div>
    <h3 className="tw-text-lg">Información del Producto</h3>
    <input
      type="text"
      placeholder="Nombre del producto"
      className="tw-w-full tw-p-2 tw-border tw-border-gray-300 tw-rounded"
      value={newIngredient.nombre}
      onChange={(e) => handleNewIngredientChange('nombre', e.target.value)}
    />
    <textarea
      placeholder="Descripción del producto"
      className="tw-w-full tw-mt-2 tw-p-2 tw-border tw-border-gray-300 tw-rounded"
      value={newIngredient.descripcion}
      onChange={(e) => handleNewIngredientChange('descripcion', e.target.value)}
    />
    <input
      type="number"
      placeholder="Precio neto"
      className="tw-w-full tw-mt-2 tw-p-2 tw-border tw-border-gray-300 tw-rounded"
      value={newIngredient.cantidad}
      onChange={(e) => handleNewIngredientChange('cantidad', e.target.value)}
    />
    <input
      type="text"
      placeholder="Estado del producto"
      className="tw-w-full tw-mt-2 tw-p-2 tw-border tw-border-gray-300 tw-rounded"
      value={newIngredient.unidad}
      onChange={(e) => handleNewIngredientChange('unidad', e.target.value)}
    />
  </div>
  <div>
    <h3 className="tw-text-lg">Seleccionar Insumos</h3>
    <input
      type="search"
      placeholder="Buscar insumos..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="tw-w-full tw-p-2 tw-border tw-border-gray-300 tw-rounded"
    />
    <ul className="tw-mt-2 tw-max-h-[200px] tw-overflow-auto">
      {filteredIngredients.map((ingredient) => (
        <li
          key={ingredient.ID_insumo}
          className="tw-flex tw-items-center tw-justify-between tw-px-2 tw-py-1 tw-hover:bg-gray-100 tw-cursor-pointer"
          onClick={() => handleIngredientSelect(ingredient)}
        >
          <div>{ingredient.nombre}</div>
          <div>{ingredient.cantidad} {ingredient.unidad}</div>
        </li>
      ))}
    </ul>
    <div className="tw-mt-4">
      <button
        onClick={handleSave}
        className="tw-w-full tw-bg-blue-500 tw-text-white tw-py-2 tw-rounded"
      >
        Guardar
      </button>
    </div>
    <ul className="tw-mt-4">
      {selectedIngredients.map((ingredient, index) => (
        <li key={index} className="tw-flex tw-justify-between tw-items-center tw-mb-2">
          <div>{ingredient.nombre}</div>
          <button
            onClick={() => handleRemoveIngredient(index)}
            className="tw-text-red-500 tw-text-sm"
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  </div>
  <div className="tw-flex tw-justify-end">
            <button
              type="button"
              onClick={onClose}
              className="tw-mr-4 tw-px-4 tw-py-2 tw-bg-gray-200 tw-text-gray-700 tw-rounded-lg hover:tw-bg-gray-300 tw-transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="tw-bg-green-500 tw-text-white tw-px-6 tw-py-2 tw-rounded-lg hover:tw-bg-green-600 tw-transition tw-font-semibold"
            >
              Agregar
            </button>
          </div>
</div>
  );
}

export default AddInsumoProductos
