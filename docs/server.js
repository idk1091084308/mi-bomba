// Neon Drifter WebSocket Server (Node.js + Socket.IO)
// Run: npm install express socket.io
//      node server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

// Serve static files
app.use(express.static(path.join(__dirname)));

// In-memory room storage
const rooms = new Map();
const players = new Map();

class Room {
    constructor(code) {
        this.code = code;
        this.state = 'LOBBY'; // LOBBY, PLAYING
        this.mapIndex = 3;
        this.mapVote = new Map();
        this.players = new Map();
        this.createdAt = Date.now();
    }

    isVotesUnanimous() {
        if (this.players.size === 0) return false;
        const votes = Array.from(this.mapVote.values());
        return votes.every(v => v === votes[0]);
    }

    getFinalMap() {
        if (this.isVotesUnanimous()) {
            return Array.from(this.mapVote.values())[0];
        }
        return Math.floor(Math.random() * 4); // Random map if votes differ
    }
}

io.on('connection', (socket) => {
    console.log(`[${new Date().toLocaleTimeString()}] Player connected: ${socket.id}`);

    socket.on('createRoom', (data, callback) => {
        const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        const room = new Room(roomCode);
        rooms.set(roomCode, room);

        socket.join(roomCode);
        socket.roomCode = roomCode;
        
        const playerData = {
            id: socket.id,
            name: data.name,
            color: data.color,
            hat: data.hat,
            mapVote: data.mapVote,
            x: 0, y: 0, angle: 0,
            lap: 1
        };
        
        room.players.set(socket.id, playerData);
        room.mapVote.set(socket.id, data.mapVote);
        players.set(socket.id, playerData);

        console.log(`[Room ${roomCode}] Created by ${data.name}`);
        
        io.to(roomCode).emit('roomState', {
            code: roomCode,
            state: room.state,
            mapIndex: room.mapIndex,
            players: Array.from(room.players.values())
        });

        callback({ success: true, roomCode });
    });

    socket.on('joinRoom', (data, callback) => {
        const room = rooms.get(data.roomCode);
        if (!room) {
            return callback({ success: false, error: 'Room not found' });
        }

        socket.join(data.roomCode);
        socket.roomCode = data.roomCode;

        const playerData = {
            id: socket.id,
            name: data.name,
            color: data.color,
            hat: data.hat,
            mapVote: data.mapVote,
            x: 0, y: 0, angle: 0,
            lap: 1
        };

        room.players.set(socket.id, playerData);
        room.mapVote.set(socket.id, data.mapVote);
        players.set(socket.id, playerData);

        console.log(`[Room ${data.roomCode}] ${data.name} joined (${room.players.size} players)`);

        io.to(data.roomCode).emit('roomState', {
            code: data.roomCode,
            state: room.state,
            mapIndex: room.mapIndex,
            players: Array.from(room.players.values())
        });

        callback({ success: true });
    });

    socket.on('updateMapVote', (data) => {
        const room = rooms.get(socket.roomCode);
        if (room) {
            room.mapVote.set(socket.id, data.mapVote);
            
            if (room.isVotesUnanimous()) {
                room.mapIndex = data.mapVote;
            } else {
                room.mapIndex = room.getFinalMap();
            }

            io.to(socket.roomCode).emit('mapVoteUpdate', { mapIndex: room.mapIndex });
        }
    });

    socket.on('startGame', (data, callback) => {
        const room = rooms.get(socket.roomCode);
        if (!room) return callback({ success: false });

        room.state = 'PLAYING';
        room.mapIndex = room.getFinalMap();

        io.to(socket.roomCode).emit('gameStart', {
            mapIndex: room.mapIndex,
            players: Array.from(room.players.values())
        });

        console.log(`[Room ${socket.roomCode}] Game started on map ${room.mapIndex}`);
        callback({ success: true });
    });

    socket.on('updatePlayer', (data) => {
        const room = rooms.get(socket.roomCode);
        if (room && room.players.has(socket.id)) {
            const player = room.players.get(socket.id);
            player.x = data.x;
            player.y = data.y;
            player.angle = data.angle;
            player.lap = data.lap;

            io.to(socket.roomCode).emit('playerUpdate', {
                id: socket.id,
                x: data.x,
                y: data.y,
                angle: data.angle,
                lap: data.lap
            });
        }
    });

    socket.on('leaveRoom', () => {
        const roomCode = socket.roomCode;
        const room = rooms.get(roomCode);

        if (room) {
            room.players.delete(socket.id);
            console.log(`[Room ${roomCode}] Player left (${room.players.size} remaining)`);

            if (room.players.size === 0) {
                rooms.delete(roomCode);
                console.log(`[Room ${roomCode}] Deleted (empty)`);
            } else {
                io.to(roomCode).emit('roomState', {
                    code: roomCode,
                    state: room.state,
                    mapIndex: room.mapIndex,
                    players: Array.from(room.players.values())
                });
            }
        }

        players.delete(socket.id);
        socket.leave(socket.roomCode || '');
    });

    socket.on('disconnect', () => {
        const roomCode = socket.roomCode;
        const room = rooms.get(roomCode);

        if (room) {
            room.players.delete(socket.id);
            if (room.players.size === 0) {
                rooms.delete(roomCode);
            } else {
                io.to(roomCode).emit('roomState', {
                    code: roomCode,
                    state: room.state,
                    mapIndex: room.mapIndex,
                    players: Array.from(room.players.values())
                });
            }
        }

        players.delete(socket.id);
        console.log(`[${new Date().toLocaleTimeString()}] Player disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🎮 Neon Drifter Server running on http://localhost:${PORT}`);
});
