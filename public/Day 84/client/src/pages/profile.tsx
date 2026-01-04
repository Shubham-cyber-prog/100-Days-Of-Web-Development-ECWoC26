import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, User, Settings, Bell, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const INTERESTS = [
  "Technology", "Business", "Marketing", "Design", "Finance", 
  "Healthcare", "Education", "Engineering", "Research", "Sales", 
  "HR", "Legal", "Consulting", "Real Estate", "Media", "Arts",
  "Science", "Entertainment", "Sports", "Travel", "Food", "Fashion"
];

interface UserProfile {
  name: string;
  profession: string;
  location: string;
  interests: string[];
  bio: string;
  locationSharing: boolean;
  notifications: boolean;
  discoverRadius: number;
}

export default function Profile() {
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    profession: '',
    location: '',
    interests: [],
    bio: '',
    locationSharing: true,
    notifications: true,
    discoverRadius: 10
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    const savedUsername = localStorage.getItem('username');
    
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else if (savedUsername) {
      // Create profile with username
      setProfile(prev => ({ ...prev, name: savedUsername }));
      setIsEditing(true);
    } else {
      setIsEditing(true);
    }
  }, []);

  const handleSave = () => {
    if (!profile.name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem('userProfile', JSON.stringify(profile));
    localStorage.setItem('username', profile.name);
    setIsEditing(false);

    toast({
      title: "Profile Saved",
      description: "Your profile has been updated successfully"
    });
  };

  const toggleInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleLocationDetect = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=demo&limit=1`);
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
              const components = data.results[0].components;
              const city = components.city || components.town || components.village || 'Unknown City';
              const country = components.country || 'Unknown Country';
              
              setProfile(prev => ({
                ...prev,
                location: `${city}, ${country}`
              }));
              
              toast({
                title: "Location Detected",
                description: `Set location to ${city}, ${country}`
              });
            }
          } catch (error) {
            toast({
              title: "Location Error",
              description: "Could not detect your location. Please enter manually.",
              variant: "destructive"
            });
          }
        },
        (error) => {
          toast({
            title: "Location Permission",
            description: "Location access denied. Please enter manually.",
            variant: "destructive"
          });
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-4 sm:mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Avatar className="h-12 sm:h-16 w-12 sm:w-16 mx-auto sm:mx-0">
                <AvatarFallback className="text-lg sm:text-xl font-semibold bg-blue-600 text-white">
                  {profile.name.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl font-bold">{profile.name || 'Your Profile'}</h1>
                <p className="text-gray-600">{profile.profession || 'Professional'}</p>
                {profile.location && (
                  <div className="flex items-center justify-center sm:justify-start mt-1 text-sm text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="truncate">{profile.location}</span>
                  </div>
                )}
              </div>
              <Button 
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "outline" : "default"}
                className={`w-full sm:w-auto ${isEditing ? "" : "bg-blue-600 hover:bg-blue-700"}`}
                size="sm"
              >
                <Settings className="h-4 w-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Basic Information */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="profession">Profession</Label>
                    <Input
                      id="profession"
                      value={profile.profession}
                      onChange={(e) => setProfile(prev => ({ ...prev, profession: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="Software Engineer, Designer, etc."
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="City, Country"
                      className="flex-1"
                    />
                    {isEditing && (
                      <Button 
                        variant="outline" 
                        onClick={handleLocationDetect}
                        className="shrink-0"
                      >
                        <MapPin className="h-4 w-4 mr-1" />
                        Detect
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                    placeholder="Tell others about yourself..."
                    className="w-full p-3 border border-gray-300 rounded-md resize-none h-20 disabled:bg-gray-50"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Interests */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Professional Interests</CardTitle>
                <p className="text-xs sm:text-sm text-gray-600">
                  Select interests to help us match you with relevant chat rooms
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {INTERESTS.map(interest => (
                    <div
                      key={interest}
                      onClick={() => isEditing && toggleInterest(interest)}
                      className={`p-2 sm:p-3 rounded-lg border text-center text-xs sm:text-sm cursor-pointer transition-all ${
                        profile.interests.includes(interest)
                          ? 'bg-blue-100 border-blue-300 text-blue-800'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      } ${!isEditing ? 'cursor-default' : ''}`}
                    >
                      {interest}
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-xs sm:text-sm text-gray-500">
                  Selected: {profile.interests.length} interests
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings & Stats */}
          <div className="space-y-4 sm:space-y-6">
            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Location Sharing</Label>
                    <p className="text-xs text-gray-500">Allow others to see your general location</p>
                  </div>
                  <Switch
                    checked={profile.locationSharing}
                    onCheckedChange={(checked) => setProfile(prev => ({ ...prev, locationSharing: checked }))}
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Notifications</Label>
                    <p className="text-xs text-gray-500">Receive chat and room notifications</p>
                  </div>
                  <Switch
                    checked={profile.notifications}
                    onCheckedChange={(checked) => setProfile(prev => ({ ...prev, notifications: checked }))}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Discovery Radius</Label>
                  <p className="text-xs text-gray-500 mb-2">How far to search for chat rooms (km)</p>
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    value={profile.discoverRadius}
                    onChange={(e) => setProfile(prev => ({ ...prev, discoverRadius: Number(e.target.value) }))}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Activity Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Rooms Joined</span>
                  <Badge variant="secondary">3</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Messages Sent</span>
                  <Badge variant="secondary">47</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Connections Made</span>
                  <Badge variant="secondary">12</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="mt-4 sm:mt-6 flex justify-center">
            <Button 
              onClick={handleSave}
              className="w-full sm:w-auto px-6 sm:px-8 py-2 bg-blue-600 hover:bg-blue-700"
            >
              Save Profile
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}