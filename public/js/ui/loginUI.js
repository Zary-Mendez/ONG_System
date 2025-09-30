
// export function saveUser(user, emergency) {
//     localStorage.setItem("user", JSON.stringify(user), emergency);
// }

// export function redirectToChat() {
//     window.location.href = "/emergency.html";
// }
export function saveUser(user, role) {
    // Guardar el usuario y su rol
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userRole", role);
}

export function redirectToEmergency() {
    window.location.href = "/emergency.html";
}

export function redirectToVoluntarioEmergency() {
    window.location.href = "/voluntarioEmergency.html";
}

// Función auxiliar para obtener el usuario actual
export function getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}

// Función auxiliar para obtener el rol actual
export function getUserRole() {
    return localStorage.getItem("userRole");
}