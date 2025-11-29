import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const server = createServer()
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

// Store room information
const rooms = new Map<string, {
  name: string
  description: string
  users: Set<string>
  messages: Array<{
    id: string
    username: string
    message: string
    timestamp: Date
  }>
}>()

// Initialize default rooms
const defaultRooms = [
  { id: 'general', name: 'General Interfaith', description: 'Open discussion about all religions and spirituality' },
  { id: 'islamic', name: 'Islamic Discussion', description: 'Focus on Islamic teachings and practices' },
  { id: 'christian', name: 'Christian Inquiry', description: 'Discussion about Christianity and its various denominations' },
  { id: 'eastern', name: 'Eastern Philosophies', description: 'Buddhism, Hinduism, Taoism and Eastern traditions' },
  { id: 'comparative', name: 'Comparative Religion', description: 'Comparing different religious traditions' },
  { id: 'meditation', name: 'Meditation & Mindfulness', description: 'Practices and experiences across traditions' }
]

defaultRooms.forEach(room => {
  rooms.set(room.id, {
    name: room.name,
    description: room.description,
    users: new Set(),
    messages: []
  })
})

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`)

  // Send list of available rooms
  socket.emit('rooms', Array.from(rooms.entries()).map(([id, room]) => ({
    id,
    name: room.name,
    description: room.description,
    userCount: room.users.size
  })))

  // Join a room
  socket.on('join-room', (roomId: string, username: string) => {
    if (!rooms.has(roomId)) {
      socket.emit('error', 'Room not found')
      return
    }

    // Leave previous room if any
    const previousRoom = Array.from(rooms.entries()).find(([_, room]) => room.users.has(socket.id))
    if (previousRoom) {
      previousRoom[1].users.delete(socket.id)
      socket.leave(previousRoom[0])
      io.to(previousRoom[0]).emit('user-left', username)
      io.to(previousRoom[0]).emit('user-count', previousRoom[1].users.size)
    }

    // Join new room
    const room = rooms.get(roomId)!
    room.users.add(socket.id)
    socket.join(roomId)
    
    socket.emit('joined-room', roomId)
    socket.emit('room-messages', room.messages)
    io.to(roomId).emit('user-joined', username)
    io.to(roomId).emit('user-count', room.users.size)
    
    console.log(`User ${username} (${socket.id}) joined room ${roomId}`)
  })

  // Send message to room
  socket.on('send-message', (data: { roomId: string; username: string; message: string }) => {
    const { roomId, username, message } = data
    
    if (!rooms.has(roomId)) {
      socket.emit('error', 'Room not found')
      return
    }

    const room = rooms.get(roomId)!
    const messageData = {
      id: Date.now().toString(),
      username,
      message: message.trim(),
      timestamp: new Date()
    }

    // Store message (keep last 100 messages per room)
    room.messages.push(messageData)
    if (room.messages.length > 100) {
      room.messages.shift()
    }

    // Broadcast to room
    io.to(roomId).emit('new-message', messageData)
    
    console.log(`Message in ${roomId}: ${username}: ${message}`)
  })

  // Leave room
  socket.on('leave-room', (username: string) => {
    const roomEntry = Array.from(rooms.entries()).find(([_, room]) => room.users.has(socket.id))
    if (roomEntry) {
      const [roomId, room] = roomEntry
      room.users.delete(socket.id)
      socket.leave(roomId)
      io.to(roomId).emit('user-left', username)
      io.to(roomId).emit('user-count', room.users.size)
      console.log(`User ${username} (${socket.id}) left room ${roomId}`)
    }
  })

  // Handle disconnect
  socket.on('disconnect', () => {
    const roomEntry = Array.from(rooms.entries()).find(([_, room]) => room.users.has(socket.id))
    if (roomEntry) {
      const [roomId, room] = roomEntry
      room.users.delete(socket.id)
      io.to(roomId).emit('user-count', room.users.size)
      console.log(`User ${socket.id} disconnected from room ${roomId}`)
    }
    console.log(`User disconnected: ${socket.id}`)
  })
})

const PORT = 3003
server.listen(PORT, () => {
  console.log(`Chat service running on port ${PORT}`)
})