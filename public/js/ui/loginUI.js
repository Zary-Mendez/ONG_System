
export function saveUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
}

export function redirectToChat() {
    window.location.href = "/chat.html";
}