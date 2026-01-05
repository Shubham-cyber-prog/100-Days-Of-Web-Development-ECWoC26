import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, MessageCircle, Navigation } from 'lucide-react';
import { useLocation } from 'wouter';

interface NearbyRoom {
  id: string;
  name: string;
  interests: string[];
  distance: number;
  participants: number;
  city: string;
  country: string;
}

export default function Discover() {
  const [, setLocation] = useLocation();
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number, city: string, country: string} | null>(null);
  const [nearbyRooms, setNearbyRooms] = useState<NearbyRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationPermission, setLocationPermission] = useState<'pending' | 'granted' | 'denied'>('pending');

  useEffect(() => {
    requestLocation();
  }, []);

  const requestLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Reverse geocoding to get city/country
          try {
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=demo&limit=1`);
            const data = await response.json();
            
            let city = 'Unknown City';
            let country = 'Unknown Country';
            
            if (data.results && data.results.length > 0) {
              const components = data.results[0].components;
              city = components.city || components.town || components.village || 'Unknown City';
              country = components.country || 'Unknown Country';
            }
            
            setUserLocation({ lat: latitude, lng: longitude, city, country });
            setLocationPermission('granted');
            
            // Generate nearby rooms based on location
            generateNearbyRooms(latitude, longitude, city, country);
          } catch (error) {
            console.error('Geocoding failed:', error);
            setUserLocation({ lat: latitude, lng: longitude, city: 'Unknown City', country: 'Unknown Country' });
            setLocationPermission('granted');
            generateNearbyRooms(latitude, longitude, 'Unknown City', 'Unknown Country');
          }
        },
        (error) => {
          console.error('Location access denied:', error);
          setLocationPermission('denied');
          setLoading(false);
          
          // Generate sample rooms without location
          generateSampleRooms();
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setLocationPermission('denied');
      setLoading(false);
      generateSampleRooms();
    }
  };

  const generateNearbyRooms = (lat: number, lng: number, city: string, country: string) => {
    const interests = [
      "Technology", "Business", "Marketing", "Design", "Finance", 
      "Healthcare", "Education", "Engineering", "Research", "Sales"
    ];
    
    const roomNames = [
      "Tech Innovators", "Business Leaders", "Creative Minds", "Health Professionals",
      "Local Entrepreneurs", "Digital Marketers", "Software Engineers", "Startup Community",
      "Professional Network", "Industry Experts"
    ];

    const rooms: NearbyRoom[] = [];
    
    for (let i = 0; i < 8; i++) {
      const distance = Math.random() * 15 + 0.5; // 0.5 to 15.5 km
      const selectedInterests = interests
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 2);
      
      rooms.push({
        id: `room-${i}`,
        name: roomNames[i] + ` - ${city}`,
        interests: selectedInterests,
        distance: Number(distance.toFixed(1)),
        participants: Math.floor(Math.random() * 25) + 3,
        city,
        country
      });
    }
    
    // Sort by distance
    rooms.sort((a, b) => a.distance - b.distance);
    
    setNearbyRooms(rooms);
    setLoading(false);
  };

  const generateSampleRooms = () => {
    const sampleRooms: NearbyRoom[] = [
      {
        id: 'sample-1',
        name: 'Global Tech Community',
        interests: ['Technology', 'Innovation', 'Startups'],
        distance: 0,
        participants: 42,
        city: 'Virtual',
        country: 'Global'
      },
      {
        id: 'sample-2',
        name: 'Business Professionals',
        interests: ['Business', 'Finance', 'Marketing'],
        distance: 0,
        participants: 28,
        city: 'Virtual',
        country: 'Global'
      }
    ];
    
    setNearbyRooms(sampleRooms);
    setLoading(false);
  };

  const joinRoom = (roomId: string) => {
    // Store selected room info for the chat page
    const room = nearbyRooms.find(r => r.id === roomId);
    if (room) {
      localStorage.setItem('selectedRoom', JSON.stringify(room));
      setLocation('/chat');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-6 sm:p-8 text-center">
            <Navigation className="h-10 sm:h-12 w-10 sm:w-12 mx-auto mb-4 text-blue-600 animate-spin" />
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Detecting Your Location</h2>
            <p className="text-sm sm:text-base text-gray-600">Finding nearby chat rooms...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (locationPermission === 'denied') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto p-4 pt-8">
          <Card className="mb-6">
            <CardContent className="p-6 text-center">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-orange-500" />
              <h2 className="text-xl font-semibold mb-2">Location Access Needed</h2>
              <p className="text-gray-600 mb-4">
                To show you nearby chat rooms, we need access to your location. 
                You can still browse global rooms below.
              </p>
              <Button onClick={requestLocation} className="bg-blue-600 hover:bg-blue-700">
                <Navigation className="h-4 w-4 mr-2" />
                Enable Location
              </Button>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-4">
            {nearbyRooms.map(room => (
              <Card key={room.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg">{room.name}</span>
                    <Badge variant="outline">
                      <Users className="h-3 w-3 mr-1" />
                      {room.participants}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {room.interests.map(interest => (
                      <Badge key={interest} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    onClick={() => joinRoom(room.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Join Room
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto p-4 pt-4 sm:pt-8">
        {/* Location Header */}
        <Card className="mb-4 sm:mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 sm:h-6 w-5 sm:w-6 text-blue-600 flex-shrink-0" />
                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl font-bold">Nearby Chat Rooms</h1>
                  <p className="text-sm sm:text-base text-gray-600 truncate">
                    Your location: {userLocation?.city}, {userLocation?.country}
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setLocation('/chat')}
                className="w-full sm:w-auto"
                size="sm"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                View All Rooms
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Nearby Rooms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {nearbyRooms.map(room => (
            <Card key={room.id} className="hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-start justify-between gap-2">
                  <span className="text-base sm:text-lg line-clamp-2 flex-1">{room.name}</span>
                  <Badge variant="outline" className="flex-shrink-0">
                    <Users className="h-3 w-3 mr-1" />
                    {room.participants}
                  </Badge>
                </CardTitle>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span>{room.distance}km away</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1 mb-4">
                  {room.interests.slice(0, 3).map(interest => (
                    <Badge key={interest} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                  {room.interests.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{room.interests.length - 3}
                    </Badge>
                  )}
                </div>
                <Button 
                  onClick={() => joinRoom(room.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base"
                  size="sm"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Join Chat
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {nearbyRooms.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold mb-2">No rooms found nearby</h2>
              <p className="text-gray-600 mb-4">Be the first to start a conversation in your area!</p>
              <Button 
                onClick={() => setLocation('/chat')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Create New Room
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}