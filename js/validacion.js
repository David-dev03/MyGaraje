export function validarObligatorio(valor){
    if(valor.trim() === ''){
        return 'Este campo es obligatorio';
    }else{
        return null;
    }
}

export function validarLongitud(valor, min, max){
    const largo = valor.trim().length;
    if(min && largo < min){
        return 'Debe tener al menos ' + min + ' caracteres'
    }else if(max && largo > max){
        return 'No puede superar los ' + max + ' caracteres'
    }else{
        return null
    }
}

export function validarEmail(valor) {
    const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!regex.test(valor.trim())) {
        return 'Introduce un correo electrónico válido';
    }
    return null;
}

export function validarPassword(valor) {
    if (valor.length < 8) {
        return 'La contraseña debe tener al menos 8 caracteres';
    }
    if (!/[A-Z]/.test(valor)) {
        return 'Debe incluir al menos una letra mayúscula';
    }
    if (!/[0-9]/.test(valor)) {
        return 'Debe incluir al menos un número';
    }
    return null;
}

export function validarRepetirPassword(valor, passwordOriginal) {
    if (valor !== passwordOriginal) {
        return 'Las contraseñas no coinciden';
    }
    return null;
}

export function validarFechaNacimiento(valor, edadMinima) {
    if (valor === '') {
        return 'La fecha de nacimiento es obligatoria';
    }

    const fecha = new Date(valor);
    const hoy = new Date();

    if (fecha > hoy) {
        return 'La fecha de nacimiento no puede ser futura';
    }

    let edad = hoy.getFullYear() - fecha.getFullYear();
    const mes = hoy.getMonth() - fecha.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
        edad--;
    }

    if (edad < edadMinima) {
        return 'Debes tener al menos ' + edadMinima + ' años';
    }
    return null;
}

export function validarTelefono(valor, esObligatorio) {
    const limpio = valor.trim();

    if (limpio === '') {
        if (esObligatorio) {
            return 'El teléfono es obligatorio si prefieres que te llamemos';
        }
        return null;
    }

    const regex = /^[6789][0-9]{8}$/;
    if (!regex.test(limpio)) {
        return 'Introduce un teléfono válido de 9 dígitos';
    }
    return null;
}