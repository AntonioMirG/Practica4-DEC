document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === "antoniomirperez2004@gmail.com" && password === "1234") {
        window.location.href = "index.html";
    } else {
        alert("Correo o contraseña incorrectos.");
    }
});
