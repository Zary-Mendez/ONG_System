import { connect, sendMessage } from "./web/chatSocket.js";
import { showUserList, clearUser, redirectToLogin } from "./ui/chatUI.js";


// Obtener usuario y emergencia desde localStorage
const user = JSON.parse(localStorage.getItem("user"));

console.log("Usuario en localStorage:", user.name);

const emergency = localStorage.getItem("emergency");

// Validación: si no hay usuario o emergencia, redirigir al login
if (!user && !emergency) {
    redirectToLogin();
}

console.log("Chat JS cargado"); 
// Mostrar nombre del usuario en el encabezado
document.getElementById("chat-username").textContent = emergency;
// document.getElementById("chat-username").textContent = location + " - " + user.location;
console.log("Usuario:", user.name, "Emergencia:", emergency, "Ubicación:", "<- USUARIO, EMERGENCIA Y UBICACIÓN");


// Mostrar la emergencia reportada en el chat como mensaje del sistema
const messagesDiv = document.getElementById("messages");
const emergencyMsg = document.createElement("div");
emergencyMsg.classList.add("message", "system");
emergencyMsg.innerHTML = `<em> <strong> Emergencia </strong> </em>`;
messagesDiv.appendChild(emergencyMsg);

// Sidebar y controles
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
// const logoutBtn = document.getElementById("logoutBtn");
// const sidebar = document.getElementById("userSidebar");
// const toggleBtn = document.getElementById("usersToggle");
// const closeBtn = document.getElementById("closeSidebar");

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

// Cerrar sesión
logoutBtn.addEventListener("click", function () {
    clearUser();
    localStorage.removeItem("emergency");
    redirectToLogin();
});

// Mostrar/ocultar lista de usuarios
toggleBtn.addEventListener("click", () => {
    showUserList(sidebar, true);
});

closeBtn.addEventListener("click", () => {
    showUserList(sidebar, false);
});
