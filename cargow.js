let filtroDestino = "";

// Función para agregar un viaje
function agregarViaje() {
    const origen = document.getElementById("origen").value;
    const destino = document.getElementById("destino").value;
    const hora = document.getElementById("hora").value;
    const precio = document.getElementById("precio").value;

    // Creamos el viaje sin la propiedad 'reservado'
    const viaje = { origen, destino, hora, precio };

    let viajesGuardados = JSON.parse(localStorage.getItem("viajes")) || [];

    viajesGuardados.push(viaje);

    localStorage.setItem("viajes", JSON.stringify(viajesGuardados));

    mostrarViajes();

    document.getElementById("form-viaje").reset();
}

// Función para mostrar los viajes guardados
function mostrarViajes() {
    const viajesGuardados = JSON.parse(localStorage.getItem("viajes")) || [];

    const list = document.getElementById("list");
    list.innerHTML = "";

    for (let i = 0; i < viajesGuardados.length; i++) {
        const viaje = viajesGuardados[i];

        // Filtrar por destino si corresponde
        const destino = viaje.destino.toLowerCase();
        const filtro = filtroDestino.toLowerCase();
        let coincide = filtro === "" || compararSubcadena(destino, filtro);

        if (coincide) {
            const viajeElement = document.createElement("div");
            viajeElement.className = "trip-card";
            viajeElement.innerHTML = `
                <h4>De: ${viaje.origen}</h4>
                <p>A: ${viaje.destino}</p>
                <p>Hora: ${viaje.hora}</p>
                <p>Precio: €${viaje.precio}</p>
                <button class="delete-btn" onclick="eliminarViaje(${i})">Eliminar</button>
                <button class="reserve-btn" onclick="reservarViaje(${i})">
                    ${viaje.reservado ? 'Reservado' : 'Reservar'}
                </button>
            `;
            list.appendChild(viajeElement);
        }
    }
}

// Función para comparar si una subcadena existe dentro de una cadena
function compararSubcadena(cadena, subcadena) {
    for (let i = 0; i <= cadena.length - subcadena.length; i++) {
        let coincide = true;
        for (let j = 0; j < subcadena.length; j++) {
            if (cadena[i + j] !== subcadena[j]) {
                coincide = false;
                break;
            }
        }
        if (coincide) {
            return true;
        }
    }
    return false;
}

// Función para filtrar viajes por destino
function filtrarViajes() {
    filtroDestino = document.getElementById("filtro-destino").value;
    mostrarViajes();
}

// Función para eliminar un viaje
function eliminarViaje(index) {
    let viajesGuardados = JSON.parse(localStorage.getItem("viajes")) || [];

    viajesGuardados.splice(index, 1);

    localStorage.setItem("viajes", JSON.stringify(viajesGuardados));

    mostrarViajes();
}

// Función para reservar o desreservar un viaje
function reservarViaje(index) {
    let viajesGuardados = JSON.parse(localStorage.getItem("viajes")) || [];

    // Si el viaje no tiene la propiedad 'reservado', la añadimos al modificar su estado
    if (!viajesGuardados[index].hasOwnProperty('reservado')) {
        viajesGuardados[index].reservado = false; // Agregamos la propiedad reservado si no existe
    }

    // Cambiar el estado de 'reservado'
    viajesGuardados[index].reservado = !viajesGuardados[index].reservado;

    localStorage.setItem("viajes", JSON.stringify(viajesGuardados));

    mostrarViajes();
}

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    alert("Has cerrado sesión.");
    window.location.href = "login.html";
}

// Mostrar los viajes al cargar la página
mostrarViajes();
