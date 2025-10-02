import { connect, sendMessage } from "./web/chatSocket.js";
import { showUserList, clearUser, redirectToLogin } from "./ui/chatUI.js";

// Obtener usuario y emergencia desde localStorage
const user = JSON.parse(localStorage.getItem("user"));
const emergency = localStorage.getItem("emergency");

console.log("Usuario en localStorage:", user?.name);

// Validación: si no hay usuario o emergencia, redirigir al login
if (!user || !emergency) {
    redirectToLogin();
}

console.log("Chat JS cargado"); 

// Mostrar nombre de la emergencia en el encabezado
document.getElementById("chat-username").textContent = emergency;

console.log("Usuario:", user?.name, "Emergencia:", emergency);

// Mostrar la emergencia reportada en el chat como mensaje del sistema
const messagesDiv = document.getElementById("messages");
const emergencyMsg = document.createElement("div");
emergencyMsg.classList.add("message", "system");
emergencyMsg.innerHTML = `<em><strong>Emergencia</strong></em>`;
messagesDiv.appendChild(emergencyMsg);

// Sidebar y controles
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");

// Conectar al WebSocket
connect(user, emergency);

// Enviar mensaje al servidor
chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const text = messageInput.value.trim();
    if (text) {
        sendMessage(user, text, emergency);
        messageInput.value = "";
    }
});

// Botón casita → redirigir a login
const homeBtn = document.getElementById("homeBtn");
if (homeBtn) {
    homeBtn.addEventListener("click", () => {
        window.location.href = "login.html";
    });
}


