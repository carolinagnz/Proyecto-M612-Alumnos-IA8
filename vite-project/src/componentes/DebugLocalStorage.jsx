function DebugLocalStorage() {
  
  const verDatos = () => {
    const alumnos = localStorage.getItem('alumnos');
    const auth = localStorage.getItem('auth');
    
    console.log('=== ALUMNOS ===');
    console.log(JSON.parse(alumnos));
    
    console.log('=== AUTENTICACIÓN ===');
    console.log(JSON.parse(auth));
  };
  
  const limpiarTodo = () => {
    if (window.confirm('¿Eliminar TODOS los datos de localStorage?')) {
      localStorage.clear();
      alert('LocalStorage limpiado. Recarga la página.');
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
      <h3 className="font-bold mb-2">Debug LocalStorage</h3>
      <button
        onClick={verDatos}
        className="bg-blue-500 px-3 py-1 rounded mr-2 mb-2 block w-full"
      >
        Ver Datos en Consola
      </button>
      <button
        onClick={limpiarTodo}
        className="bg-red-500 px-3 py-1 rounded block w-full"
      >
        Limpiar Todo
      </button>
    </div>
  );
}

export default DebugLocalStorage;