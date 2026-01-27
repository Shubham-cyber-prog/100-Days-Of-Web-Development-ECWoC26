// Stories Database
const storiesData = [
    {
        id: 1,
        title: "Chronicles of the Void",
        author: "Alexandra Chen",
        genre: "Sci-Fi",
        description: "A journey through collapsing realities where every choice creates new universes. Explore infinite possibilities in a narrative that adapts to your decisions.",
        duration: "15+ hours",
        branches: 47,
        readers: 12847,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        icon: "fas fa-infinity",
        chapters: [
            {
                content: "You wake up in a sterile white room with no memory of how you got here. The walls shimmer with a faint energy, and three doors stand before you, each glowing with a different color.",
                choices: [
                    { title: "Blue Door", description: "The door pulses with a cold, analytical energy", nextChapter: 1 },
                    { title: "Red Door", description: "Warmth radiates from this portal, promising comfort", nextChapter: 2 },
                    { title: "Green Door", description: "This entrance hums with organic, living energy", nextChapter: 3 }
                ]
            },
            {
                content: "The blue door leads to a vast library floating in space. Ancient books orbit around you, and a holographic librarian appears.",
                choices: [
                    { title: "Ask about your origin", description: "Seek answers about who you are", nextChapter: 4 },
                    { title: "Explore the archives", description: "Investigate the library's secrets", nextChapter: 5 },
                    { title: "Leave immediately", description: "Return to the starting room", nextChapter: 0 }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Neural Dreams",
        author: "Marcus Thorne",
        genre: "Cyberpunk",
        description: "In a future where dreams can be hacked, you must navigate the dangerous world of neural interfaces and corporate espionage.",
        duration: "12+ hours",
        branches: 32,
        readers: 8921,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1468&q=80",
        icon: "fas fa-brain",
        chapters: [
            {
                content: "The neural interface glitches as you connect to the DreamNet. Corporate security protocols are closing in on your location.",
                choices: [
                    { title: "Override security", description: "Use your hacking skills to break through", nextChapter: 1 },
                    { title: "Go stealth", description: "Try to slip past unnoticed", nextChapter: 2 },
                    { title: "Disconnect", description: "Pull out before you're detected", nextChapter: 3 }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "Whispers in the Mist",
        author: "Eleanor Vance",
        genre: "Mystery",
        description: "A detective story set in a fog-shrouded coastal town where everyone has secrets and nothing is as it seems.",
        duration: "8+ hours",
        branches: 24,
        readers: 7453,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        icon: "fas fa-search",
        chapters: [
            {
                content: "The fog rolls in thicker than ever as you approach the abandoned lighthouse. A single light flickers at the top.",
                choices: [
                    { title: "Investigate the light", description: "See who or what is in the lighthouse", nextChapter: 1 },
                    { title: "Search the beach", description: "Look for clues in the sand", nextChapter: 2 },
                    { title: "Return to town", description: "Get backup before proceeding", nextChapter: 3 }
                ]
            }
        ]
    },
    {
        id: 4,
        title: "The Last Alchemist",
        author: "Benjamin Stone",
        genre: "Fantasy",
        description: "In a world where magic is dying, you are the last alchemist who can save it. But the cost of salvation may be too high.",
        duration: "10+ hours",
        branches: 28,
        readers: 10234,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        icon: "fas fa-flask",
        chapters: [
            {
                content: "Your laboratory is filled with the last remnants of magical ingredients. The Grand Council has given you three days to produce results.",
                choices: [
                    { title: "Work on the Elixir", description: "Focus on creating the life-saving potion", nextChapter: 1 },
                    { title: "Research alternatives", description: "Look for other solutions", nextChapter: 2 },
                    { title: "Seek ancient knowledge", description: "Consult forbidden texts", nextChapter: 3 }
                ]
            }
        ]
    },
    {
        id: 5,
        title: "Quantum Paradox",
        author: "Dr. Sarah Chen",
        genre: "Sci-Fi",
        description: "A time-travel adventure where you must fix paradoxes in the timeline while avoiding the Time Guardians.",
        duration: "14+ hours",
        branches: 41,
        readers: 15678,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
        icon: "fas fa-atom",
        chapters: [
            {
                content: "The time machine hums to life. You can see multiple timelines branching out before you. Which era will you visit first?",
                choices: [
                    { title: "Ancient Egypt", description: "Investigate the pyramid paradox", nextChapter: 1 },
                    { title: "Victorian London", description: "Fix the steam engine anomaly", nextChapter: 2 },
                    { title: "Future City", description: "Prevent the AI uprising", nextChapter: 3 }
                ]
            }
        ]
    },
    {
        id: 6,
        title: "Celestial Symphony",
        author: "Orion Blackwood",
        genre: "Fantasy",
        description: "You can hear the music of the stars. In a world where sound creates reality, you must compose the perfect symphony to prevent cosmic collapse.",
        duration: "9+ hours",
        branches: 26,
        readers: 6890,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
        icon: "fas fa-music",
        chapters: [
            {
                content: "The Star Harp responds to your touch. Each string resonates with a different constellation. Which harmony will you create?",
                choices: [
                    { title: "Morning Sonata", description: "A gentle melody to calm the skies", nextChapter: 1 },
                    { title: "Storm Symphony", description: "Powerful chords to reshape reality", nextChapter: 2 },
                    { title: "Silent Aria", description: "A quiet tune to observe without interfering", nextChapter: 3 }
                ]
            }
        ]
    },
    {
        id: 7,
        title: "Ghosts of the Internet",
        author: "Maya Rodriguez",
        genre: "Horror",
        description: "When a social media platform becomes haunted by digital ghosts, you must uncover the truth before you become one of them.",
        duration: "7+ hours",
        branches: 22,
        readers: 9234,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1468&q=80",
        icon: "fas fa-ghost",
        chapters: [
            {
                content: "The notification appears on your screen: 'You have 1 new follower from beyond.' The profile picture shows someone who died last year.",
                choices: [
                    { title: "Block the account", description: "Try to cut off the connection", nextChapter: 1 },
                    { title: "Investigate", description: "Look into the digital haunting", nextChapter: 2 },
                    { title: "Seek help", description: "Contact online ghost hunters", nextChapter: 3 }
                ]
            }
        ]
    },
    {
        id: 8,
        title: "The Garden of Code",
        author: "Lena Takahashi",
        genre: "Sci-Fi",
        description: "In a virtual reality where programmers are gods, you must debug a corrupted world while fighting against rogue AI.",
        duration: "11+ hours",
        branches: 35,
        readers: 11234,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
        icon: "fas fa-code",
        chapters: [
            {
                content: "The console blinks with error messages. The virtual world is glitching around you. What's your first debugging move?",
                choices: [
                    { title: "Check memory leaks", description: "Look for data that shouldn't exist", nextChapter: 1 },
                    { title: "Scan for viruses", description: "Search for malicious code", nextChapter: 2 },
                    { title: "Restart system", description: "Try a clean reboot", nextChapter: 3 }
                ]
            }
        ]
    },
    {
        id: 9,
        title: "Mythical Academy",
        author: "Finn O'Connor",
        genre: "Fantasy",
        description: "You're accepted into a secret school for mythical beings. Learn magic, make friends, and uncover ancient secrets.",
        duration: "13+ hours",
        branches: 38,
        readers: 15678,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        icon: "fas fa-hat-wizard",
        chapters: [
            {
                content: "The Sorting Ceremony begins. Which magical house calls to your soul?",
                choices: [
                    { title: "House of Flames", description: "For those with fiery passion", nextChapter: 1 },
                    { title: "House of Tides", description: "For those with deep emotions", nextChapter: 2 },
                    { title: "House of Stones", description: "For those with unshakable will", nextChapter: 3 }
                ]
            }
        ]
    },
    {
        id: 10,
        title: "Cyberpunk City",
        author: "Jax Miller",
        genre: "Cyberpunk",
        description: "In a neon-drenched metropolis, you're a street samurai trying to survive corporate wars and cyber-enhanced gangsters.",
        duration: "10+ hours",
        branches: 31,
        readers: 13456,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
        icon: "fas fa-city",
        chapters: [
            {
                content: "Rain pours down on neon signs as you receive a cryptic message: 'Meet at the rooftop bar. Bring your best chrome.'",
                choices: [
                    { title: "Go prepared", description: "Load up on weapons and upgrades", nextChapter: 1 },
                    { title: "Go stealth", description: "Minimal gear, maximum sneak", nextChapter: 2 },
                    { title: "Bring backup", description: "Call in your crew", nextChapter: 3 }
                ]
            }
        ]
    },
    {
        id: 11,
        title: "The Time Weaver's Daughter",
        author: "Clara Bennett",
        genre: "Fantasy",
        description: "As the daughter of a Time Weaver, you can see all possible futures. But when one future threatens everything, you must choose which timeline to save.",
        duration: "12+ hours",
        branches: 34,
        readers: 9876,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
        icon: "fas fa-hourglass-half",
        chapters: [
            {
                content: "The timelines swirl before your eyes. One shows peace, another war, a third something you can't quite comprehend.",
                choices: [
                    { title: "Follow the peaceful path", description: "Choose the easiest future", nextChapter: 1 },
                    { title: "Challenge the dark timeline", description: "Face the hardest future", nextChapter: 2 },
                    { title: "Create a new path", description: "Weave your own destiny", nextChapter: 3 }
                ]
            }
        ]
    },
    {
        id: 12,
        title: "Solar Sailor",
        author: "Captain Zara Nova",
        genre: "Sci-Fi",
        description: "As captain of a solar sailing ship, you explore alien star systems while avoiding space pirates and cosmic anomalies.",
        duration: "14+ hours",
        branches: 42,
        readers: 17890,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
        icon: "fas fa-rocket",
        chapters: [
            {
                content: "The star map displays three uncharted systems. Your solar sails are ready. Which cosmic mystery will you explore first?",
                choices: [
                    { title: "Crystal Nebula", description: "Reported to contain living crystals", nextChapter: 1 },
                    { title: "Black Hole Garden", description: "A cluster of small black holes", nextChapter: 2 },
                    { title: "Singularity Station", description: "An abandoned research outpost", nextChapter: 3 }
                ]
            }
        ]
    }
];

// Add more chapters to each story
storiesData.forEach(story => {
    for (let i = 1; i < 10; i++) {
        story.chapters.push({
            content: `Chapter ${i + 1}: The journey continues. You face new challenges and make more decisions that shape your path.`,
            choices: [
                { title: "Choice A", description: "Take the logical approach", nextChapter: i + 1 },
                { title: "Choice B", description: "Follow your instincts", nextChapter: i + 2 },
                { title: "Choice C", description: "Seek outside help", nextChapter: i + 3 }
            ]
        });
    }
});

// Additional data for the app
const genres = ['All', 'Sci-Fi', 'Fantasy', 'Mystery', 'Cyberpunk', 'Horror', 'Romance', 'Adventure'];
const achievements = [
    'Speed Reader', 'Choice Master', 'Completionist', 'Explorer', 'Story Weaver',
    'Genre Expert', 'Weekend Warrior', 'Night Owl', 'Early Bird', 'Social Reader'
];

// Export data for use in the app
window.storiesData = storiesData;
window.genres = genres;
window.achievements = achievements;