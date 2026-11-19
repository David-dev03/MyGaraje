function obtenerClaseEstado(estado) {
    if (estado === 'Al día') return 'badge-ok';
    if (estado === 'Revisión próxima') return 'badge-aviso';
    return 'badge-urgente';
}

export function renderListadoMotos(listaMotos, contenedor) {
    contenedor.innerHTML = listaMotos
        .map(
            (moto) => `
      <article class="tarjeta-moto">
        <div class="tarjeta-img-placeholder">
          <span>${moto.marca} ${moto.modelo}</span>
        </div>
        <div class="tarjeta-info">
          <h2>${moto.marca} ${moto.modelo}</h2>
          <p class="tarjeta-subtitulo">${moto.kmActuales.toLocaleString('es-ES')} km · Año ${moto.anio}</p>
          <span class="badge-estado ${obtenerClaseEstado(moto.estado)}">${moto.estado}</span>
        </div>
        <button type="button" class="btn-primario btn-ancho btn-ver-moto" data-id="${moto.id}">
          Ver mantenimientos
        </button>
      </article>
    `
        )
        .join('');
}

export function renderAlertas(listaMantenimientos, listaMotos, contenedor) {
    const pendientes = listaMantenimientos.filter((item) => item.estado === 'Pendiente');

    if (pendientes.length === 0) {
        contenedor.innerHTML = '<p>No tienes alertas pendientes ahora mismo.</p>';
        return;
    }

    contenedor.innerHTML = pendientes
        .map((alerta) => {
            const moto = listaMotos.find((m) => m.id === alerta.motoId);
            const nombreMoto = moto ? `${moto.marca} ${moto.modelo}` : 'Moto';
            return `
        <div class="item-alerta">
          <span><strong>${nombreMoto}:</strong> ${alerta.titulo} (${alerta.km.toLocaleString('es-ES')} km)</span>
          <span class="badge-estado badge-aviso">${alerta.modalidad}</span>
        </div>
      `;
        })
        .join('');
}

export function renderDetalleMoto(moto, mantenimientosMoto, contenedor) {
    const htmlMantenimientos =
        mantenimientosMoto.length > 0
            ? mantenimientosMoto
                .map(
                    (m) => `
            <div class="item-mantenimiento">
              <h3>${m.titulo}</h3>
              <p><strong>Fecha:</strong> ${m.fecha} · <strong>Kilómetros:</strong> ${m.km.toLocaleString('es-ES')} km</p>
              <p><strong>Modalidad:</strong> ${m.modalidad} · <strong>Coste:</strong> ${m.coste} € · <strong>Estado:</strong> ${m.estado}</p>
              <p>${m.notas}</p>
            </div>
          `
                )
                .join('')
            : '<p>Esta moto aún no tiene mantenimientos registrados.</p>';

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