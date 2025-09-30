function broadcast(users, data) {
    const msg = JSON.stringify(data);
    console.log(data);
    users.forEach(u => {
        if (u.ws.readyState === 1 && u.emergency === data.emergency && u.location === data.location) {
             u.ws.send(msg);

        // if (u.ws.readyState === 1 && data.type != "chat") {
        //     // console.log("user: " + JSON.stringify(u, null, 2) + "data: " + JSON.stringify(data, null, 2));
        //     u.ws.send(msg);
        // }else if (data.type === "chat" && u.emergency === data.emergency && u.location === data.location){
        //     w.ws.send(msg);
         }
    });
}

module.exports = broadcast;