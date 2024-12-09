function agregarViaje() {
    const origen = document.getElementById("origen").value;
    const destino = document.getElementById("destino").value;
    const hora = document.getElementById("hora").value;
    const precio = document.getElementById("precio").value;

    const viaje = { origen, destino, hora, precio, reservado: false }; // Add a "reservado" property

    let viajesGuardados = JSON.parse(localStorage.getItem("viajes")) || [];

    viajesGuardados.push(viaje);

    localStorage.setItem("viajes", JSON.stringify(viajesGuardados));

    mostrarViajes();

    document.getElementById("form-viaje").reset();
}

function mostrarViajes() {
    const viajesGuardados = JSON.parse(localStorage.getItem("viajes")) || [];

    const list = document.getElementById("list");
    list.innerHTML = "";

    viajesGuardados.forEach((viaje, index) => {
        const viajeElement = document.createElement("div");
        viajeElement.className = "trip-card";
        viajeElement.innerHTML = `
            <h4>De: ${viaje.origen}</h4>
            <p>A: ${viaje.destino}</p>
            <p>Hora: ${viaje.hora}</p>
            <p>Precio: €${viaje.precio}</p>
            <button class="delete-btn" onclick="eliminarViaje(${index})">Eliminar</button>
            <button class="reserve-btn" onclick="reservarViaje(${index})">
                ${viaje.reservado ? 'Reservado' : 'Reservar'}
            </button>
        `;
        list.appendChild(viajeElement);
    });
}

function eliminarViaje(index) {
    let viajesGuardados = JSON.parse(localStorage.getItem("viajes")) || [];

    viajesGuardados.splice(index, 1);

    localStorage.setItem("viajes", JSON.stringify(viajesGuardados));

    mostrarViajes();
}

function reservarViaje(index) {
    let viajesGuardados = JSON.parse(localStorage.getItem("viajes")) || [];

    viajesGuardados[index].reservado = !viajesGuardados[index].reservado;

    localStorage.setItem("viajes", JSON.stringify(viajesGuardados));

    mostrarViajes();
}

function cerrarSesion() {
    alert("Sesión cerrada");
    window.location.href = "login.html";
}

mostrarViajes();
