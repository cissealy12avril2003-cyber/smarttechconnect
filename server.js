const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { ExpressPeerServer } = require('peer');
const db = require('./db/connection');

// Configuration PeerJS
const peerServer = ExpressPeerServer(http, { debug: true });
app.use('/peerjs', peerServer);

app.use(express.static('public'));

io.on('connection', (socket) => {
    // Gestion du Chat
    socket.on('nouveau-message', (data) => {
        const sql = "INSERT INTO messages (salon, utilisateur_id, contenu) VALUES (?, ?, ?)";
        db.query(sql, [data.salon, data.user, data.msg], (err) => {
            if (!err) io.to(data.salon).emit('message-recu', data);
        });
    });

    // Signalisation vidéo (PeerJS)
    socket.on('join-room', (roomId, peerId) => {
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', peerId);
    });
});

http.listen(3000, () => console.log("Serveur démarré sur http://localhost:3000"));