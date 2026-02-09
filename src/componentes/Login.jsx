/**
 * COMPONENTE LOGIN
 * =================
 * Formulario de inicio de sesión.
 * 
 * Props:
 * - onLogin: Función que se ejecuta cuando el login es exitoso
 */

import { useState } from 'react';

function Login({ onLogin }) {
  
  // Estados locales del formulario
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  /**
   * Manejador del envío del formulario
   */
  const handleSubmit = (evento) => {
    // Prevenir que el formulario recargue la página
    evento.preventDefault();
    
    // Limpiar errores anteriores
    setError('');
    
    // Validación básica
    if (!usuario || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }
    
    // Intentar hacer login (llamamos a la función del padre)
    const resultado = onLogin(usuario, password);
    
    if (!resultado) {
      setError('Usuario o contraseña incorrectos');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h2>
        
        <form onSubmit={handleSubmit}>
          
          {/* Campo Usuario */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usuario
            </label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Escribe tu usuario"
            />
          </div>
          
          {/* Campo Contraseña */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Escribe tu contraseña"
            />
          </div>
          
          {/* Mensaje de Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          {/* Botón Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Iniciar Sesión
          </button>
          
        </form>
        
        {/* Ayuda */}
        <div className="mt-4 text-sm text-gray-600 text-center">
          <p>Credenciales de prueba:</p>
          <p className="font-mono bg-gray-100 p-2 rounded mt-1">
            admin / admin123
          </p>
        </div>
        
      </div>
    </div>
  );
}

export default Login;