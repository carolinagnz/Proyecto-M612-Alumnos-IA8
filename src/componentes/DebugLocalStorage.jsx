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
      window.location.reload();
    }
  };
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#1f2937',
      color: 'white',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      zIndex: 9999
    }}>
      <h3 className="font-bold mb-2">Debug LocalStorage</h3>
      <button
        onClick={verDatos}
        className="bg-blue-500 px-3 py-1 rounded mr-2 mb-2 block w-full hover:bg-blue-600"
      >
        Ver Datos en Consola
      </button>
      <button
        onClick={limpiarTodo}
        className="bg-red-500 px-3 py-1 rounded block w-full hover:bg-red-600"
      >
        Limpiar Todo
      </button>
    </div>
  );
}

export default DebugLocalStorage;