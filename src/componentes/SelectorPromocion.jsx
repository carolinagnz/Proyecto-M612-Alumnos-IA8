/**
 * COMPONENTE SELECTOR PROMOCION
 * ==============================
 * Selector para filtrar alumnos por promoción.
 * 
 * Props:
 * - promociones: Array con las promociones disponibles
 * - promocionSeleccionada: Promoción actualmente seleccionada
 * - onPromocionChange: Función que se ejecuta al cambiar la promoción
 */

function SelectorPromocion({ promociones, promocionSeleccionada, onPromocionChange }) {
  
  const handleChange = (evento) => {
    onPromocionChange(evento.target.value);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Filtrar por promoción:
      </label>
      
      <select
        value={promocionSeleccionada}
        onChange={handleChange}
        className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
      >
        {/* Opción por defecto para mostrar todas */}
        <option value="">Todas las promociones</option>
        
        {/* Mapear las promociones disponibles */}
        {promociones.map(promo => (
          <option key={promo} value={promo}>
            {promo}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectorPromocion;