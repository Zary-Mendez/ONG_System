// Capturamos el formulario
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();

    if (!username) {
        alert("Por favor, ingrese su nombre");
        return;
    }

    // Guardamos el usuario en localStorage para usarlo en la siguiente pantalla
    localStorage.setItem("username", username);

    // Redirigir a la pantalla de selección de emergencia
    window.location.href = "emergency.html";
});
