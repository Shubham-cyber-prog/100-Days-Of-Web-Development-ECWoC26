import { useEffect, useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card'; // Added CardContent
import { Badge } from '@/components/ui/badge';
import { Send, Plus, Users, Loader2 } from 'lucide-react'; // Added Loader2 for loading state

// Chat Room Constants
const INTERESTS = [
  "Technology", "Business", "Marketing", "Design",
  "Finance", "Healthcare", "Education", "Engineering",
  "Research", "Sales", "HR", "Legal",
  "Consulting", "Real Estate", "Media", "Arts"
];

// Interfaces matching server structures more closely
interface ChatMessage {
  id: string;
  roomId: string;
  username: string;
  content: string;
  timestamp: number;
}

// Simplified Room Info for the list
interface RoomInfo {
  id: string;
  name: string;
  interests: string[];
  participantCount: number; // Use count directly
}

// Detailed Room Info when joined
interface CurrentChatRoom extends RoomInfo {
    messages: ChatMessage[];
    participants: string[]; // List of usernames
}


export default function Chat() {
  const [currentRoom, setCurrentRoom] = useState<CurrentChatRoom | null>(null);
  const [rooms, setRooms] = useState<RoomInfo[]>([]); // Use RoomInfo for the list
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [username, setUsername] = useState<string>('');
  const [message, setMessage] = useState('');
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'open' | 'closed'>('connecting');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    // Scroll when currentRoom or its messages change
    if (currentRoom) {
      scrollToBottom();
    }
  }, [currentRoom?.messages, currentRoom?.id, scrollToBottom]); // Add currentRoom.id dependency

  // WebSocket connection logic
  useEffect(() => {
    let storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      const inputUsername = prompt('Enter your name to join chat:');
      if (inputUsername && inputUsername.trim()) {
        storedUsername = inputUsername.trim();
        localStorage.setItem('username', storedUsername);
        setUsername(storedUsername);
      } else {
        alert('A username is required to use the chat.');
        // Maybe redirect or disable chat functionality
        return;
      }
    } else {
      setUsername(storedUsername);
    }

    // storedUsername is guaranteed to be set here if we proceed

    let ws: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;
    let pingInterval: NodeJS.Timeout | null = null; 

    const connectWebSocket = () => {
        setConnectionStatus('connecting');
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}/ws`;
        console.log('Connecting to WebSocket:', wsUrl);

        ws = new WebSocket(wsUrl);

        ws.onopen = () => {
          console.log('Connected to chat server');
          setConnectionStatus('open');
          setSocket(ws); // Set the socket state here
          if (reconnectTimeout) {
            clearTimeout(reconnectTimeout);
            reconnectTimeout = null;
          }

          // Clear any existing ping interval
          if (pingInterval) {
            clearInterval(pingInterval);
          }

          // Start sending pings
          pingInterval = setInterval(() => {
            if (ws && ws.readyState === WebSocket.OPEN) {
              // console.log('Sending ping'); // Optional: for debugging
              ws.send(JSON.stringify({ type: 'ping' }));
            }
          }, 30000); // Send a ping every 30 seconds

          // Request initial room list
          ws?.send(JSON.stringify({ type: 'getRooms' }));
        };

        ws.onmessage = (event) => {
          try {
              const data = JSON.parse(event.data);
              // console.log('Received message:', data); // Log received data
              handleWebSocketMessage(data);
          } catch (error) {
              console.error("Failed to parse message:", event.data, error);
          }
        };

        ws.onclose = (event) => {
          console.log('Disconnected from chat server. Code:', event.code, 'Reason:', event.reason);
          setConnectionStatus('closed');
          setSocket(null); // Clear the socket state

          // Clear the ping interval
          if (pingInterval) {
            clearInterval(pingInterval);
            pingInterval = null;
          }

          // Attempt to reconnect after a delay
          if (!reconnectTimeout) {
            console.log('Attempting to reconnect in 5 seconds...');
            reconnectTimeout = setTimeout(connectWebSocket, 5000);
          }
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          // The onclose event will likely fire after this, triggering reconnect logic
        };
    };

    connectWebSocket(); // Initial connection attempt

    // Cleanup function
    return () => {
        console.log('Cleaning up WebSocket connection.');
        if (reconnectTimeout) {
            clearTimeout(reconnectTimeout);
        }
        
        // Clear ping interval on unmount
        if (pingInterval) {
          clearInterval(pingInterval);
        }

        ws?.close();
        setSocket(null); // Ensure socket state is cleared on component unmount
    };
    
  }, []); // <--- THIS IS THE FIX: Empty dependency array ensures this runs only ONCE.

  // WebSocket message handler
  const handleWebSocketMessage = useCallback((data: any) => {
    switch (data.type) {
      case 'rooms':
        // Update the list of available rooms
        setRooms(data.rooms.map((room: any) => ({
          id: room.id,
          name: room.name,
          interests: room.interests,
          participantCount: room.participants // Expecting count from server
        })));
        break;
      case 'message':
         // Add message only to the currently viewed room
         setCurrentRoom(prev => {
            // Check if the message is for the current room and not already present
            if (prev && prev.id === data.message.roomId && !prev.messages.some(msg => msg.id === data.message.id)) {
              console.log(`Adding message ${data.message.id} to room ${prev.id}`);
              return {
                ...prev,
                messages: [...prev.messages, data.message].sort((a,b) => a.timestamp - b.timestamp) // Keep messages sorted
              };
            }
            return prev; // No change if not current room or duplicate
          });
        break;
      case 'roomJoined':
         // Update the detailed view of the current room
         console.log('Joined room:', data.room);
         setCurrentRoom({
             id: data.room.id,
             name: data.room.name,
             interests: data.room.interests,
             messages: data.room.messages.sort((a,b) => a.timestamp - b.timestamp), // Sort messages on join
             participants: data.room.participants,
             participantCount: data.room.participants.length // Calculate count client-side too
         });
         // Also update participant count in the main list
         setRooms(prevRooms => prevRooms.map(r =>
            r.id === data.room.id ? { ...r, participantCount: data.room.participants.length } : r
         ));
        break;
      case 'participantsUpdate':
        console.log(`Participants update for room ${data.roomId}:`, data.participants);
        // Update participants list *and* count for the currently viewed room
        setCurrentRoom(prev => {
          if (prev && prev.id === data.roomId) {
            return {
              ...prev,
              participants: data.participants,
              participantCount: data.participants.length // Update count
            };
          }
          return prev;
        });
        // Update participant count in the main rooms list
        setRooms(prevRooms => prevRooms.map(room =>
          room.id === data.roomId ? { ...room, participantCount: data.participants.length } : room
        ));
        break;
       default:
         console.log("Received unhandled message type:", data.type);
    }
  }, []); // Empty dependency array is correct here, as it only uses state setters

  // Function to join a room
  const joinRoom = (roomId: string) => {
    // This function now correctly uses the 'username' state, 
    // which was set reliably on the first render.
    if (socket && socket.readyState === WebSocket.OPEN && username) {
        console.log(`Requesting to join room ${roomId} as ${username}`);
        socket.send(JSON.stringify({
            type: 'joinRoom',
            roomId,
            username // Send username
        }));
    } else {
        console.warn('Cannot join room: WebSocket not connected or username missing.');
    }
  };

  // Function to send a message
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const contentToSend = message.trim(); // Trim whitespace

    if (contentToSend && currentRoom && socket && socket.readyState === WebSocket.OPEN) {
      console.log(`Sending message to room ${currentRoom.id}: "${contentToSend}"`);
      socket.send(JSON.stringify({
        type: 'sendMessage',
        roomId: currentRoom.id, // Good practice to include roomId
        content: contentToSend
      }));
      setMessage(''); // Clear input after sending
    } else {
       console.warn('Cannot send message: WebSocket not open, not in a room, or message empty.');
    }
  };

  // Function to create a room
  const createRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedRoomName = newRoomName.trim();
    if (trimmedRoomName && selectedInterests.length > 0 && socket && socket.readyState === WebSocket.OPEN) {
        console.log(`Requesting to create room "${trimmedRoomName}" with interests: ${selectedInterests.join(', ')}`);
        socket.send(JSON.stringify({
            type: 'createRoom',
            name: trimmedRoomName,
            interests: selectedInterests
        }));

        // Reset form and close modal
        setNewRoomName('');
        setSelectedInterests([]);
        setIsCreateRoomOpen(false);
    } else {
       console.warn('Cannot create room: WebSocket not open, name empty, or no interests selected.');
    }
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40"> {/* Lower z-index than modal */}
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 text-blue-600">
                <Users className="h-5 sm:h-6 w-5 sm:w-6" />
                <span className="text-lg sm:text-xl font-bold">IntelliCircle Chat</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
               {username && (
                 <div className="text-xs sm:text-sm text-gray-600 hidden md:block">
                   Logged in as: <span className="font-medium">{username}</span>
                 </div>
               )}
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                    connectionStatus === 'open' ? 'bg-green-100 text-green-800' :
                    connectionStatus === 'connecting' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                }`}>
                    {connectionStatus === 'open' ? 'Connected' : connectionStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
                </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto p-2 sm:p-4 grid grid-cols-1 lg:grid-cols-4 gap-2 sm:gap-4 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)]">
        {/* Rooms Sidebar */}
        <div className="lg:col-span-1 lg:block">
          <Card className="h-full flex flex-col">
            <div className="p-3 sm:p-4 border-b">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <h2 className="text-base sm:text-lg font-semibold">Chat Rooms</h2>
                <Button
                  size="sm"
                  onClick={() => setIsCreateRoomOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 px-2 sm:px-3"
                  disabled={connectionStatus !== 'open'} // Disable if not connected
                  title={connectionStatus !== 'open' ? "Connect to create room" : "Create new room"}
                >
                  <Plus className="h-4 w-4" />
                  <span className="ml-1 hidden sm:inline">New</span>
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-1 sm:space-y-2">
              {rooms.length === 0 && connectionStatus === 'open' && (
                  <p className="text-sm text-gray-500 text-center py-4">No rooms available. Create one!</p>
              )}
               {connectionStatus === 'connecting' && (
                   <div className="flex justify-center items-center py-4">
                       <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                   </div>
               )}
              {rooms.map(room => (
                <div
                  key={room.id}
                  onClick={() => joinRoom(room.id)}
                  className={`p-2 sm:p-3 rounded-lg cursor-pointer transition-colors ${
                    currentRoom?.id === room.id
                      ? 'bg-blue-100 border-blue-300 border'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <h3 className="font-medium text-xs sm:text-sm line-clamp-1">{room.name}</h3>
                  {/* Display participantCount */}
                  <p className="text-xs text-gray-500">{room.participantCount ?? 0} participants</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            <div className="p-3 sm:p-4 border-b min-h-[70px]"> {/* Ensure header has min height */}
              {currentRoom ? (
                <>
                  <h2 className="text-base sm:text-lg font-semibold line-clamp-1">
                    {currentRoom.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {currentRoom.participantCount ?? currentRoom.participants.length} participants
                  </p>
                 </>
              ) : (
                <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500 text-sm sm:text-base">
                        {connectionStatus === 'connecting' ? 'Connecting to chat...' : 'Select a room to start chatting'}
                    </p>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-2 sm:space-y-3 relative">
                {/* Message Display */}
                {currentRoom?.messages.map(msg => (
                <div
                    key={msg.id}
                    className={`flex ${msg.username === username ? 'justify-end' : 'justify-start'}`}
                >
                    <div className={`max-w-[80%] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 rounded-lg shadow-sm ${
                    msg.username === username
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                    <div className="text-xs opacity-75 mb-1 font-medium">{msg.username === username ? 'You' : msg.username}</div>
                    <div className="text-sm sm:text-base break-words whitespace-pre-wrap">{msg.content}</div> {/* Preserve whitespace */}
                    <div className="text-xs opacity-75 mt-1 text-right">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {/* Simpler time format */}
                    </div>
                    </div>
                </div>
                ))}
                {/* Scroll Anchor */}
                <div ref={messagesEndRef} />
                 {/* Loading/Empty State for messages */}
                 {!currentRoom && connectionStatus === 'open' && (
                     <div className="absolute inset-0 flex items-center justify-center">
                         <p className="text-gray-400">Select a room from the left.</p>
                     </div>
                 )}
                 {currentRoom && currentRoom.messages.length === 0 && (
                     <div className="absolute inset-0 flex items-center justify-center">
                         <p className="text-gray-400">No messages yet. Start the conversation!</p>
                     </div>
                 )}
            </div>


            {/* Message Input */}
            {currentRoom && (
              <div className="p-2 sm:p-4 border-t bg-white">
                <form onSubmit={sendMessage} className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 text-sm sm:text-base"
                    disabled={connectionStatus !== 'open'}
                    autoComplete="off"
                  />
                  <Button
                    type="submit"
                    size="sm" // Consistent size
                    className="bg-blue-600 hover:bg-blue-700 px-2 sm:px-3"
                    disabled={!message.trim() || connectionStatus !== 'open'} // Disable if no message or not connected
                    title={connectionStatus !== 'open' ? "Connect to send message" : "Send message"}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            )}
          </Card>
        </div>

        {/* Room Details Sidebar (Desktop) */}
        <div className="hidden lg:block lg:col-span-1">
            <Card className="h-full">
            <CardContent className="h-full flex flex-col p-0"> {/* Remove default padding */}
                <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Room Details</h3>
                </div>
                {currentRoom ? (
                <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                    <div>
                        <h4 className="font-medium mb-2 text-sm">Participants ({currentRoom.participantCount ?? currentRoom.participants.length})</h4>
                        <div className="space-y-1 max-h-48 overflow-y-auto pr-2"> {/* Limit height and add padding */}
                            {currentRoom.participants.map(participant => (
                            <div key={participant} className="flex items-center space-x-2 text-sm">
                                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
                                {participant[0]?.toUpperCase()}
                                </div>
                                <span className="truncate" title={participant}>{participant}</span>
                            </div>
                            ))}
                        </div>
                    </div>

                    <div>
                    <h4 className="font-medium mb-2 text-sm">Room Interests</h4>
                    <div className="flex flex-wrap gap-1">
                        {currentRoom.interests.map(interest => (
                        <Badge key={interest} variant="secondary" className="text-xs">
                            {interest}
                        </Badge>
                        ))}
                    </div>
                    </div>
                </div>
                 ) : (
                    <div className="p-4 text-sm text-gray-500 flex items-center justify-center flex-1">
                       Select a room to view details.
                    </div>
                )}
            </CardContent>
            </Card>
        </div>
      </div>

      {/* Create Room Modal */}
      {isCreateRoomOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md mx-auto bg-white"> {/* Ensure background is white */}
            <div className="p-4 sm:p-6">
              <h2 className="text-lg font-semibold mb-4">Create New Room</h2>
              <form onSubmit={createRoom} className="space-y-4">
                <div>
                  <label htmlFor="roomName" className="block text-sm font-medium mb-1">Room Name</label>
                  <Input
                    id="roomName"
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                    placeholder="e.g., Local Python Developers"
                    required
                    maxLength={50} // Add max length
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Select Interests (at least 1)</label>
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded-md p-2 bg-gray-50">
                    {INTERESTS.map(interest => (
                      <label key={interest} className={`flex items-center space-x-2 text-sm cursor-pointer p-1 rounded transition-colors ${selectedInterests.includes(interest) ? 'bg-blue-100' : 'hover:bg-gray-100'}`}>
                        <input
                          type="checkbox"
                          checked={selectedInterests.includes(interest)}
                          onChange={() => toggleInterest(interest)}
                          className="rounded focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                        />
                        <span>{interest}</span>
                      </label>
                    ))}
                  </div>
                   {selectedInterests.length === 0 && <p className="text-xs text-red-500 mt-1">Please select at least one interest.</p>}
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsCreateRoomOpen(false);
                      setNewRoomName('');
                      setSelectedInterests([]);
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    disabled={!newRoomName.trim() || selectedInterests.length === 0}
                  >
                    Create Room
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}