import { addMessage, addSystemMessage, updateUserList } from "../ui/chatUI.js";

let socket;

export function connect(user) {
    let wsUrl = location.hostname === "localhost" ? "ws://localhost:3000" : `wss://${location.host}`;

    socket = new WebSocket(wsUrl);

    socket.addEventListener("open", () => {
        socket.send(JSON.stringify({
            type: "login",
            user
        }));
    });

    socket.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);

        switch (data.type) {
            case "chat":
                addMessage(data.user.name, data.text, data.user.name === user.name, data.location);
                console.log(data);
                break;
            case "system":
                addSystemMessage(data.text);
                break;
            case "users":
                updateUserList(data.users);
                break;
            default:
                throw new Error("Tipo de mensaje desconocido: " + data.type);
        }
    });
}

export function sendMessage(user, text, emergency) {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;

    socket.send(JSON.stringify({
        type: "chat",
        user: user,
        emergency: emergency,
        text
    }));
}
