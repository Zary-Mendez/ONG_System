import { login } from "./services/api.js";
import { saveUser, redirectToChat } from "./ui/loginUI.js";

// Botón
const loginForm = document.getElementById("loginForm");

// Eventos
loginForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();

    try {
        // Failsafe porque esto no puede suceder
        if (!username) {
            return;
        }

        // Llamar backend
        const data = await login(username);

        // Guardar y redirigir
        saveUser(data.user);
        redirectToChat();
    } catch (err) {
        console.error("Error de login:", err);
    }
});
