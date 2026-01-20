/**
 * COMPONENTE APP - EJERCICIO 2 COMPLETO
 * ======================================
 * Aplicación completa con:
 * - Sistema de autenticación
 * - CRUD de alumnos (Crear, Leer, Actualizar, Eliminar)
 * - Persistencia en localStorage
 * - Filtros por promoción y nombre
 */

import { useState, useEffect } from 'react';
import alumnosDataInicial from './data/alumnos.json';
import { alumnosService } from './servicios/alumnosService';
import { authService } from './servicios/authService';
import Login from './componentes/Login';
import InfoAdmin from './componentes/InfoAdmin';
import SelectorPromocion from './componentes/SelectorPromocion';
import FiltroNombre from './componentes/FiltroNombre';
import Alumno from './componentes/Alumno';
import Avatar from './componentes/Avatar';
import FormularioAlumno from './componentes/FormularioAlumno';

function App() {
  
  /* ================================================
     ESTADOS DE AUTENTICACIÓN
     ================================================ */
  
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [esAdmin, setEsAdmin] = useState(false);
  
  
  /* ================================================
     ESTADOS DE DATOS
     ================================================ */
  
  const [alumnos, setAlumnos] = useState([]);
  
  
  /* ================================================
     ESTADOS DE FILTROS
     ================================================ */
  
  const [promocionSeleccionada, setPromocionSeleccionada] = useState('');
  const [filtroNombre, setFiltroNombre] = useState('');
  
  
  /* ================================================
     ESTADOS DEL FORMULARIO
     ================================================ */
  
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [alumnoEditando, setAlumnoEditando] = useState(null);
  
  
  /* ================================================
     CARGAR DATOS INICIALES
     ================================================ */
  
  /**
   * useEffect se ejecuta cuando el componente se monta.
   * Aquí cargamos:
   * 1. La sesión del usuario (si existe)
   * 2. Los alumnos desde localStorage (o datos iniciales si no hay)
   */
  useEffect(() => {
    // Cargar sesión
    const sesion = authService.getSesionActual();
    if (sesion) {
      setUsuarioLogueado(sesion.usuario);
      setEsAdmin(sesion.esAdmin);
    }
    
    // Cargar alumnos
    const alumnosGuardados = alumnosService.getAll();
    if (alumnosGuardados && alumnosGuardados.length > 0) {
      // Si hay datos en localStorage, usarlos
      setAlumnos(alumnosGuardados);
    } else {
      // Si no hay datos, usar los datos iniciales del JSON
      setAlumnos(alumnosDataInicial);
      // Y guardarlos en localStorage para la próxima vez
      alumnosService.saveAll(alumnosDataInicial);
    }
  }, []); // El array vacío [] significa que solo se ejecuta una vez al montar
  
  
  /* ================================================
     FUNCIONES DE AUTENTICACIÓN
     ================================================ */
  
  /**
   * Manejar el login del usuario
   */
  const handleLogin = (usuario, password) => {
    const resultado = authService.login(usuario, password);
    
    if (resultado) {
      setUsuarioLogueado(resultado.usuario);
      setEsAdmin(resultado.esAdmin);
      return true;
    }
    
    return false;
  };
  
  /**
   * Manejar el logout del usuario
   */
  const handleLogout = () => {
    authService.logout();
    setUsuarioLogueado(null);
    setEsAdmin(false);
  };
  
  
  /* ================================================
     FUNCIONES CRUD DE ALUMNOS
     ================================================ */
  
  /**
   * Crear un nuevo alumno
   */
  const crearAlumno = (datosAlumno) => {
    const nuevoAlumno = alumnosService.create(datosAlumno);
    
    if (nuevoAlumno) {
      // Actualizamos el estado con el nuevo alumno
      setAlumnos([...alumnos, nuevoAlumno]);
      setMostrarFormulario(false);
    }
  };
  
  /**
   * Actualizar un alumno existente
   */
  const editarAlumno = (datosAlumno) => {
    const exito = alumnosService.update(datosAlumno.id, datosAlumno);
    
    if (exito) {
      // Actualizamos el estado reemplazando el alumno modificado
      setAlumnos(alumnos.map(a => 
        a.id === datosAlumno.id ? datosAlumno : a
      ));
      setMostrarFormulario(false);
      setAlumnoEditando(null);
    }
  };
  
  /**
   * Eliminar un alumno
   */
  const eliminarAlumno = (id) => {
    // Pedimos confirmación antes de eliminar
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este alumno?');
    
    if (confirmar) {
      const exito = alumnosService.delete(id);
      
      if (exito) {
        // Actualizamos el estado filtrando el alumno eliminado
        setAlumnos(alumnos.filter(a => a.id !== id));
      }
    }
  };
  
  
  /* ================================================
     FUNCIONES DEL FORMULARIO
     ================================================ */
  
  /**
   * Manejar el envío del formulario (crear o editar)
   */
  const handleSubmitFormulario = (datosAlumno) => {
    if (alumnoEditando) {
      // Modo editar
      editarAlumno(datosAlumno);
    } else {
      // Modo crear
      crearAlumno(datosAlumno);
    }
  };
  
  /**
   * Abrir formulario en modo crear
   */
  const abrirFormularioCrear = () => {
    setAlumnoEditando(null);
    setMostrarFormulario(true);
  };
  
  /**
   * Abrir formulario en modo editar
   */
  const abrirFormularioEditar = (alumno) => {
    setAlumnoEditando(alumno);
    setMostrarFormulario(true);
  };
  
  /**
   * Cerrar formulario
   */
  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setAlumnoEditando(null);
  };
  
  
  /* ================================================
     FUNCIONES DE FILTROS
     ================================================ */
  
  const handlePromocionChange = (nuevaPromocion) => {
    setPromocionSeleccionada(nuevaPromocion);
  };
  
  const handleFiltroNombreChange = (nuevoFiltro) => {
    setFiltroNombre(nuevoFiltro);
  };
  
  
  /* ================================================
     FILTRADO DE ALUMNOS
     ================================================ */
  
  // Extraer promociones únicas
  const promocionesUnicas = [...new Set(alumnos.map(alumno => alumno.promocion))];
  
  // Aplicar filtros
  const alumnosFiltrados = alumnos
    .filter(alumno => {
      if (promocionSeleccionada === '') return true;
      return alumno.promocion === promocionSeleccionada;
    })
    .filter(alumno => {
      if (filtroNombre === '') return true;
      const nombreCompleto = `${alumno.nombre} ${alumno.apellidos}`.toLowerCase();
      const textoBusqueda = filtroNombre.toLowerCase();
      return nombreCompleto.includes(textoBusqueda);
    });
  
  
  /* ================================================
     RENDERIZADO CONDICIONAL
     ================================================ */
  
  // Si no hay usuario logueado, mostrar pantalla de login
  if (!usuarioLogueado) {
    return <Login onLogin={handleLogin} />;
  }
  
  
  /* ================================================
     RENDERIZADO PRINCIPAL (USUARIO LOGUEADO)
     ================================================ */
  
  return (
    <>
      {/* Barra de información del admin */}
      <InfoAdmin 
        usuario={usuarioLogueado}
        onLogout={handleLogout}
      />
      
      {/* Contenido principal */}
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Título principal */}
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Gestión de Alumnos
          </h1>
          
          {/* Botón para crear nuevo alumno (solo admin) */}
          {esAdmin && (
            <div className="mb-6 flex justify-end">
              <button
                onClick={abrirFormularioCrear}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
              >
                {/* Icono de + */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Nuevo Alumno
              </button>
            </div>
          )}
          
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
            Mostrando {alumnosFiltrados.length} de {alumnos.length} alumnos
          </div>
          
          {/* Grid de alumnos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {alumnosFiltrados.length > 0 ? (
              alumnosFiltrados.map(alumno => (
                <Alumno
                  key={alumno.id}
                  nombre={alumno.nombre}
                  apellidos={alumno.apellidos}
                  promo={alumno.promocion}
                  esAdmin={esAdmin}
                  onEdit={() => abrirFormularioEditar(alumno)}
                  onDelete={() => eliminarAlumno(alumno.id)}
                >
                  <Avatar urlImagen={alumno.urlImagen} />
                </Alumno>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-gray-500">
                No se encontraron alumnos con los criterios seleccionados
              </div>
            )}
          </div>
          
        </div>
      </div>
      
      {/* Formulario Modal (se muestra solo cuando mostrarFormulario es true) */}
      {mostrarFormulario && (
        <FormularioAlumno
          alumno={alumnoEditando}
          onSubmit={handleSubmitFormulario}
          onCancel={cerrarFormulario}
        />
      )}
    </>
  );
}

export default App;