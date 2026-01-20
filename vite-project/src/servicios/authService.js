/**
 * SERVICIO DE AUTENTICACIÓN
 * ==========================
 * Maneja el login, logout y verificación de usuarios.
 * 
 * IMPORTANTE: En producción NUNCA guardes contraseñas en el código.
 * Esto es solo para propósitos educativos.
 */

const AUTH_STORAGE_KEY = 'auth';

// Usuario administrador por defecto (solo para desarrollo)
const ADMIN_USER = {
  usuario: 'admin',
  password: 'admin123',
  esAdmin: true
};

export const authService = {
  
  /**
   * Intentar hacer login con credenciales
   * Devuelve los datos del usuario si son correctos, null si no
   */
  login: (usuario, password) => {
    // Comparamos con nuestro usuario administrador
    if (usuario === ADMIN_USER.usuario && password === ADMIN_USER.password) {
      
      // Creamos el objeto de sesión (SIN la contraseña por seguridad)
      const sesion = {
        usuario: ADMIN_USER.usuario,
        esAdmin: ADMIN_USER.esAdmin,
        timestamp: new Date().toISOString()
      };
      
      // Guardamos la sesión en localStorage
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sesion));
      
      return sesion;
    }
    
    // Credenciales incorrectas
    return null;
  },
  
  /**
   * Cerrar sesión (logout)
   * Elimina los datos de sesión del localStorage
   */
  logout: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },
  
  /**
   * Obtener la sesión actual del usuario
   * Devuelve los datos si hay sesión activa, null si no
   */
  getSesionActual: () => {
    try {
      const data = localStorage.getItem(AUTH_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error al leer sesión:', error);
      return null;
    }
  },
  
  /**
   * Verificar si el usuario actual es administrador
   */
  esAdmin: () => {
    const sesion = authService.getSesionActual();
    return sesion ? sesion.esAdmin : false;
  }
};