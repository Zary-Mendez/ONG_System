
export function saveUser(user, emergency) {
    localStorage.setItem("user", JSON.stringify(user), emergency);
}

export function redirectToChat() {
    window.location.href = "/emergency.html";
}