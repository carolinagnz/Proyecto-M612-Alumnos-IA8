/**
 * COMPONENTE AVATAR
 * =================
 * Muestra la imagen de perfil de un alumno.
 * 
 * Props:
 * - urlImagen: URL de la imagen del alumno
 */

function Avatar({ urlImagen }) {
  return (
    <img 
      src={urlImagen} 
      alt="Avatar del alumno" 
      className="w-24 h-24 rounded-full object-cover shadow-lg"
    />
  );
}

export default Avatar;