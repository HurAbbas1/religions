'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { 
  MessageCircle, 
  Users, 
  Send, 
  LogIn, 
  LogOut, 
  Hash,
  User,
  Clock
} from 'lucide-react'
import { io, Socket } from 'socket.io-client'

interface Room {
  id: string
  name: string
  description: string
  userCount: number
}

interface Message {
  id: string
  username: string
  message: string
  timestamp: Date
}

export default function CommunityChat() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [rooms, setRooms] = useState<Room[]>([])
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [messageInput, setMessageInput] = useState('')
  const [username, setUsername] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState(0)
  const [showUsernameModal, setShowUsernameModal] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (username && !socket) {
      const newSocket = io('/?XTransformPort=3003')
      
      newSocket.on('connect', () => {
        setIsConnected(true)
        console.log('Connected to chat server')
      })

      newSocket.on('disconnect', () => {
        setIsConnected(false)
        console.log('Disconnected from chat server')
      })

      newSocket.on('rooms', (roomsList: Room[]) => {
        setRooms(roomsList)
      })

      newSocket.on('joined-room', (roomId: string) => {
        const room = rooms.find(r => r.id === roomId)
        if (room) {
          setCurrentRoom(room)
        }
      })

      newSocket.on('room-messages', (roomMessages: Message[]) => {
        setMessages(roomMessages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })))
      })

      newSocket.on('new-message', (message: Message) => {
        setMessages(prev => [...prev, {
          ...message,
          timestamp: new Date(message.timestamp)
        }])
      })

      newSocket.on('user-count', (count: number) => {
        setOnlineUsers(count)
      })

      newSocket.on('user-joined', (joinedUsername: string) => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          username: 'System',
          message: `${joinedUsername} joined the room`,
          timestamp: new Date()
        }])
      })

      newSocket.on('user-left', (leftUsername: string) => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          username: 'System',
          message: `${leftUsername} left the room`,
          timestamp: new Date()
        }])
      })

      setSocket(newSocket)

      return () => {
        newSocket.close()
      }
    }
  }, [username, rooms])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const joinRoom = (roomId: string) => {
    if (socket && username) {
      socket.emit('join-room', roomId, username)
    }
  }

  const leaveRoom = () => {
    if (socket && username && currentRoom) {
      socket.emit('leave-room', username)
      setCurrentRoom(null)
      setMessages([])
    }
  }

  const sendMessage = () => {
    if (socket && username && currentRoom && messageInput.trim()) {
      socket.emit('send-message', {
        roomId: currentRoom.id,
        username,
        message: messageInput.trim()
      })
      setMessageInput('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (showUsernameModal) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-amber-400 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 mr-2" />
                Join Community Chat
              </CardTitle>
              <CardDescription className="text-slate-300">
                Enter a username to join the spiritual discussion rooms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && username.trim()) {
                    setShowUsernameModal(false)
                  }
                }}
                className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-amber-500"
                maxLength={20}
              />
              <Button
                onClick={() => setShowUsernameModal(false)}
                disabled={!username.trim()}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white"
              >
                Join Chat
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-amber-400 flex items-center">
                <MessageCircle className="w-8 h-8 mr-3" />
                Community Chat Rooms
              </h1>
              <p className="text-slate-300 mt-2">
                Connect with others on their spiritual journey
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={isConnected ? "default" : "destructive"} className="bg-green-500">
                {isConnected ? 'Connected' : 'Disconnected'}
              </Badge>
              <div className="text-sm text-slate-300">
                Welcome, <span className="text-amber-400 font-semibold">{username}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Rooms Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-amber-400 flex items-center">
                  <Hash className="w-5 h-5 mr-2" />
                  Chat Rooms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {rooms.map((room) => (
                  <motion.div
                    key={room.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className={`bg-slate-700 border-slate-600 cursor-pointer transition-all duration-300 hover:border-amber-500 ${
                        currentRoom?.id === room.id ? 'border-amber-500' : ''
                      }`}
                      onClick={() => {
                        if (currentRoom?.id === room.id) {
                          leaveRoom()
                        } else {
                          joinRoom(room.id)
                        }
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-white">{room.name}</h3>
                          <Badge variant="outline" className="border-slate-500 text-slate-300">
                            <Users className="w-3 h-3 mr-1" />
                            {room.userCount}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-400 mb-3">{room.description}</p>
                        <Button
                          size="sm"
                          variant={currentRoom?.id === room.id ? "secondary" : "outline"}
                          className="w-full"
                        >
                          {currentRoom?.id === room.id ? (
                            <>
                              <LogOut className="w-4 h-4 mr-2" />
                              Leave
                            </>
                          ) : (
                            <>
                              <LogIn className="w-4 h-4 mr-2" />
                              Join
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            {currentRoom ? (
              <Card className="bg-slate-800 border-slate-700 h-[600px] flex flex-col">
                <CardHeader className="bg-slate-700 border-b border-slate-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-amber-400 flex items-center">
                        <Hash className="w-5 h-5 mr-2" />
                        {currentRoom.name}
                      </CardTitle>
                      <CardDescription className="text-slate-300">
                        {currentRoom.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="border-green-500 text-green-400">
                        <Users className="w-3 h-3 mr-1" />
                        {onlineUsers} online
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={leaveRoom}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Leave
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col p-0">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${message.username === username ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] ${message.username === username ? 'text-right' : 'text-left'}`}>
                            <div className="flex items-center space-x-2 mb-1">
                              {message.username !== 'System' && (
                                <span className="text-sm font-semibold text-amber-400">
                                  {message.username === username ? 'You' : message.username}
                                </span>
                              )}
                              {message.username === 'System' && (
                                <span className="text-sm text-slate-500 italic">
                                  {message.username}
                                </span>
                              )}
                              <span className="text-xs text-slate-500">
                                {formatTime(message.timestamp)}
                              </span>
                            </div>
                            <div
                              className={`rounded-lg px-4 py-2 ${
                                message.username === username
                                  ? 'bg-amber-500 text-white'
                                  : message.username === 'System'
                                  ? 'bg-slate-700 text-slate-300 italic'
                                  : 'bg-slate-700 text-slate-200'
                              }`}
                            >
                              {message.message}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  <Separator className="bg-slate-700" />

                  <div className="p-4">
                    <div className="flex space-x-2">
                      <Input
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-amber-500"
                        maxLength={500}
                      />
                      <Button
                        onClick={sendMessage}
                        disabled={!messageInput.trim()}
                        size="icon"
                        className="bg-amber-500 hover:bg-amber-600"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-slate-800 border-slate-700 h-[600px]">
                <CardContent className="h-full flex items-center justify-center">
                  <div className="text-center text-slate-400">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Select a Room to Join</h3>
                    <p>Choose a chat room from the sidebar to start discussing with others</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}