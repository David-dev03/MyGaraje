function obtenerClaseEstado(estado) {
  if (estado === 'Al día' || estado === 'Completado') {
    return 'badge-ok';
  }
  if (estado === 'Revisión próxima' || estado === 'Pendiente') {
    return 'badge-aviso';
  }
  return 'badge-urgente';
}

export function renderListadoMotos(listaMotos, contenedor) {
  let html = '';

  for (let i = 0; i < listaMotos.length; i++) {
    const moto = listaMotos[i];
    const claseEstado = obtenerClaseEstado(moto.estado);

    html += `
      <article class="tarjeta-moto">
        <div class="tarjeta-img-placeholder">
          <span>${moto.marca} ${moto.modelo}</span>
        </div>
        <div class="tarjeta-info">
          <h2>${moto.marca} ${moto.modelo}</h2>
          <p class="tarjeta-subtitulo">${moto.kmActuales.toLocaleString('es-ES')} km · Año ${moto.anio}</p>
          <span class="badge-estado ${claseEstado}">${moto.estado}</span>
        </div>
        <button type="button" class="btn-primario btn-ancho btn-ver-moto" data-id="${moto.id}">
          Ver mantenimientos
        </button>
      </article>
    `;
  }

  contenedor.innerHTML = html;
}

export function renderAlertas(listaMantenimientos, listaMotos, contenedor) {
  let html = '';

  for (let i = 0; i < listaMantenimientos.length; i++) {
    const alerta = listaMantenimientos[i];

    if (alerta.estado === 'Pendiente') {
      let nombreMoto = 'Moto';

      for (let j = 0; j < listaMotos.length; j++) {
        if (listaMotos[j].id === alerta.motoId) {
          nombreMoto = `${listaMotos[j].marca} ${listaMotos[j].modelo}`;
          break;
        }
      }

      html += `
        <div class="item-alerta">
          <span><strong>${nombreMoto}:</strong> ${alerta.titulo} (${alerta.km.toLocaleString('es-ES')} km)</span>
          <span class="badge-estado badge-aviso">${alerta.modalidad}</span>
        </div>
      `;
    }
  }

  if (html === '') {
    contenedor.innerHTML = '<p>No tienes alertas pendientes ahora mismo.</p>';
  } else {
    contenedor.innerHTML = html;
  }
}

export function renderDetalleMoto(moto, mantenimientosMoto, contenedor) {
  let htmlMantenimientos = '';

  if (mantenimientosMoto.length === 0) {
    htmlMantenimientos = '<p>Esta moto aún no tiene mantenimientos registrados.</p>';
  } else {
    for (let i = 0; i < mantenimientosMoto.length; i++) {
      const m = mantenimientosMoto[i];
      const claseEstado = obtenerClaseEstado(m.estado);

      htmlMantenimientos += `
        <article class="item-mantenimiento">
          <div class="mantenimiento-cabecera">
            <h3>${m.titulo}</h3>
            <span class="badge-estado ${claseEstado}">${m.estado}</span>
          </div>
          <div class="mantenimiento-datos">
            <div class="dato-caja">
              <span class="dato-etiqueta">Fecha</span>
              <span class="dato-valor">${m.fecha}</span>
            </div>
            <div class="dato-caja">
              <span class="dato-etiqueta">Kilómetros</span>
              <span class="dato-valor">${m.km.toLocaleString('es-ES')} km</span>
            </div>
            <div class="dato-caja">
              <span class="dato-etiqueta">Modalidad</span>
              <span class="dato-valor">${m.modalidad}</span>
            </div>
            <div class="dato-caja">
              <span class="dato-etiqueta">Coste</span>
              <span class="dato-valor">${m.coste} €</span>
            </div>
          </div>
          <p class="mantenimiento-notas">${m.notas}</p>
        </article>
      `;
    }
  }

  contenedor.innerHTML = `
    <button type="button" id="btn-volver" class="btn-secundario">← Volver a Mis motos</button>
    <div class="panel-detalle">
      <div class="detalle-cabecera">
        <div class="detalle-img-placeholder">
          <span>${moto.marca} ${moto.modelo}</span>
        </div>
        <div class="detalle-datos">
          <h1>${moto.marca} ${moto.modelo} (${moto.anio})</h1>
          <span class="badge-estado ${obtenerClaseEstado(moto.estado)}">${moto.estado}</span>
          <p><strong>Matrícula:</strong> ${moto.matricula}</p>
          <p><strong>Kilómetros actuales:</strong> ${moto.kmActuales.toLocaleString('es-ES')} km</p>
          <p><strong>Aceite recomendado:</strong> ${moto.aceiteRecomendado}</p>
          <p><strong>Tipo de seguimiento:</strong> ${moto.seguimiento}</p>
        </div>
      </div>

      <div class="lista-mantenimientos">
        <h2>Historial y revisiones pendientes</h2>
        ${htmlMantenimientos}
      </div>
    </div>
  `;
}