/**
 * COMPONENTE INFO ADMIN
 * ======================
 * Muestra información del usuario logueado y botón de logout.
 * 
 * Props:
 * - usuario: Nombre del usuario logueado
 * - onLogout: Función que se ejecuta al hacer logout
 */

function InfoAdmin({ usuario, onLogout }) {
  
  return (
    <div className="bg-blue-600 text-white py-3 px-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Información del usuario */}
        <div className="flex items-center gap-2">
          {/* Icono de usuario */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">
            Sesión iniciada como: <strong>{usuario}</strong> (Administrador)
          </span>
        </div>
        
        {/* Botón Logout */}
        <button
          onClick={onLogout}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium"
        >
          Cerrar Sesión
        </button>
        
      </div>
    </div>
  );
}

export default InfoAdmin;
