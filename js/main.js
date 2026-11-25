import { motos, mantenimientos } from './datos.js';
import { renderListadoMotos, renderAlertas, renderDetalleMoto, renderUsuarios, renderMensajes } from './ui.js';
import { obtenerTodos, obtenerPorId, crear, actualizar, borrar, obtenerValor, guardarValor, borrarValor } from './almacen.js';
import {
    validarObligatorio,
    validarLongitud,
    validarEmail,
    validarPassword,
    validarRepetirPassword,
    validarFechaNacimiento,
    validarTelefono
} from './validacion.js';

const vistaDetalle = document.querySelector('#vista-detalle');
const tituloGaraje = document.querySelector('#titulo-garaje');
const contenedorMotos = document.querySelector('#contenedor-motos');
const contenedorAlertas = document.querySelector('#contenedor-alertas');
const vistas = document.querySelectorAll('.vista');
const enlacesNav = document.querySelectorAll('.nav-links a');

const formRegistro = document.querySelector('#form-registro');
const tituloRegistro = document.querySelector('#titulo-registro');
const btnGuardarUsuario = document.querySelector('#btn-guardar-usuario');
const btnCancelarEdicion = document.querySelector('#btn-cancelar-edicion');
const contenedorUsuarios = document.querySelector('#contenedor-usuarios');

const regNombre = document.querySelector('#reg-nombre');
const regCorreo = document.querySelector('#reg-correo');
const regPassword = document.querySelector('#reg-password');
const regRepetir = document.querySelector('#reg-repetir');
const regFecha = document.querySelector('#reg-fecha');
const regCondiciones = document.querySelector('#reg-condiciones');

const formContacto = document.querySelector('#form-contacto');
const contenedorMensajes = document.querySelector('#contenedor-mensajes');
const conNombre = document.querySelector('#con-nombre');
const conCorreo = document.querySelector('#con-correo');
const conTelefono = document.querySelector('#con-telefono');
const conLlamar = document.querySelector('#con-llamar');
const conMotivo = document.querySelector('#con-motivo');
const conMensaje = document.querySelector('#con-mensaje');
const contadorMensaje = document.querySelector('#contador-mensaje');

let idUsuarioEditando = null;

function obtenerIdPerfilActivo() {
    const guardado = obtenerValor('perfilActivoId');
    if (guardado === null) {
        return null;
    }
    return Number(guardado);
}

function actualizarTituloPerfil() {
    const idPerfil = obtenerIdPerfilActivo();
    if (idPerfil === null) {
        tituloGaraje.textContent = 'MyGaraje';
        return;
    }
    const usuario = obtenerPorId('usuarios', idPerfil);
    if (usuario) {
        tituloGaraje.textContent = 'MyGaraje · Perfil: ' + usuario.nombre;
    } else {
        tituloGaraje.textContent = 'MyGaraje';
    }
}

function pintarUsuarios() {
    renderUsuarios(obtenerTodos('usuarios'), contenedorUsuarios, obtenerIdPerfilActivo());
    actualizarTituloPerfil();
}

function buscarMotoPorId(idBuscado) {
    return obtenerPorId('motos', idBuscado);
}

function buscarMantenimientosDeMoto(idBuscado) {
    const listaMantenimientos = obtenerTodos('mantenimientos');
    const resultado = [];

    for (let i = 0; i < listaMantenimientos.length; i++) {
        if (listaMantenimientos[i].motoId === idBuscado) {
            resultado.push(listaMantenimientos[i]);
        }
    }

    return resultado;
}

function mostrarVista(idVista) {
    for (let i = 0; i < vistas.length; i++) {
        vistas[i].classList.add('oculto');
    }

    const vistaElegida = document.querySelector('#' + idVista);
    if (vistaElegida) {
        vistaElegida.classList.remove('oculto');
    }

    let vistaMenu = idVista;
    if (idVista === 'vista-usuarios') {
        vistaMenu = 'vista-registro';
    } else if (idVista === 'vista-mensajes') {
        vistaMenu = 'vista-contacto';
    }

    for (let i = 0; i < enlacesNav.length; i++) {
        enlacesNav[i].classList.remove('activo');
        if (enlacesNav[i].dataset.vista === vistaMenu) {
            enlacesNav[i].classList.add('activo');
        }
    }
    window.scrollTo(0, 0);
}

