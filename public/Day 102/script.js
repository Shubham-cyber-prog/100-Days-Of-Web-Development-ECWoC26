// StoryVerse Main Application
class StoryVerse {
    constructor() {
        this.currentUser = {
            id: 1,
            name: "Alex Morgan",
            handle: "@storyweaver",
            level: 8,
            progress: 75,
            reading: 3,
            completed: 12,
            bookmarked: 8,
            hoursRead: 147,
            achievements: 42,
            streak: 86,
            avgRating: 4.8
        };
        
        this.currentStory = null;
        this.currentChapter = 0;
        this.isPlaying = false;
        this.notifications = [];
        this.library = {
            reading: [],
            completed: [],
            bookmarked: []
        };
        
        this.init();
    }
    
    init() {
        this.initParticles();
        this.loadStories();
        this.loadUserData();
        this.setupEventListeners();
        this.updateUI();
        this.generateNotifications();
        this.setupPlayer();
        
        // Start background animations
        this.startAnimations();
    }
    
    initParticles() {
        particlesJS('bg-particles', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: ["#6C63FF", "#FF6584", "#36D1DC"] },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: true },
                size: { value: 2, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6C63FF",
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }
    
    loadStories() {
        // Load featured stories
        this.renderFeaturedStories();
        
        // Load all stories
        this.renderAllStories();
        
        // Load library stories
        this.renderLibraryStories();
        
        // Load genre filters
        this.renderGenreFilters();
    }
    
    renderFeaturedStories() {
        const container = document.getElementById('featured-stories');
        if (!container) return;
        
        const featured = storiesData.slice(0, 4);
        container.innerHTML = featured.map(story => this.createStoryCard(story)).join('');
        
        // Add click events to featured stories
        container.querySelectorAll('.story-card').forEach((card, index) => {
            card.addEventListener('click', () => this.openStory(featured[index]));
        });
    }
    
    renderAllStories() {
        const container = document.getElementById('all-stories');
        if (!container) return;
        
        container.innerHTML = storiesData.map(story => this.createStoryCard(story)).join('');
        
        // Add click events to all stories
        container.querySelectorAll('.story-card').forEach((card, index) => {
            card.addEventListener('click', () => this.openStory(storiesData[index]));
        });
    }
    
    renderLibraryStories() {
        // Simulate library data
        const readingIds = [1, 3, 5];
        const completedIds = [2, 4, 6, 7, 8, 9, 10, 11, 12, 13];
        const bookmarkedIds = [1, 2, 4, 6, 8, 10, 12, 14];
        
        this.library.reading = storiesData.filter(s => readingIds.includes(s.id));
        this.library.completed = storiesData.filter(s => completedIds.includes(s.id));
        this.library.bookmarked = storiesData.filter(s => bookmarkedIds.includes(s.id));
        
        this.updateLibraryUI();
    }
    
    updateLibraryUI() {
        // Update counts
        document.getElementById('reading-count').textContent = this.library.reading.length;
        document.getElementById('completed-count').textContent = this.library.completed.length;
        document.getElementById('bookmarked-count').textContent = this.library.bookmarked.length;
        
        // Render library stories
        this.renderLibrarySection('reading-stories', this.library.reading);
        this.renderLibrarySection('completed-stories', this.library.completed);
        this.renderLibrarySection('bookmarked-stories', this.library.bookmarked);
    }
    
    renderLibrarySection(containerId, stories) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = stories.map(story => this.createLibraryCard(story)).join('');
        
