/**
 * COMPONENTE APP - EJERCICIO 1
 * ==============================
 * Componente principal que gestiona la aplicación de alumnos.
 * 
 * Funcionalidades:
 * - Cargar datos de alumnos desde JSON
 * - Filtrar por promoción
 * - Filtrar por nombre/apellidos
 * - Mostrar resultados filtrados
 */

import { useState } from 'react';
import alumnosData from './data/alumnos.json';
import SelectorPromocion from './componentes/SelectorPromocion';
import FiltroNombre from './componentes/FiltroNombre';
import Alumno from './componentes/Alumno';
import Avatar from './componentes/Avatar';

function App() {
  
  /* ==========================================
     ESTADOS DE LA APLICACIÓN
     ========================================== */
  
  // Estado para la promoción seleccionada
  const [promocionSeleccionada, setPromocionSeleccionada] = useState('');
  
  // Estado para el filtro de nombre/apellidos
  const [filtroNombre, setFiltroNombre] = useState('');
  
  
  /* ==========================================
     EXTRAER PROMOCIONES ÚNICAS
     ========================================== */
  
  // Creamos un array con las promociones únicas usando Set
  // Set elimina duplicados automáticamente
  const promocionesUnicas = [...new Set(alumnosData.map(alumno => alumno.promocion))];
  
  
  /* ==========================================
     FILTRADO DE ALUMNOS
     ========================================== */
  
  const alumnosFiltrados = alumnosData
    // Filtro 1: Por promoción
    .filter(alumno => {
      // Si no hay promoción seleccionada, mostrar todos
      if (promocionSeleccionada === '') return true;
      // Si hay promoción seleccionada, solo mostrar los que coinciden
      return alumno.promocion === promocionSeleccionada;
    })
    // Filtro 2: Por nombre o apellidos
    .filter(alumno => {
      // Si no hay texto en el filtro, mostrar todos
      if (filtroNombre === '') return true;
      
      // Convertir a minúsculas para búsqueda case-insensitive
      const nombreCompleto = `${alumno.nombre} ${alumno.apellidos}`.toLowerCase();
      const textoBusqueda = filtroNombre.toLowerCase();
      
      // Verificar si el texto está incluido en nombre o apellidos
      return nombreCompleto.includes(textoBusqueda);
    });
  
  
  /* ==========================================
     FUNCIONES MANEJADORAS
     ========================================== */
  
  const handlePromocionChange = (nuevaPromocion) => {
    setPromocionSeleccionada(nuevaPromocion);
  };
  
  const handleFiltroNombreChange = (nuevoFiltro) => {
    setFiltroNombre(nuevoFiltro);
  };
  
  
  /* ==========================================
     RENDERIZADO
     ========================================== */
  
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Título principal */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Gestión de Alumnos
        </h1>
        
        {/* Panel de filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <SelectorPromocion 
            promociones={promocionesUnicas}
            promocionSeleccionada={promocionSeleccionada}
            onPromocionChange={handlePromocionChange}
          />
          
          <FiltroNombre 
            filtro={filtroNombre}
            onFiltroChange={handleFiltroNombreChange}
          />
        </div>
        
        {/* Información de resultados */}
        <div className="mb-4 text-gray-600">
          Mostrando {alumnosFiltrados.length} de {alumnosData.length} alumnos
        </div>
        
        {/* Grid de alumnos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {alumnosFiltrados.length > 0 ? (
            // Si hay alumnos, mostrarlos
            alumnosFiltrados.map(alumno => (
              <Alumno
                key={alumno.id}
                nombre={alumno.nombre}
                apellidos={alumno.apellidos}
                promo={alumno.promocion}
              >
                <Avatar urlImagen={alumno.urlImagen} />
              </Alumno>
            ))
          ) : (
            // Si no hay alumnos, mostrar mensaje
            <div className="col-span-2 text-center py-12 text-gray-500">
              No se encontraron alumnos con los criterios seleccionados
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

export default App;