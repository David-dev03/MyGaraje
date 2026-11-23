import { motos, mantenimientos } from './datos.js';
import { renderListadoMotos, renderAlertas, renderDetalleMoto } from './ui.js';
import { obtenerTodos, obtenerPorId, crear } from './almacen.js';


const vistaDetalle = document.querySelector('#vista-detalle');
const contenedorMotos = document.querySelector('#contenedor-motos');
const contenedorAlertas = document.querySelector('#contenedor-alertas');
const navLinks = document.querySelector('.nav-links');
const vistas = document.querySelectorAll('.vista');
const enlacesNav = document.querySelectorAll('.nav-links a');

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

    for (let i = 0; i < enlacesNav.length; i++) {
        enlacesNav[i].classList.remove('activo');
        if (enlacesNav[i].dataset.vista === idVista) {
            enlacesNav[i].classList.add('activo');
        }
    }
    window.scrollTo(0, 0);
}

function manejarClicNav(event) {
    const enlace = event.target.closest('a');
    if (!enlace || !enlace.dataset.vista) {
        return;
    }
    event.preventDefault();
    mostrarVista(enlace.dataset.vista);
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
    navLinks.addEventListener('click', manejarClicNav);
}

iniciarApp();