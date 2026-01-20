/**
 * COMPONENTE FORMULARIO ALUMNO
 * =============================
 * Formulario modal para crear o editar alumnos.
 * 
 * MODOS:
 * - CREAR: cuando alumno es null
 * - EDITAR: cuando alumno contiene datos
 * 
 * Props:
 * - alumno: Objeto con datos del alumno (null para crear nuevo)
 * - onSubmit: Función que se ejecuta al guardar
 * - onCancel: Función que se ejecuta al cancelar
 */

import { useState, useEffect } from 'react';

function FormularioAlumno({ alumno, onSubmit, onCancel }) {
  
  /* ==========================================
     ESTADOS DEL FORMULARIO
     ========================================== */
  
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [promocion, setPromocion] = useState('');
  const [ciclo, setCiclo] = useState('');
  const [urlImagen, setUrlImagen] = useState('');
  const [errores, setErrores] = useState({});
  
  
  /* ==========================================
     CARGAR DATOS SI ESTAMOS EDITANDO
     ========================================== */
  
  /**
   * useEffect se ejecuta cuando el componente se monta
   * o cuando cambia la prop "alumno".
   * 
   * Si hay un alumno (modo editar), cargamos sus datos.
   */
  useEffect(() => {
    if (alumno) {
      setNombre(alumno.nombre);
      setApellidos(alumno.apellidos);
      setPromocion(alumno.promocion);
      setCiclo(alumno.ciclo);
      setUrlImagen(alumno.urlImagen);
    } else {
      // Modo crear: limpiamos los campos
      setNombre('');
      setApellidos('');
      setPromocion('');
      setCiclo('');
      setUrlImagen('');
    }
  }, [alumno]);
  
  
  /* ==========================================
     VALIDACIÓN DEL FORMULARIO
     ========================================== */
  
  /**
   * Valida todos los campos del formulario.
   * Devuelve true si todo está bien, false si hay errores.
   */
  const validarFormulario = () => {
    const nuevosErrores = {};
    
    if (!nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    }
    
    if (!apellidos.trim()) {
      nuevosErrores.apellidos = 'Los apellidos son obligatorios';
    }
    
    if (!promocion) {
      nuevosErrores.promocion = 'Debes seleccionar una promoción';
    }
    
    if (!ciclo) {
      nuevosErrores.ciclo = 'Debes seleccionar un ciclo';
    }
    
    if (!urlImagen.trim()) {
      nuevosErrores.urlImagen = 'La URL de la imagen es obligatoria';
    }
    
    setErrores(nuevosErrores);
    
    // Si el objeto de errores está vacío, no hay errores
    return Object.keys(nuevosErrores).length === 0;
  };
  
  
  /* ==========================================
     MANEJADOR DEL SUBMIT
     ========================================== */
  
  const handleSubmit = (evento) => {
    evento.preventDefault();
    
    // Validar antes de enviar
    if (!validarFormulario()) {
      return;
    }
    
    // Crear el objeto con los datos del alumno
    const datosAlumno = {
      nombre: nombre.trim(),
      apellidos: apellidos.trim(),
      promocion,
      ciclo,
      urlImagen: urlImagen.trim()
    };
    
    // Si estamos editando, añadir el ID
    if (alumno) {
      datosAlumno.id = alumno.id;
    }
    
    // Llamar a la función que nos pasó el padre
    onSubmit(datosAlumno);
  };
  
  
  /* ==========================================
     RENDERIZADO
     ========================================== */
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      {/* Modal: fondo oscuro + contenedor blanco centrado */}
      
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl max-h-screen overflow-y-auto">
        
        {/* Título dinámico según el modo */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {alumno ? 'Editar Alumno' : 'Nuevo Alumno'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          
          {/* Campo Nombre */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre *
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errores.nombre ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ej: Ana"
            />
            {errores.nombre && (
              <p className="mt-1 text-sm text-red-600">{errores.nombre}</p>
            )}
          </div>
          
          {/* Campo Apellidos */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apellidos *
            </label>
            <input
              type="text"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errores.apellidos ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ej: García López"
            />
            {errores.apellidos && (
              <p className="mt-1 text-sm text-red-600">{errores.apellidos}</p>
            )}
          </div>
          
          {/* Campo Promoción */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Promoción *
            </label>
            <select
              value={promocion}
              onChange={(e) => setPromocion(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errores.promocion ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Selecciona...</option>
              <option value="2024/2025">2024/2025</option>
              <option value="2023/2024">2023/2024</option>
              <option value="2022/2023">2022/2023</option>
            </select>
            {errores.promocion && (
              <p className="mt-1 text-sm text-red-600">{errores.promocion}</p>
            )}
          </div>
          
          {/* Campo Ciclo */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ciclo *
            </label>
            <select
              value={ciclo}
              onChange={(e) => setCiclo(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errores.ciclo ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Selecciona...</option>
              <option value="DAW">DAW</option>
              <option value="SMX">SMX</option>
              <option value="ARI">ARI</option>
              <option value="IEA">IEA</option>
            </select>
            {errores.ciclo && (
              <p className="mt-1 text-sm text-red-600">{errores.ciclo}</p>
            )}
          </div>
          
          {/* Campo URL Imagen */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL de la Imagen *
            </label>
            <input
              type="url"
              value={urlImagen}
              onChange={(e) => setUrlImagen(e.target.value)}
              placeholder="https://ejemplo.com/imagen.jpg"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errores.urlImagen ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errores.urlImagen && (
              <p className="mt-1 text-sm text-red-600">{errores.urlImagen}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Prueba con: https://randomuser.me/api/portraits/women/5.jpg
            </p>
          </div>
          
          {/* Botones */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {alumno ? 'Guardar Cambios' : 'Crear Alumno'}
            </button>
            
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
            >
              Cancelar
            </button>
          </div>
          
        </form>
        
      </div>
    </div>
  );
}

export default FormularioAlumno;