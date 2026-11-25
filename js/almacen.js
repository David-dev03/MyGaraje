export function obtenerTodos(coleccion){
    const texto = localStorage.getItem(coleccion);
    if (texto === null){
        return [];
    }else{
        return JSON.parse(texto);
    }
}

export function obtenerPorId(coleccion, id){
    const todos = obtenerTodos(coleccion);
    for (let i = 0; i < todos.length; i++){
        if(todos[i].id === id){
            return todos[i];
        }
    }
    return null;
}

export function crear(coleccion, dato){
    const todos = obtenerTodos(coleccion);
    if (!dato.id){
        dato.id = Date.now();
    }
    todos.push(dato);
    localStorage.setItem(coleccion,JSON.stringify(todos));
    return dato;
}

export function actualizar(coleccion, id, dato){
    const todos = obtenerTodos(coleccion);
    for(let i = 0; i < todos.length; i++){
        if (todos[i].id === id){
            dato.id = id;
            todos[i] = dato;
            break;
        }
    }
    localStorage.setItem(coleccion,JSON.stringify(todos));
}

export function borrar(coleccion, id){
    const todos = obtenerTodos(coleccion);
    const nuevaLista = [];
    for (let i = 0; i < todos.length; i++){
        if (todos[i].id !== id){
            nuevaLista.push(todos[i])
        }
    }
    localStorage.setItem(coleccion,JSON.stringify(nuevaLista));
}

export function obtenerValor(clave){
    return localStorage.getItem(clave);
}

export function guardarValor(clave, valor){
    localStorage.setItem(clave, String(valor));
}

export function borrarValor(clave){
    localStorage.removeItem(clave);
}