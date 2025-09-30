import { login } from "./services/api.js";
import { saveUser, redirectToEmergency, redirectToVoluntarioEmergency } from "./ui/loginUI.js";

// Variable para almacenar el rol seleccionado
let selectedRole = null;

const usernameInput = document.getElementById("username");

// Agregar event listeners a los botones de rol
document.querySelectorAll('[data-role]').forEach(button => {
    button.addEventListener("click", async (e) => {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        selectedRole = button.dataset.role;

        // Validar que se haya ingresado un nombre
        if (!username) {
            alert("Por favor ingresa tu nombre");
            usernameInput.focus();
            return;
        }

        try {
            // Llamar backend
            const data = await login(username);

            // Guardar usuario con su rol
            saveUser(data.user, selectedRole);

            // Redirigir según el rol
            if (selectedRole === "usuario") {
                redirectToEmergency();
            } else if (selectedRole === "voluntario") {
                redirectToVoluntarioEmergency();
            }
        } catch (err) {
            console.error("Error de login:", err);
            alert("Hubo un error al iniciar sesión. Intenta nuevamente.");
        }
    });
});
