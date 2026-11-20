import { motos, mantenimientos } from './datos.js';
import { renderListadoMotos, renderAlertas, renderDetalleMoto } from './ui.js';

const vistaListado = document.querySelector('#vista-listado');
const vistaDetalle = document.querySelector('#vista-detalle');
const contenedorMotos = document.querySelector('#contenedor-motos');
const contenedorAlertas = document.querySelector('#contenedor-alertas');

function buscarMotoPorId(idBuscado) {
    for (let i = 0; i < motos.length; i++) {
        if (motos[i].id === idBuscado) {
            return motos[i];
        }
    }
    return null;
}

function buscarMantenimientosDeMoto(idBuscado) {
    const resultado = [];

    for (let i = 0; i < mantenimientos.length; i++) {
        if (mantenimientos[i].motoId === idBuscado) {
            resultado.push(mantenimientos[i]);
        }
    }

    return resultado;
}

function mostrarDetalle(motoId) {
    const motoSeleccionada = buscarMotoPorId(motoId);
    if (!motoSeleccionada) {
        return;
    }

    const mantenimientosAsociados = buscarMantenimientosDeMoto(motoId);
    renderDetalleMoto(motoSeleccionada, mantenimientosAsociados, vistaDetalle);

    vistaListado.classList.add('oculto');
    vistaDetalle.classList.remove('oculto');
}

function volverAListado() {
    vistaDetalle.classList.add('oculto');
    vistaListado.classList.remove('oculto');
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
    if (!contenedorMotos || !contenedorAlertas) {
        return;
    }

    renderListadoMotos(motos, contenedorMotos);
    renderAlertas(mantenimientos, motos, contenedorAlertas);

    contenedorMotos.addEventListener('click', manejarClicMotos);
    vistaDetalle.addEventListener('click', manejarClicDetalle);
}

iniciarApp();