/**
 * COMPONENTE ALUMNO
 * ==================
 * Muestra la información de un alumno en formato de tarjeta.
 * 
 * Props:
 * - nombre: Nombre del alumno
 * - apellidos: Apellidos del alumno
 * - promo: Promoción del alumno
 * - children: Contenido hijo (Avatar)
 */

function Alumno({ nombre, apellidos, promo, children }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition-shadow">
      
      {/* Avatar (children) */}
      <div className="flex-shrink-0">
        {children}
      </div>
      
      {/* Información del alumno */}
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-gray-800">
          {nombre} {apellidos}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Promoción: {promo}
        </p>
      </div>
      
    </div>
  );
}

export default Alumno;