        // Add click events
        container.querySelectorAll('.library-story-card').forEach((card, index) => {
            card.addEventListener('click', () => this.openStory(stories[index]));
        });
    }
    
    createStoryCard(story) {
        return `
            <div class="story-card" data-id="${story.id}">
                <div class="story-image" style="background-image: url('${story.image}')">
                    <div class="story-badge">${story.genre}</div>
                </div>
                <div class="story-content">
                    <h3 class="story-title">${story.title}</h3>
                    <div class="story-author">by ${story.author}</div>
                    <p class="story-desc">${story.description}</p>
                    <div class="story-meta">
                        <div class="story-stats">
                            <div class="stat">
                                <i class="fas fa-clock"></i>
                                <span>${story.duration}</span>
                            </div>
                            <div class="stat">
                                <i class="fas fa-branch"></i>
                                <span>${story.branches}</span>
                            </div>
                            <div class="stat">
                                <i class="fas fa-users"></i>
                                <span>${story.readers.toLocaleString()}</span>
                            </div>
                        </div>
                        <div class="story-rating">
                            <i class="fas fa-star"></i>
                            <span>${story.rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    createLibraryCard(story) {
        const progress = Math.floor(Math.random() * 100);
        return `
            <div class="library-story-card" data-id="${story.id}">
                <div class="progress-indicator">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <h4 class="story-title">${story.title}</h4>
                <div class="story-author">by ${story.author}</div>
                <div class="story-stats">
                    <div class="stat">
                        <i class="fas fa-chart-line"></i>
                        <span>${progress}% complete</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderGenreFilters() {
        const container = document.getElementById('genre-filters');
        if (!container) return;
        
        const genres = [...new Set(storiesData.map(story => story.genre))];
        container.innerHTML = `
            <button class="filter-tag active" data-genre="all">All Genres</button>
            ${genres.map(genre => `
                <button class="filter-tag" data-genre="${genre.toLowerCase()}">${genre}</button>
            `).join('')}
        `;
        
        // Add filter events
        container.querySelectorAll('.filter-tag').forEach(btn => {
            btn.addEventListener('click', () => this.filterStories(btn.dataset.genre));
        });
    }
    
    filterStories(genre) {
        const stories = document.querySelectorAll('.story-card');
        const filterButtons = document.querySelectorAll('.filter-tag');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // Filter stories
        stories.forEach(card => {
            if (genre === 'all' || card.querySelector('.story-badge').textContent.toLowerCase() === genre) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    loadUserData() {
        // Update profile
        document.querySelector('.profile-info h2').textContent = this.currentUser.name;
        document.querySelector('.profile-handle').textContent = this.currentUser.handle;
        document.querySelector('.level-fill').style.width = `${this.currentUser.progress}%`;
        document.querySelector('.level-text').textContent = `Level ${this.currentUser.level} Story Explorer`;
        
        // Update stats
        document.getElementById('reading-count').textContent = this.currentUser.reading;
        document.getElementById('completed-count').textContent = this.currentUser.completed;
        document.getElementById('bookmarked-count').textContent = this.currentUser.bookmarked;
        
        // Update large stats
        const stats = document.querySelectorAll('.stat-value-large');
        if (stats[0]) stats[0].textContent = this.currentUser.hoursRead;
        if (stats[1]) stats[1].textContent = this.currentUser.achievements;
        if (stats[2]) stats[2].textContent = this.currentUser.streak;
        if (stats[3]) stats[3].textContent = this.currentUser.avgRating;
        
        // Load journey timeline
        this.loadJourneyTimeline();
        
        // Load genre chart
        this.loadGenreChart();
    }
    
    loadJourneyTimeline() {
        const timeline = document.getElementById('journey-timeline');
        if (!timeline) return;
        
        const activities = [
            { title: 'Started "Chronicles of the Void"', desc: 'Began your journey through collapsing realities', date: '2 hours ago' },
            { title: 'Reached Level 8', desc: 'Unlocked new reading features', date: '1 day ago' },
            { title: 'Completed "Neural Dreams"', desc: 'Explored all 12 endings', date: '3 days ago' },
            { title: 'Created Story Collection', desc: 'Added 5 stories to "Cyberpunk Adventures"', date: '1 week ago' }
        ];
        
        timeline.innerHTML = activities.map(activity => `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-title">${activity.title}</div>
                    <div class="timeline-desc">${activity.desc}</div>
                    <div class="timeline-date">${activity.date}</div>
                </div>
            </div>
        `).join('');
    }
    
    loadGenreChart() {
        const chart = document.getElementById('genre-chart');
        if (!chart) return;
        
        const genres = {
            'Sci-Fi': 12,
            'Fantasy': 8,
            'Mystery': 6,
            'Romance': 5,
            'Horror': 4,
            'Adventure': 7
        };
        
        chart.innerHTML = Object.entries(genres)
            .map(([genre, count]) => `
                <div class="genre-tag">
                    ${genre}
                    <span class="genre-count">${count}</span>
                </div>
            `)
            .join('');
    }
    
    generateNotifications() {
        this.notifications = [
            { id: 1, title: 'New Chapter Available', desc: '"Chronicles of the Void" has been updated', time: '10 min ago', read: false },
            { id: 2, title: 'Achievement Unlocked', desc: 'You reached Level 8 Story Explorer', time: '2 hours ago', read: false },
            { id: 3, title: 'Friend Activity', desc: 'Sarah started reading "Neural Dreams"', time: '1 day ago', read: true },
            { id: 4, title: 'Weekly Reading Report', desc: 'You read for 12 hours this week', time: '2 days ago', read: true },
            { id: 5, title: 'New Story Added', desc: '"Quantum Paradox" is now available', time: '3 days ago', read: true }
        ];
        
        this.renderNotifications();
    }
    
    renderNotifications() {
        const list = document.getElementById('notification-list');
        if (!list) return;
        
        list.innerHTML = this.notifications.map(notif => `
            <div class="notification-item ${notif.read ? '' : 'unread'}" data-id="${notif.id}">
                <div class="notification-title">${notif.title}</div>
                <div class="notification-desc">${notif.desc}</div>
                <div class="notification-time">${notif.time}</div>
            </div>
        `).join('');
        
        // Update badge
        const unreadCount = this.notifications.filter(n => !n.read).length;
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            badge.textContent = unreadCount;
            badge.style.display = unreadCount > 0 ? 'flex' : 'none';
        }
    }
    
    openStory(story) {
        this.currentStory = story;
        this.currentChapter = 0;
        
        const reader = document.getElementById('story-reader');
        const container = document.querySelector('.reader-container');
        
        // Load first chapter
        this.loadChapter();
        
        // Show reader
        reader.style.display = 'flex';
        
        // Animate in
        setTimeout(() => {
            container.style.transform = 'scale(1)';
            container.style.opacity = '1';
        }, 10);
        
        // Update player
        this.updatePlayer();
    }
    
    loadChapter() {
        if (!this.currentStory) return;
        
        const container = document.querySelector('.reader-content');
        const chapter = this.currentStory.chapters[this.currentChapter];
        
        if (!chapter) return;
        
        container.innerHTML = `
            <div class="reader-text">
                ${chapter.content}
            </div>
            <div class="reader-choices">
                ${chapter.choices.map((choice, index) => `
                    <div class="reader-choice" data-choice="${index}">
                        <div class="reader-choice-title">${choice.title}</div>
                        <div class="reader-choice-desc">${choice.description}</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Update header
        document.querySelector('.reader-title').textContent = 
            `${this.currentStory.title} - Chapter ${this.currentChapter + 1}`;
        
        // Update progress
        const progress = ((this.currentChapter + 1) / this.currentStory.chapters.length * 100).toFixed(0);
        document.querySelector('.reader-progress').textContent = 
            `Progress: ${progress}% • Chapter ${this.currentChapter + 1}/${this.currentStory.chapters.length}`;
        
        // Add choice events
        container.querySelectorAll('.reader-choice').forEach((choice, index) => {
            choice.addEventListener('click', () => this.makeChoice(index));
        });
    }
    
    makeChoice(choiceIndex) {
        if (!this.currentStory) return;
        
        const chapter = this.currentStory.chapters[this.currentChapter];
        const choice = chapter.choices[choiceIndex];
        
        // Visual feedback
        const choiceElement = document.querySelector(`.reader-choice[data-choice="${choiceIndex}"]`);
        choiceElement.style.borderColor = '#6C63FF';
        choiceElement.style.transform = 'scale(0.98)';
        
        // Update player if choice has audio
        if (choice.audio) {
            this.playAudio(choice.audio);
        }
        
        // Move to next chapter
        setTimeout(() => {
            if (choice.nextChapter !== undefined) {
                this.currentChapter = choice.nextChapter;
            } else {
                this.currentChapter++;
            }
            
            if (this.currentChapter < this.currentStory.chapters.length) {
                this.loadChapter();
            } else {
                this.completeStory();
            }
        }, 500);
    }
    
    completeStory() {
        const container = document.querySelector('.reader-content');
        container.innerHTML = `
            <div class="reader-text">
                <h2>Story Complete!</h2>
                <p>You've reached the end of "${this.currentStory.title}".</p>
                <p>Your choices have shaped this narrative in a unique way.</p>
                
                <div class="completion-stats">
                    <div class="stat">
                        <i class="fas fa-branch"></i>
                        <span>Paths taken: ${this.currentStory.chapters.length}</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-clock"></i>
                        <span>Time spent: ${this.currentStory.duration}</span>
                    </div>
                </div>
                
                <button class="btn-reader-action" id="restart-story">
                    <i class="fas fa-redo"></i>
                    <span>Play Again</span>
                </button>
            </div>
        `;
        
        document.getElementById('restart-story').addEventListener('click', () => {
            this.currentChapter = 0;
            this.loadChapter();
        });
    }
    
    setupPlayer() {
        const player = document.getElementById('player-controls');
        const playBtn = document.getElementById('play-pause');
        const prevBtn = document.getElementById('prev-chapter');
        const nextBtn = document.getElementById('next-chapter');
        
        // Show player when story is opened
        this.showPlayer = () => {
            player.classList.add('active');
        };
        
        this.hidePlayer = () => {
            player.classList.remove('active');
        };
        
        // Player controls
        playBtn.addEventListener('click', () => {
            this.isPlaying = !this.isPlaying;
            playBtn.innerHTML = `<i class="fas fa-${this.isPlaying ? 'pause' : 'play'}"></i>`;
            
            if (this.isPlaying) {
                this.startAudioPlayback();
            } else {
                this.pauseAudioPlayback();
            }
        });
        
        prevBtn.addEventListener('click', () => {
            if (this.currentChapter > 0) {
                this.currentChapter--;
                this.loadChapter();
                this.updatePlayer();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (this.currentStory && this.currentChapter < this.currentStory.chapters.length - 1) {
                this.currentChapter++;
                this.loadChapter();
                this.updatePlayer();
            }
        });
    }
    
    updatePlayer() {
        if (!this.currentStory) return;
        
        const playerTitle = document.querySelector('.player-title');
        const playerChapter = document.querySelector('.player-chapter');
        const playerCover = document.querySelector('.player-cover i');
        
        if (playerTitle) playerTitle.textContent = this.currentStory.title;
        if (playerChapter) playerChapter.textContent = `Chapter ${this.currentChapter + 1}`;
        if (playerCover) playerCover.className = this.currentStory.icon || 'fas fa-book';
        
        this.showPlayer();
    }
    
    playAudio(url) {
        // In a real app, this would play audio files
        console.log('Playing audio:', url);
    }
    
    startAudioPlayback() {
        // Simulate audio playback
        console.log('Starting audio playback');
    }
    
    pauseAudioPlayback() {
        // Simulate audio pause
        console.log('Pausing audio playback');
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget.dataset.target;
                this.switchSection(target);
                
                // Update active button
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        
        // Play featured story
        document.getElementById('play-featured')?.addEventListener('click', () => {
            const featuredStory = storiesData[0];
            this.openStory(featuredStory);
        });
        
        // Theme toggle
        document.querySelector('.toggle-switch')?.addEventListener('click', () => {
            const handle = document.querySelector('.toggle-handle');
            const isDark = handle.style.left === '2px';
            
            if (isDark) {
                handle.style.left = '22px';
                document.body.classList.add('light-theme');
            } else {
                handle.style.left = '2px';
                document.body.classList.remove('light-theme');
            }
        });
        
        // Volume slider
        const volumeSlider = document.querySelector('.volume-slider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                console.log('Volume:', value);
            });
        }
        
        // Notification button
        document.querySelector('.btn-notification')?.addEventListener('click', () => {
            const panel = document.getElementById('notification-panel');
            panel.classList.toggle('active');
        });
        
        // Clear notifications
        document.querySelector('.btn-clear-all')?.addEventListener('click', () => {
            this.notifications.forEach(n => n.read = true);
            this.renderNotifications();
        });
        
        // Close reader
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('story-reader-overlay') || 
                e.target.classList.contains('btn-close-reader')) {
                this.closeReader();
            }
        });
        
        // Search
        const searchInput = document.getElementById('story-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchStories(e.target.value);
            });
        }
        
        // Sort
        const sortSelect = document.getElementById('sort-stories');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortStories(e.target.value);
            });
        }
        
        // Library tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                this.switchLibraryTab(tab);
            });
        });
        
        // Edit profile
        document.querySelector('.btn-edit-profile')?.addEventListener('click', () => {
            this.editProfile();
        });
    }
    
    switchSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(`${sectionId}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }
    
    switchLibraryTab(tabId) {
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Hide all tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Show target tab content
        const targetContent = document.getElementById(`${tabId}-tab`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }
    
    searchStories(query) {
        const stories = document.querySelectorAll('#all-stories .story-card');
        
        stories.forEach(card => {
            const title = card.querySelector('.story-title').textContent.toLowerCase();
            const author = card.querySelector('.story-author').textContent.toLowerCase();
            const desc = card.querySelector('.story-desc').textContent.toLowerCase();
            
            if (title.includes(query.toLowerCase()) || 
                author.includes(query.toLowerCase()) || 
                desc.includes(query.toLowerCase())) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    sortStories(criteria) {
        let sortedStories = [...storiesData];
        
        switch(criteria) {
            case 'popular':
                sortedStories.sort((a, b) => b.readers - a.readers);
                break;
            case 'recent':
                sortedStories.sort((a, b) => b.id - a.id);
                break;
            case 'rating':
                sortedStories.sort((a, b) => b.rating - a.rating);
                break;
            case 'length':
                sortedStories.sort((a, b) => {
                    const aTime = parseInt(a.duration);
                    const bTime = parseInt(b.duration);
                    return bTime - aTime;
                });
                break;
        }
        
        const container = document.getElementById('all-stories');
        container.innerHTML = sortedStories.map(story => this.createStoryCard(story)).join('');
    }
    
    editProfile() {
        alert('Profile editing feature coming soon!');
    }
    
    closeReader() {
        const reader = document.getElementById('story-reader');
        const container = document.querySelector('.reader-container');
        
        container.style.transform = 'scale(0.9)';
        container.style.opacity = '0';
        
        setTimeout(() => {
            reader.style.display = 'none';
        }, 300);
    }
    
    updateUI() {
        // Update activity feed
        this.updateActivityFeed();
    }
    
    updateActivityFeed() {
        const feed = document.getElementById('activity-feed');
        if (!feed) return;
        
        const activities = [
            { icon: 'fas fa-book', text: 'Started reading "Quantum Paradox"', time: '2 hours ago' },
            { icon: 'fas fa-trophy', text: 'Unlocked "Speed Reader" achievement', time: '1 day ago' },
            { icon: 'fas fa-users', text: 'Followed author Sarah Chen', time: '2 days ago' },
            { icon: 'fas fa-star', text: 'Rated "Neural Dreams" 5 stars', time: '3 days ago' },
            { icon: 'fas fa-share-alt', text: 'Shared "Cyberpunk City" with friends', time: '1 week ago' }
        ];
        
        feed.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-text">${activity.text}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            </div>
        `).join('');
    }
    
    startAnimations() {
        // Animate floating orbs
        this.animateOrbs();
        
        // Animate hero elements
        this.animateHero();
    }
    
    animateOrbs() {
        const orbs = document.querySelectorAll('.orb');
        orbs.forEach((orb, index) => {
            orb.style.animationDelay = `${index * 5}s`;
        });
    }
    
    animateHero() {
        const visualElements = document.querySelectorAll('.visual-element');
        visualElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 2}s`;
        });
    }
}

// Initialize the application
let storyVerse;
document.addEventListener('DOMContentLoaded', () => {
    storyVerse = new StoryVerse();
    
    // Add light theme styles
    const style = document.createElement('style');
    style.textContent = `
        .light-theme {
            --bg-dark: #F5F7FF;
            --bg-darker: #E8EBFF;
            --bg-card: #FFFFFF;
            --bg-card-light: #F8F9FF;
            --text-primary: #1A1A2E;
            --text-secondary: #4A4A6A;
            --text-muted: #6B6B8A;
            --border-color: #E1E4FF;
            --shadow-sm: 0 2px 8px rgba(108, 99, 255, 0.1);
            --shadow-md: 0 8px 32px rgba(108, 99, 255, 0.15);
            --shadow-lg: 0 16px 64px rgba(108, 99, 255, 0.2);
        }
        
        .light-theme .bg-grid {
            background-image: 
                linear-gradient(rgba(108, 99, 255, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(108, 99, 255, 0.05) 1px, transparent 1px);
        }
        
        .light-theme .bg-glow {
            background: radial-gradient(circle at 20% 30%, rgba(108, 99, 255, 0.05) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(255, 101, 132, 0.05) 0%, transparent 50%);
        }
        
        .light-theme .orb {
            opacity: 0.05;
        }
    `;
    document.head.appendChild(style);
});