function manejarClicNav(event) {
    const boton = event.target.closest('[data-vista]');
    if (!boton) {
        return;
    }
    event.preventDefault();
    mostrarVista(boton.dataset.vista);
}

function mostrarDetalle(motoId) {
    const motoSeleccionada = buscarMotoPorId(motoId);
    if (!motoSeleccionada) {
        return;
    }

    const mantenimientosAsociados = buscarMantenimientosDeMoto(motoId);
    renderDetalleMoto(motoSeleccionada, mantenimientosAsociados, vistaDetalle);

    mostrarVista('vista-detalle');
}

function volverAListado() {
    mostrarVista('vista-listado');
}

function manejarClicMotos(event) {
    const boton = event.target.closest('.btn-ver-moto');
    if (!boton) {
        return;
    }

    const motoId = Number(boton.dataset.id);
    mostrarDetalle(motoId);
}

function manejarClicDetalle(event) {
    if (event.target.id === 'btn-volver') {
        volverAListado();
    }
}

function mostrarErrorCampo(campo, mensaje) {
    const idError = campo.getAttribute('aria-describedby');
    const cajaError = document.querySelector('#' + idError);

    if (mensaje) {
        cajaError.textContent = mensaje;
        campo.setAttribute('aria-invalid', 'true');
    } else {
        cajaError.textContent = '';
        campo.setAttribute('aria-invalid', 'false');
    }
}

function obtenerErrorRegistro(campo) {
    if (campo.type === 'checkbox') {
        if (campo.required && !campo.checked) {
            return 'Debes aceptar las condiciones de uso';
        }
        return null;
    }

    if (campo.required) {
        const errorObligatorio = validarObligatorio(campo.value);
        if (errorObligatorio) {
            return errorObligatorio;
        }
    }

    if (campo.id === 'reg-nombre') {
        const min = campo.minLength > 0 ? campo.minLength : null;
        const max = campo.maxLength > 0 ? campo.maxLength : null;
        return validarLongitud(campo.value, min, max);
    }

    if (campo.id === 'reg-correo') {
        return validarEmail(campo.value);
    }

    if (campo.id === 'reg-password') {
        return validarPassword(campo.value);
    }

    if (campo.id === 'reg-repetir') {
        return validarRepetirPassword(campo.value, regPassword.value);
    }

    if (campo.id === 'reg-fecha') {
        if (campo.min && campo.value < campo.min) {
            return 'La fecha no puede ser anterior a ' + campo.min;
        }
        if (campo.max && campo.value > campo.max) {
            return 'La fecha no puede ser posterior a ' + campo.max;
        }
        return validarFechaNacimiento(campo.value, 16);
    }

    return null;
}

function validarCampoRegistro(campo) {
    const error = obtenerErrorRegistro(campo);
    mostrarErrorCampo(campo, error);
    return error === null;
}

function limpiarFormularioRegistro() {
    formRegistro.reset();
    idUsuarioEditando = null;
    tituloRegistro.textContent = 'Registro de usuario';
    btnGuardarUsuario.textContent = 'Registrarme';
    btnCancelarEdicion.classList.add('oculto');

    const campos = [regNombre, regCorreo, regPassword, regRepetir, regFecha, regCondiciones];
    for (let i = 0; i < campos.length; i++) {
        delete campos[i].dataset.tocado;
        mostrarErrorCampo(campos[i], null);
    }
}

function manejarBlurRegistro(event) {
    const campo = event.target;
    if (!campo.name) {
        return;
    }
    campo.dataset.tocado = 'true';
    validarCampoRegistro(campo);
}

function manejarInputRegistro(event) {
    const campo = event.target;
    if (!campo.name) {
        return;
    }
    if (campo.dataset.tocado === 'true') {
        validarCampoRegistro(campo);
    }
    if (campo.id === 'reg-password' && regRepetir.dataset.tocado === 'true') {
        validarCampoRegistro(regRepetir);
    }
}

