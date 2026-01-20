/**
 * SERVICIO DE ALUMNOS
 * ====================
 * Maneja todas las operaciones CRUD con localStorage.
 * 
 * localStorage es como una "base de datos" del navegador que
 * guarda información incluso cuando cierras la pestaña.
 */

const STORAGE_KEY = 'alumnos';

export const alumnosService = {
  
  /**
   * Obtener todos los alumnos de localStorage
   * Si no hay datos guardados, devuelve null
   */
  getAll: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      // localStorage guarda todo como texto, así que lo convertimos a objeto
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error al leer localStorage:', error);
      return null;
    }
  },
  
  /**
   * Guardar todos los alumnos en localStorage
   */
  saveAll: (alumnos) => {
    try {
      // Convertimos el array de alumnos a texto JSON
      localStorage.setItem(STORAGE_KEY, JSON.stringify(alumnos));
      return true;
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
      return false;
    }
  },
  
  /**
   * Crear un nuevo alumno
   * Le asigna un ID único automáticamente
   */
  create: (alumno) => {
    try {
      const alumnos = alumnosService.getAll() || [];
      
      // Generamos un ID único (el mayor ID actual + 1)
      const nuevoId = alumnos.length > 0 
        ? Math.max(...alumnos.map(a => a.id)) + 1 
        : 1;
      
      // Creamos el nuevo alumno con su ID
      const nuevoAlumno = { ...alumno, id: nuevoId };
      alumnos.push(nuevoAlumno);
      
      // Guardamos en localStorage
      alumnosService.saveAll(alumnos);
      return nuevoAlumno;
    } catch (error) {
      console.error('Error al crear alumno:', error);
      return null;
    }
  },
  
  /**
   * Actualizar un alumno existente por su ID
   */
  update: (id, datosActualizados) => {
    try {
      const alumnos = alumnosService.getAll() || [];
      
      // Buscamos la posición del alumno en el array
      const index = alumnos.findIndex(a => a.id === id);
      
      if (index === -1) {
        console.error('Alumno no encontrado');
        return false;
      }
      
      // Actualizamos los datos manteniendo el ID
      alumnos[index] = { ...datosActualizados, id };
      
      // Guardamos en localStorage
      alumnosService.saveAll(alumnos);
      return true;
    } catch (error) {
      console.error('Error al actualizar alumno:', error);
      return false;
    }
  },
  
  /**
   * Eliminar un alumno por su ID
   */
  delete: (id) => {
    try {
      const alumnos = alumnosService.getAll() || [];
      
      // Filtramos todos los alumnos excepto el que queremos eliminar
      const alumnosFiltrados = alumnos.filter(a => a.id !== id);
      
      // Guardamos en localStorage
      alumnosService.saveAll(alumnosFiltrados);
      return true;
    } catch (error) {
      console.error('Error al eliminar alumno:', error);
      return false;
    }
  }
};