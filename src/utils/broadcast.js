function broadcast(users, data) {
    const msg = JSON.stringify(data);
    users.forEach(u => {
        if (u.ws.readyState === 1 && data.emergency === u.emergency && data.emergency !== "General") {
            u.ws.send(msg);
        }
    });
}

module.exports = broadcast;