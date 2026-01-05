import { Button } from "@/components/ui/button";
import { WaitlistForm } from "@/components/waitlist-form";
import { Card, CardContent } from "@/components/ui/card";
import { MapIcon, Users2Icon, BrainCircuitIcon, MessagesSquareIcon, MapPinIcon, BuildingIcon, MessageCircle, Zap, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg md:text-xl font-bold text-gray-900">IntelliCircle</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={() => setLocation('/discover')} className="text-gray-600 hover:text-gray-900 transition-colors">
                Discover
              </button>
              <button onClick={() => setLocation('/chat')} className="text-gray-600 hover:text-gray-900 transition-colors">
                Chat
              </button>
              <button onClick={() => setLocation('/profile')} className="text-gray-600 hover:text-gray-900 transition-colors">
                Profile
              </button>
            </div>

            <div className="flex items-center space-x-1 md:space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setLocation('/discover')}
                className="hidden sm:flex"
              >
                Discover
              </Button>
              <Button 
                size="sm" 
                onClick={() => setLocation('/chat')}
                className="bg-blue-600 hover:bg-blue-700 px-3 md:px-4"
              >
                <span className="hidden sm:inline">Start </span>Chat
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center space-y-4 md:space-y-6"
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={fadeIn.transition}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Connect Locally.<br className="sm:hidden" /> Network Globally.
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              Join location-based professional chat rooms. Find colleagues in your area, 
              share ideas, and build meaningful connections based on shared interests.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 md:mt-8 px-4 sm:px-0">
              <Button 
                size="lg" 
                onClick={() => setLocation('/discover')}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-base sm:text-lg px-6 sm:px-8 py-3 h-12 sm:h-auto"
              >
                <MapPin className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                Find Nearby Rooms
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setLocation('/chat')}
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 h-12 sm:h-auto"
              >
                <MessageCircle className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                Browse All Rooms
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Why Choose IntelliCircle?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard
              icon={<MapIcon className="w-10 sm:w-12 h-10 sm:h-12 text-blue-600" />}
              title="Location-Based"
              description="Find professionals in your city, neighborhood, or anywhere you choose"
            />
            <FeatureCard
              icon={<Zap className="w-10 sm:w-12 h-10 sm:h-12 text-blue-600" />}
              title="Instant Connection"
              description="Join conversations immediately with real-time chat and instant notifications"
            />
            <FeatureCard
              icon={<Users2Icon className="w-10 sm:w-12 h-10 sm:h-12 text-blue-600" />}
              title="Interest Matching"
              description="Connect with professionals who share your interests and career goals"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              icon={<BuildingIcon className="w-8 h-8 text-primary" />}
              title="Enter Your Field"
              description="Tell us about your profession and areas of interest"
            />
            <StepCard
              number="2"
              icon={<MapPinIcon className="w-8 h-8 text-primary" />}
              title="Location Detection"
              description="We automatically detect your location to find relevant connections"
            />
            <StepCard
              number="3"
              icon={<MessagesSquareIcon className="w-8 h-8 text-primary" />}
              title="Join Conversations"
              description="Connect in AI-created rooms with professionals in your area"
            />
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="px-4 py-16 bg-muted/30">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Waitlist</h2>
          <p className="text-muted-foreground mb-8">
            Be among the first to experience the future of professional networking.
          </p>
          <WaitlistForm />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-6 h-full">
        <CardContent className="space-y-4 pt-6">
          <div className="flex justify-center">{icon}</div>
          <h3 className="text-xl font-semibold text-center">{title}</h3>
          <p className="text-muted-foreground text-center">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function StepCard({ number, icon, title, description }: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-6 h-full relative">
        <CardContent className="space-y-4 pt-6">
          <span className="absolute top-4 right-4 text-4xl font-bold text-primary/10">
            {number}
          </span>
          <div className="flex justify-center">{icon}</div>
          <h3 className="text-xl font-semibold text-center">{title}</h3>
          <p className="text-muted-foreground text-center">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}