function manejarSubmitRegistro(event) {
    event.preventDefault();

    const campos = [regNombre, regCorreo, regPassword, regRepetir, regFecha, regCondiciones];
    let primerCampoConError = null;

    for (let i = 0; i < campos.length; i++) {
        campos[i].dataset.tocado = 'true';
        const esValido = validarCampoRegistro(campos[i]);
        if (!esValido && !primerCampoConError) {
            primerCampoConError = campos[i];
        }
    }

    if (primerCampoConError) {
        primerCampoConError.focus();
        return;
    }

    const datosUsuario = {
        nombre: regNombre.value.trim(),
        correo: regCorreo.value.trim(),
        fechaNacimiento: regFecha.value,
        condicionesAceptadas: Boolean(regCondiciones.checked)
    };

    if (idUsuarioEditando !== null) {
        actualizar('usuarios', idUsuarioEditando, datosUsuario);
    } else {
        crear('usuarios', datosUsuario);
    }

    limpiarFormularioRegistro();
    pintarUsuarios();
    mostrarVista('vista-usuarios');
}

function manejarClicUsuarios(event) {
    const botonPerfil = event.target.closest('.btn-usar-perfil');
    if (botonPerfil) {
        const id = Number(botonPerfil.dataset.id);
        guardarValor('perfilActivoId', id);
        pintarUsuarios();
        return;
    }
    const botonBorrar = event.target.closest('.btn-borrar-usuario');
    if (botonBorrar) {
        const id = Number(botonBorrar.dataset.id);
        if (confirm('¿Seguro que quieres borrar este usuario?')) {
            borrar('usuarios', id);
            if (obtenerIdPerfilActivo() === id) {
                borrarValor('perfilActivoId');
            }
            pintarUsuarios();
        }
        return;
    }

    const botonEditar = event.target.closest('.btn-editar-usuario');
    if (botonEditar) {
        const id = Number(botonEditar.dataset.id);
        const usuario = obtenerPorId('usuarios', id);
        if (!usuario) {
            return;
        }

        limpiarFormularioRegistro();
        idUsuarioEditando = id;
        regNombre.value = usuario.nombre;
        regCorreo.value = usuario.correo;
        regFecha.value = usuario.fechaNacimiento;
        regCondiciones.checked = Boolean(usuario.condicionesAceptadas);

        tituloRegistro.textContent = 'Editar usuario';
        btnGuardarUsuario.textContent = 'Guardar cambios';
        btnCancelarEdicion.classList.remove('oculto');
        mostrarVista('vista-registro');
    }
}

function guardarCookie(nombreCookie, valor, dias) {
    const fecha = new Date();
    fecha.setTime(fecha.getTime() + dias * 24 * 60 * 60 * 1000);
    document.cookie = nombreCookie + '=' + encodeURIComponent(valor) + '; expires=' + fecha.toUTCString() + '; path=/';
}

function leerCookie(nombreCookie) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const trozo = cookies[i].trim();
        if (trozo.indexOf(nombreCookie + '=') === 0) {
            return decodeURIComponent(trozo.substring(nombreCookie.length + 1));
        }
    }
    return '';
}

function cargarContactoDesdeCookie() {
    const nombreGuardado = leerCookie('contactoNombre');
    const correoGuardado = leerCookie('contactoCorreo');

    if (nombreGuardado !== '') {
        conNombre.value = nombreGuardado;
    }
    if (correoGuardado !== '') {
        conCorreo.value = correoGuardado;
    }
}

function actualizarContadorMensaje() {
    const max = conMensaje.maxLength > 0 ? conMensaje.maxLength : 300;
    contadorMensaje.textContent = conMensaje.value.length + ' / ' + max;
}

function obtenerErrorContacto(campo) {
    if (campo.id === 'con-llamar') {
        return null;
    }

    if (campo.required) {
        const errorObligatorio = validarObligatorio(campo.value);
        if (errorObligatorio) {
            return errorObligatorio;
        }
    }

    if (campo.id === 'con-nombre' || campo.id === 'con-mensaje') {
        const min = campo.minLength > 0 ? campo.minLength : null;
        const max = campo.maxLength > 0 ? campo.maxLength : null;
        return validarLongitud(campo.value, min, max);
    }

    if (campo.id === 'con-correo') {
        return validarEmail(campo.value);
    }

    if (campo.id === 'con-telefono') {
        return validarTelefono(campo.value, conLlamar.checked);
    }

    return null;
}

function validarCampoContacto(campo) {
    const error = obtenerErrorContacto(campo);
    mostrarErrorCampo(campo, error);
    return error === null;
}

function limpiarFormularioContacto() {
    formContacto.reset();
    actualizarContadorMensaje();

    const campos = [conNombre, conCorreo, conTelefono, conLlamar, conMotivo, conMensaje];
    for (let i = 0; i < campos.length; i++) {
        delete campos[i].dataset.tocado;
        mostrarErrorCampo(campos[i], null);
    }
}

