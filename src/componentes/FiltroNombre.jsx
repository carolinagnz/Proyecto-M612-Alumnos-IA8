/**
 * COMPONENTE FILTRO NOMBRE
 * =========================
 * Campo de texto para filtrar alumnos por nombre o apellidos.
 * 
 * Props:
 * - filtro: Texto actual del filtro
 * - onFiltroChange: Función que se ejecuta al escribir en el campo
 */

function FiltroNombre({ filtro, onFiltroChange }) {
  
  const handleChange = (evento) => {
    onFiltroChange(evento.target.value);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Buscar por nombre o apellidos:
      </label>
      
      <input
        type="text"
        value={filtro}
        onChange={handleChange}
        placeholder="Escribe para filtrar..."
        className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}

export default FiltroNombre;