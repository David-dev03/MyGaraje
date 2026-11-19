import { motos, mantenimientos } from './datos.js';
import { renderListadoMotos, renderAlertas, renderDetalleMoto } from './ui.js';

const vistaListado = document.querySelector('#vista-listado');
const vistaDetalle = document.querySelector('#vista-detalle');
const contenedorMotos = document.querySelector('#contenedor-motos');
const contenedorAlertas = document.querySelector('#contenedor-alertas');

function mostrarDetalle(motoId) {
    const motoSeleccionada = motos.find((moto) => moto.id === motoId);
    if (!motoSeleccionada) return;

    const mantenimientosAsociados = mantenimientos.filter(
        (item) => item.motoId === motoId
    );

    renderDetalleMoto(motoSeleccionada, mantenimientosAsociados, vistaDetalle);

    vistaListado.classList.add('oculto');
    vistaDetalle.classList.remove('oculto');
}

function volverAListado() {
    vistaDetalle.classList.add('oculto');
    vistaListado.classList.remove('oculto');
}

function iniciarApp() {
    if (!contenedorMotos || !contenedorAlertas) return;

    renderListadoMotos(motos, contenedorMotos);
    renderAlertas(mantenimientos, motos, contenedorAlertas);

    contenedorMotos.addEventListener('click', (event) => {
        const boton = event.target.closest('.btn-ver-moto');
        if (!boton) return;

        const motoId = Number(boton.dataset.id);
        mostrarDetalle(motoId);
    });

    vistaDetalle.addEventListener('click', (event) => {
        if (event.target.id === 'btn-volver') {
            volverAListado();
        }
    });
}

iniciarApp();