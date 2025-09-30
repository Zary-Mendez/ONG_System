import { login } from "./services/api.js";
import { saveUser, redirectToChat } from "./ui/loginUI.js";

// Botón
let emergencyType;
const loginForm = document.getElementById("loginForm");
document.querySelectorAll("btn-emergency").forEach(card => {
    card.addEventListener("click", () => {
        const type = card.classList.contains("incendio") ? "Incendio" :
            card.classList.contains("inundacion") ? "Inundacion" :
                card.classList.contains("terremoto") ? "Terremoto": "";
        selectEmergency(type);
    });
});
function selectEmergency(type) {
    const emergencyNames = {
        "Incendio": "Incendio",
        "Inundacion": "Inundación",
        "Terremoto": "Terremoto"
    };
    // return emergencyNames[type]
    emergencyType = {emergency:emergencyNames[type]};
}

// Eventos>
loginForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();

    // console.log(selectEmergency() + " <- TIPO DE EMERGENCIA");

    try {
        // Failsafe porque esto no puede suceder
        if (!username) {
            return;
        }

        // Llamar backend
        const data = await login(username);

        // Guardar y redirigir
        saveUser(data.user, emergencyType);
        redirectToChat();
    } catch (err) {
        console.error("Error de login:", err);
    }
});
