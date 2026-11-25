# MyGaraje

Web para llevar al día los mantenimientos de mis motos. Sirve para controlar los kilómetros, ver cuándo toca revisión y elegir si hacerla yo mismo viendo una guía o buscar un taller cercano.

## Backlog

Priorizado de lo imprescindible a las mejoras futuras:

- [x] **[Alta]** Montar el menú de navegación enlazando todas las secciones (`index.html`, `anadir-moto.html`, `talleres.html`, `guia-tareas.html` y `login.html`).
- [x] **[Alta]** Generar el listado de motos y el bloque de alertas desde JavaScript (`js/datos.js` a través de `js/almacen.js`), sin datos escritos a mano en el HTML.
- [x] **[Alta]** Abrir la vista de detalle de una moto al pulsarla, mostrando su ficha técnica y su historial de mantenimientos.
- [x] **[Media]** Convertir la navegación multipágina en una SPA sin recargar la página completa.
- [ ] **[Media]** Implementar el formulario de añadir moto validando los campos y el tipo de seguimiento (estimado u OBD).
- [ ] **[Media]** Listar talleres cercanos en `talleres.html` con filtro por zona y botón de cómo llegar.
- [ ] **[Media]** Mostrar las guías paso a paso en `guia-tareas.html` y permitir marcar tareas como completadas.
- [ ] **[Media]** Añadir filtros de búsqueda en el garaje (por marca, modelo o estado).
- [ ] **[Baja]** Permitir añadir, editar y eliminar motos y mantenimientos guardando todo en `localStorage`.
- [x] **[Baja]** Implementar formularios validados de registro de usuarios (sin guardar contraseña en claro) y contacto con persistencia en `localStorage` y cookies.

## Mapa de pantallas

- **Inicio / Garaje (`#vista-listado` en `index.html`):** Menú superior SPA, título dinámico con el perfil activo, listado de tarjetas de motos (modelo, año, kilómetros y estado), botón para añadir moto y bloque inferior de alertas pendientes.
- **Detalle de moto (`#vista-detalle` en `index.html`):** Ficha técnica completa de la moto seleccionada (imagen, matrícula, kilómetros actuales, aceite recomendado, tipo de seguimiento y estado) junto con su historial de mantenimientos y revisiones pendientes (fecha, km, modalidad, coste, estado y notas).
- **Añadir moto (`#vista-anadir` en `index.html`):** En construcción.
- **Mapa talleres (`#vista-talleres` en `index.html`):** En construcción.
- **Guía y tareas (`#vista-guia` en `index.html`):** En construcción.
- **Acceso (`#vista-registro` y `#vista-usuarios` en `index.html`):** Formulario de registro de usuario (también reutilizado para editar) y listado de usuarios registrados con botones para usar perfil, editar y borrar.
- **Contacto (`#vista-contacto` y `#vista-mensajes` en `index.html`):** Formulario de contacto adaptado a MyGaraje con contador de caracteres y cookie de recuerdo, junto a la vista de mensajes enviados con opción de borrado.

## Hito 2

### Mapa de validación

#### Formulario de registro (`#form-registro`)

| Campo | Regla | Mensaje de error |
| :--- | :--- | :--- |
| Nombre de usuario (`#reg-nombre`) | Obligatorio (`required`), entre `minlength="3"` y `maxlength="30"` | `Este campo es obligatorio` / `Debe tener al menos 3 caracteres` / `No puede superar los 30 caracteres` |
| Correo electrónico (`#reg-correo`) | Obligatorio (`required`), formato email `/^[^@\s]+@[^@\s]+\.[^@\s]+$/` | `Este campo es obligatorio` / `Introduce un correo electrónico válido` |
| Contraseña (`#reg-password`) | Obligatorio (`required`), mínimo `8` caracteres, 1 mayúscula (`/[A-Z]/`) y 1 número (`/[0-9]/`) | `Este campo es obligatorio` / `La contraseña debe tener al menos 8 caracteres` / `Debe incluir al menos una letra mayúscula` / `Debe incluir al menos un número` |
| Repetir contraseña (`#reg-repetir`) | Obligatorio (`required`), debe coincidir con el campo contraseña | `Este campo es obligatorio` / `Las contraseñas no coinciden` |
| Fecha de nacimiento (`#reg-fecha`) | Obligatorio (`required`), entre `min="1920-01-01"` y `max="2026-11-25"`, no futura, edad mínima 16 años (carnet A1 / 125 cc) | `Este campo es obligatorio` / `La fecha no puede ser anterior a 1920-01-01` / `La fecha no puede ser posterior a 2026-11-25` / `La fecha de nacimiento no puede ser futura` / `Debes tener al menos 16 años` |
| Aceptar condiciones (`#reg-condiciones`) | Casilla obligatoria marcada (`required`) | `Debes aceptar las condiciones de uso` |