function manejarBlurContacto(event) {
    const campo = event.target;
    if (!campo.name) {
        return;
    }
    campo.dataset.tocado = 'true';
    validarCampoContacto(campo);
}

function manejarInputContacto(event) {
    const campo = event.target;
    if (!campo.name) {
        return;
    }

    if (campo.id === 'con-mensaje') {
        actualizarContadorMensaje();
    }

    if (campo.dataset.tocado === 'true') {
        validarCampoContacto(campo);
    }

    if (campo.id === 'con-llamar') {
        conTelefono.dataset.tocado = 'true';
        validarCampoContacto(conTelefono);
    }
}

function manejarSubmitContacto(event) {
    event.preventDefault();

    const campos = [conNombre, conCorreo, conTelefono, conLlamar, conMotivo, conMensaje];
    let primerCampoConError = null;

    for (let i = 0; i < campos.length; i++) {
        campos[i].dataset.tocado = 'true';
        const esValido = validarCampoContacto(campos[i]);
        if (!esValido && !primerCampoConError) {
            primerCampoConError = campos[i];
        }
    }

    if (primerCampoConError) {
        primerCampoConError.focus();
        return;
    }

    const datosMensaje = {
        nombre: conNombre.value.trim(),
        correo: conCorreo.value.trim(),
        telefono: conTelefono.value.trim(),
        prefieroLlamada: Boolean(conLlamar.checked),
        motivo: conMotivo.value,
        mensaje: conMensaje.value.trim(),
        fecha: new Date().toISOString().slice(0, 10)
    };

    crear('mensajes', datosMensaje);
    guardarCookie('contactoNombre', datosMensaje.nombre, 7);
    guardarCookie('contactoCorreo', datosMensaje.correo, 7);

    limpiarFormularioContacto();
    renderMensajes(obtenerTodos('mensajes'), contenedorMensajes);
    mostrarVista('vista-mensajes');
}

function manejarClicMensajes(event) {
    const botonBorrar = event.target.closest('.btn-borrar-mensaje');
    if (!botonBorrar) {
        return;
    }

    const id = Number(botonBorrar.dataset.id);
    if (confirm('¿Seguro que quieres borrar este mensaje?')) {
        borrar('mensajes', id);
        renderMensajes(obtenerTodos('mensajes'), contenedorMensajes);
    }
}

function iniciarApp() {
    function cargarDatosIniciales() {
        if (obtenerTodos('motos').length === 0) {
            for (let i = 0; i < motos.length; i++) {
                crear('motos', motos[i]);
            }
        }
        if (obtenerTodos('mantenimientos').length === 0) {
            for (let i = 0; i < mantenimientos.length; i++) {
                crear('mantenimientos', mantenimientos[i]);
            }
        }
    }

    if (!contenedorMotos || !contenedorAlertas) {
        return;
    }

    cargarDatosIniciales();
    const listaMotos = obtenerTodos('motos');
    const listaMantenimientos = obtenerTodos('mantenimientos');
    renderListadoMotos(listaMotos, contenedorMotos);
    renderAlertas(listaMantenimientos, listaMotos, contenedorAlertas);

    contenedorMotos.addEventListener('click', manejarClicMotos);
    vistaDetalle.addEventListener('click', manejarClicDetalle);
    document.addEventListener('click', manejarClicNav);

    pintarUsuarios();
    renderMensajes(obtenerTodos('mensajes'), contenedorMensajes);
    cargarContactoDesdeCookie();
    actualizarContadorMensaje();

    formRegistro.addEventListener('blur', manejarBlurRegistro, true);
    formRegistro.addEventListener('input', manejarInputRegistro);
    formRegistro.addEventListener('change', manejarInputRegistro);
    formRegistro.addEventListener('submit', manejarSubmitRegistro);
    btnCancelarEdicion.addEventListener('click', limpiarFormularioRegistro);
    contenedorUsuarios.addEventListener('click', manejarClicUsuarios);

    formContacto.addEventListener('blur', manejarBlurContacto, true);
    formContacto.addEventListener('input', manejarInputContacto);
    formContacto.addEventListener('change', manejarInputContacto);
    formContacto.addEventListener('submit', manejarSubmitContacto);
    contenedorMensajes.addEventListener('click', manejarClicMensajes);
}

iniciarApp();