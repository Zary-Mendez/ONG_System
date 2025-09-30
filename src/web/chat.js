const broadcast = require("../utils/broadcast");
const { getUsers } = require("../models/users");

let users = [];

function setupChat(wss) {
    wss.on("connection", (ws, req) => {
        let currentUser = null;
        const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress;

        ws.on("message", (msg) => {
            const data = JSON.parse(msg);

            if (data.type === "login") {
                // currentUser = { id: data.user.id, name: data.user.name, ws, location: data.user.location, emergency: data.user.emergency};
                currentUser = { id: data.user.id, name: data.user.name, ws};
                console.log(JSON.stringify(data) + " <- DATA DEL USUARIO QUE SE CONECTA");
                users.push(currentUser);

                console.log(`${new Date().toISOString()} - 🟢 Cliente conectado (${currentUser.name} | ${ip})`);

                broadcast(users, { type: "system", text: `${currentUser.name}` });

                const allUsers = getUsers();
                broadcast(users, {
                    type: "users",
                    users: allUsers.map(u => ({
                        id: u.id,
                        name: u.name,
                        rol: u.rol,
                        location: u.location,
                        connected: users.some(c => c.id === u.id)
                    }))
                });
            }

            if (data.type === "chat") {
            //    const allUsers = JSON.parse(getUsers());
               const allUsers = getUsers();
            //    console.log(JSON.stringify(allUsers) + " <- TODOS LOS USUARIOS");
            console.log(JSON.stringify(users, null, 2) + " <- USUARIOS CONECTADOS");
                broadcast(users, { type: "chat", user: data.user, text: data.text, location: allUsers.find(u => u.id === data.user.id).location, emergency: data.user.emergency});
            }
        });

        ws.on("close", () => {
            if (currentUser) {
                console.log(`${new Date().toISOString()} - 🔴 Cliente desconectado (${currentUser.name} | ${ip})`);
                users = users.filter(u => u !== currentUser);

                broadcast(users, { type: "system", text: `${currentUser.name} salió` });

                const allUsers = getUsers();
                broadcast(users, {
                    type: "users",
                    users: allUsers.map(u => ({
                        id: u.id,
                        name: u.name,
                        rol: u.rol,
                        location: u.location,
                        connected: users.some(c => c.id === u.id)
                    }))
                });
            }
        });
    });
}

module.exports = setupChat;