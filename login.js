// Función para registrar un nuevo usuario
function registrarUsuario() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificar si el correo ya está registrado
    let usuarioExistente = false;
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === email) {
            usuarioExistente = true;
            break;
        }
    }

    if (usuarioExistente) {
        alert("Este correo ya está registrado. Intente con otro.");
        return;
    }

    // Registrar el nuevo usuario
    usuarios.push({ email, password });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    document.getElementById('signup-form').reset();
    window.location.href = "login.html"; // Redirigir al login
}

// Función para iniciar sesión
function iniciarSesion() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificar credenciales
    let usuarioValido = false;
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === email && usuarios[i].password === password) {
            usuarioValido = true;
            break;
        }
    }

    if (usuarioValido) {
        alert("Inicio de sesión exitoso.");
        
        // Guardar la sesión del usuario en localStorage
        localStorage.setItem('usuarioLogueado', JSON.stringify({ email }));
        
        // Redirigir a la página principal (index.html)
        window.location.href = "index.html";
    } else {
        alert("Correo o contraseña incorrectos.");
    }
}

// Función para cerrar sesión
function cerrarSesion() {
    // Eliminar la información de sesión del usuario
    localStorage.removeItem('usuarioLogueado');
    alert("Has cerrado sesión.");
    window.location.href = "login.html"; // Redirigir al login después de cerrar sesión
}
