function broadcast(users, data) {
    const msg = JSON.stringify(data);
    console.log(data);
    users.forEach(u => {
         if (u.ws.readyState === 1 && u.emergency === data.emergency && u.location === data.location) {
              u.ws.send(msg);

        
         }

        // if (u.ws.readyState === 1 && data.type === "system") {
        //     console.log("EMERGENCIA DEL USUARIO: " + JSON.stringify(data));
        
        //  }
    });
}

module.exports = broadcast;