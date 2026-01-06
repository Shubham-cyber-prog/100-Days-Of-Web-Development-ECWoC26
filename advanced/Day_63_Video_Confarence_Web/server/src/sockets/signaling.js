const Room = require('../models/Room');

function signaling(io) {
  io.on('connection', (socket) => {
    // Handle joining a room
    socket.on('join-room', async ({ roomCode, displayName }) => {
      const code = roomCode.trim();

      try {
        // Find room or auto-create if not found
        let room = await Room.findOne({ code });
        if (!room) {
          room = await Room.create({
            code,
            name: 'Untitled Room',
            participants: []
          });
        }

        // Join the socket.io room
        socket.join(code);

        // Add participant if not already present
        if (!room.participants.some(p => p.socketId === socket.id)) {
          room.participants.push({
            socketId: socket.id,
            displayName: displayName || 'Guest'
          });
          await room.save();
        }

        // Notify others in the room
        socket.to(code).emit('user-joined', {
          socketId: socket.id,
          displayName
        });

        // Send existing participants to the new user
        socket.emit(
          'existing-participants',
          room.participants.filter(p => p.socketId !== socket.id)
        );
      } catch (err) {
        console.error('Error joining room:', err);
        socket.emit('room-error', 'Could not join room');
      }
    });

    // WebRTC signaling events
    socket.on('webrtc-offer', ({ to, sdp }) => {
      io.to(to).emit('webrtc-offer', { from: socket.id, sdp });
    });

    socket.on('webrtc-answer', ({ to, sdp }) => {
      io.to(to).emit('webrtc-answer', { from: socket.id, sdp });
    });

    socket.on('webrtc-ice-candidate', ({ to, candidate }) => {
      io.to(to).emit('webrtc-ice-candidate', { from: socket.id, candidate });
    });

    // Handle leaving a room
    socket.on('leave-room', async ({ roomCode }) => {
      socket.leave(roomCode);
      try {
        await Room.findOneAndUpdate(
          { code: roomCode },
          { $pull: { participants: { socketId: socket.id } } }
        );
        socket.to(roomCode).emit('user-left', { socketId: socket.id });
      } catch (err) {
        console.error('Error leaving room:', err);
      }
    });

    // Handle disconnect
    socket.on('disconnect', async () => {
      const rooms = Array.from(socket.rooms).filter(r => r !== socket.id);
      for (const roomCode of rooms) {
        try {
          await Room.findOneAndUpdate(
            { code: roomCode },
            { $pull: { participants: { socketId: socket.id } } }
          );
          socket.to(roomCode).emit('user-left', { socketId: socket.id });
        } catch (err) {
          console.error('Error on disconnect:', err);
        }
      }
    });
  });
}

module.exports = signaling;