#### Formulario de contacto (`#form-contacto`)

| Campo | Regla | Mensaje de error |
| :--- | :--- | :--- |
| Nombre (`#con-nombre`) | Obligatorio (`required`), entre `minlength="2"` y `maxlength="50"` | `Este campo es obligatorio` / `Debe tener al menos 2 caracteres` / `No puede superar los 50 caracteres` |
| Correo electrónico (`#con-correo`) | Obligatorio (`required`), formato email `/^[^@\s]+@[^@\s]+\.[^@\s]+$/` | `Este campo es obligatorio` / `Introduce un correo electrónico válido` |
| Teléfono (`#con-telefono`) | Opcional; obligatorio si se marca *«Prefiero que me llaméis»*; formato 9 dígitos españoles `/^[6789][0-9]{8}$/` | `El teléfono es obligatorio si prefieres que te llamemos` / `Introduce un teléfono válido de 9 dígitos` |
| Prefiero que me llaméis (`#con-llamar`) | Casilla opcional que activa la obligatoriedad del teléfono | — |
| Motivo (`#con-motivo`) | Selección obligatoria (`required`) entre motivos propios de MyGaraje | `Este campo es obligatorio` |
| Mensaje (`#con-mensaje`) | Obligatorio (`required`), entre `minlength="10"` y `maxlength="300"`, con contador en vivo | `Este campo es obligatorio` / `Debe tener al menos 10 caracteres` / `No puede superar los 300 caracteres` |

### Qué se ha hecho

- **Capa de datos (`js/almacen.js`):** CRUD completo sobre `localStorage` (`obtenerTodos`, `obtenerPorId`, `crear`, `actualizar`, `borrar`) más utilidades de valores simples. Toda la app (motos, mantenimientos, usuarios, perfil activo y mensajes) accede a los datos únicamente a través de este módulo.
- **Módulo de validación (`js/validacion.js`):** funciones puras (`validarObligatorio`, `validarLongitud`, `validarEmail`, `validarPassword`, `validarRepetirPassword`, `validarFechaNacimiento`, `validarTelefono`) que devuelven el mensaje de error o `null`.
- **Navegación SPA (`index.html` y `js/main.js`):** vistas integradas sin recargar la página, manteniendo las secciones futuras de MyGaraje (*Añadir moto*, *Mapa* y *Guía*) en construcción y subpestañas dentro de *Acceso* y *Contacto*.
- **Formularios accesibles y persistencia:** validación con `novalidate`, lectura de atributos HTML (`required`, `minlength`, `maxlength`, `min`, `max`), control de estado tocado en `blur` e `input`, mensajes con `aria-invalid` y `aria-describedby`, foco al primer error en `submit`, delegación de eventos para editar/borrar con `confirm()`, guardado de usuarios sin contraseña (y selector de perfil activo) y cookie con caducidad de 7 días para recordar nombre y correo en Contacto.

### Qué falta

- Completar las pantallas específicas de MyGaraje previstas para siguientes hitos: formulario de **Añadir moto** (con selector de seguimiento estimado u OBD y edición/borrado por perfil), **Mapa de talleres** y **Guía paso a paso**, además de los filtros de búsqueda en el garaje.

### Qué ha costado más

- Entender al principio cómo separar la lógica de almacenamiento en `js/almacen.js` usando `JSON.parse` y `JSON.stringify` sin mezclar funciones del DOM (`document.querySelectorAll`).
- Organizar todas las vistas de la SPA dentro de `index.html` sin duplicar identificadores y coordinar la validación en `blur` / `input` solo cuando el usuario ya había tocado el campo.