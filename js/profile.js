// 4Ever Profile Page JavaScript

class ProfilePage {
    constructor() {
        this.currentSection = 'overview';
        this.audioPlayer = null;
        this.currentAudio = null;
        this.timelineEvents = [];
        this.familyMembers = [];
        this.stories = [];
        this.photosData = {
            'birth-story': {
                title: 'Born in Chicago - Media',
                media: [
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop', caption: 'Chicago in the 1950s' },
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', caption: 'Family home' },
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop', caption: 'Parents with baby John' }
                ]
            },
            'wedding-story': {
                title: 'Wedding Day - Media',
                media: [
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop', caption: 'Wedding ceremony' },
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=300&fit=crop', caption: 'Reception celebration' },
                    { type: 'video', url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop', caption: 'Wedding video highlights' }
                ]
            },
            'teaching-story': {
                title: 'Teaching Career - Media',
                media: [
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop', caption: 'First day of teaching' },
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop', caption: 'Classroom with students' },
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', caption: 'Retirement celebration' }
                ]
            },
            'sarah-birth-story': {
                title: 'Sarah\'s Birth - Media',
                media: [
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop', caption: 'Baby Sarah' },
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=300&fit=crop', caption: 'First family photo' },
                    { type: 'video', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', caption: 'Sarah\'s first steps' }
                ]
            },
            'growing-up-chicago': {
                title: 'Growing Up in Chicago - Media',
                media: [
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop', caption: 'Childhood neighborhood' },
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', caption: 'School days' },
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop', caption: 'Family gatherings' }
                ]
            },
            'met-mary': {
                title: 'The Day I Met Mary - Media',
                media: [
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop', caption: 'The coffee shop where we met' },
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=300&fit=crop', caption: 'Our first date' },
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', caption: 'Early days together' }
                ]
            },
            'teaching-journey': {
                title: 'My Teaching Journey - Media',
                media: [
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop', caption: 'Teaching mathematics' },
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop', caption: 'Student graduation' },
                    { type: 'video', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', caption: 'Retirement ceremony' }
                ]
            },
            'first-word-story': {
                title: 'First Word - Media',
                media: [
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop', caption: 'Baby John saying his first word' },
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop', caption: 'Mother Helen with tears of joy' }
                ]
            },
            'first-steps-story': {
                title: 'First Steps - Media',
                media: [
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', caption: 'First wobbly steps' },
                    { type: 'video', url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop', caption: 'Video of first steps' }
                ]
            },
            'sarah-first-smile-story': {
                title: 'Sarah\'s First Smile - Media',
                media: [
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop', caption: 'Sarah\'s first real smile' },
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop', caption: 'Parents\' hearts melted' }
                ]
            },
            'sarah-first-word-story': {
                title: 'Sarah\'s First Word - Media',
                media: [
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop', caption: 'Sarah saying "Dada"' },
                    { type: 'video', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', caption: 'Video of first word' }
                ]
            },
            'sarah-first-steps-story': {
                title: 'Sarah\'s First Steps - Media',
                media: [
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop', caption: 'Sarah taking her first steps' },
                    { type: 'video', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', caption: 'Video of first steps' }
                ]
            },
            'michael-first-word-story': {
                title: 'Michael\'s First Word - Media',
                media: [
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', caption: 'Michael saying "Mama"' },
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop', caption: 'Mary over the moon with joy' }
                ]
            },
            'michael-first-steps-story': {
                title: 'Michael\'s First Steps - Media',
                media: [
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', caption: 'Michael taking his first steps' },
                    { type: 'video', url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop', caption: 'Video of first steps' }
                ]
            },
            'emily-first-word-story': {
                title: 'Emily\'s First Word - Media',
                media: [
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop', caption: 'Emily saying "Sarah"' },
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop', caption: 'Idolizing her big sister' }
                ]
            },
            'emily-first-steps-story': {
                title: 'Emily\'s First Steps - Media',
                media: [
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop', caption: 'Emily taking her first steps' },
                    { type: 'video', url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop', caption: 'Video of first steps' }
                ]
            },
            'yellowstone-story': {
                title: 'Family Trip to Yellowstone - Media',
                media: [
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', caption: 'Yellowstone geysers' },
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=300&fit=crop', caption: 'Family at Old Faithful' },
                    { type: 'video', url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop', caption: 'Kids amazed by wildlife' }
                ]
            },
            'europe-trip-story': {
                title: 'European Adventure - Media',
                media: [
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop', caption: 'Paris, France' },
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop', caption: 'Rome, Italy' },
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop', caption: 'London, England' },
                    { type: 'video', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', caption: 'Travel highlights video' }
                ]
            },
            'sarah-wedding-story': {
                title: 'Sarah\'s Wedding - Media',
                media: [
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop', caption: 'Walking Sarah down the aisle' },
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=300&fit=crop', caption: 'Wedding ceremony' },
                    { type: 'video', url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop', caption: 'Wedding highlights' }
                ]
            },
            'first-grandchild-story': {
                title: 'First Grandchild - Media',
                media: [
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop', caption: 'First grandchild born' },
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop', caption: 'Proud grandfather' },
                    { type: 'video', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', caption: 'First moments as grandfather' }
                ]
            },
            'japan-trip-story': {
                title: 'Retirement Trip to Japan - Media',
                media: [
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop', caption: 'Cherry blossoms in Tokyo' },
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop', caption: 'Ancient temples' },
                    { type: 'video', url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop', caption: 'Japan travel highlights' }
                ]
            },
            '50th-anniversary-story': {
                title: '50th Wedding Anniversary - Media',
                media: [
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop', caption: '50th anniversary celebration' },
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=300&fit=crop', caption: 'All children and grandchildren' },
                    { type: 'video', url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop', caption: 'Anniversary highlights' }
                ]
            },
            'michael-restaurant-story': {
                title: 'Michael Opens Restaurant - Media',
                media: [
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop', caption: 'Restaurant opening day' },
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', caption: 'Proud parents at opening' },
                    { type: 'video', url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop', caption: 'Restaurant tour' }
                ]
            },
            'emily-exhibition-story': {
                title: 'Emily\'s Art Exhibition - Media',
                media: [
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop', caption: 'Art exhibition in New York' },
                    { type: 'photo', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop', caption: 'Emily with her paintings' },
                    { type: 'video', url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop', caption: 'Exhibition highlights' }
                ]
            }
        };
        
        this.familyData = {
            'grandfather': {
                name: 'Robert Smith',
                relationship: 'Father',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
                born: '1920',
                died: '1995',
                location: 'Chicago, IL',
                occupation: 'Factory Worker',
                bio: 'Robert was a hardworking man who spent 30 years working at the local steel mill. He was known for his strong work ethic and dedication to his family. He loved fishing on weekends and telling stories to his grandchildren.',
                profileId: 'robert-smith'
            },
            'grandmother': {
                name: 'Helen Smith',
                relationship: 'Mother',
                image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=face',
                born: '1925',
                died: '2000',
                location: 'Chicago, IL',
                occupation: 'Homemaker',
                bio: 'Helen was the heart of the family, known for her warm smile and delicious cooking. She raised three children and was always there to support her family. She had a beautiful garden and loved to knit.',
                profileId: 'helen-smith'
            },
            'father': {
                name: 'John Smith',
                relationship: 'You',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face',
                born: '1950',
                died: null,
                location: 'Chicago, IL',
                occupation: 'Retired Teacher',
                bio: 'John dedicated 35 years to teaching high school mathematics. He touched the lives of thousands of students and was known for his patience and ability to make math fun. He loves spending time with his grandchildren and sharing stories from his teaching days.',
                profileId: 'john-smith'
            },
            'mother': {
                name: 'Mary Smith',
                relationship: 'Wife',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face',
                born: '1952',
                died: null,
                location: 'Chicago, IL',
                occupation: 'Retired Nurse',
                bio: 'Mary was a compassionate nurse who worked in the local hospital for 30 years. She met John at a coffee shop in 1974 and they knew instantly they were meant to be together. She loves gardening and spending time with her family.',
                profileId: 'mary-smith'
            },
            'daughter1': {
                name: 'Sarah Johnson',
                relationship: 'Daughter',
                image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face',
                born: '1982',
                died: null,
                location: 'Seattle, WA',
                occupation: 'Software Engineer',
                bio: 'Sarah is a talented software engineer who works for a major tech company. She inherited her father\'s love for problem-solving and her mother\'s caring nature. She has two children and loves hiking in the Pacific Northwest.',
                profileId: 'sarah-johnson'
            },
            'son1': {
                name: 'Michael Smith',
                relationship: 'Son',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face',
                born: '1985',
                died: null,
                location: 'Austin, TX',
                occupation: 'Chef',
                bio: 'Michael is a passionate chef who owns his own restaurant in Austin. He learned to cook from his grandmother Helen and has made it his life\'s work. He\'s known for his creative dishes and warm hospitality.',
                profileId: 'michael-smith'
            },
            'daughter2': {
                name: 'Emily Smith',
                relationship: 'Daughter',
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face',
                born: '1988',
                died: null,
                location: 'New York, NY',
                occupation: 'Artist',
                bio: 'Emily is a talented artist who creates beautiful paintings and sculptures. She studied art in college and has had several successful gallery shows. She\'s known for her vibrant use of color and her ability to capture emotion in her work.',
                profileId: 'emily-smith'
            }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadProfileData();
        this.initializeAudioPlayer();
        this.setupIntersectionObserver();
        this.updateQuestionButtonText();
    }

    setupEventListeners() {
        // Section Navigation
        document.querySelectorAll('.section-nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.currentTarget.getAttribute('data-section');
                this.switchSection(section);
            });
        });

        // Mobile menu
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
            });
        }

        // Timeline filters
        document.querySelectorAll('.btn-filter').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.filterTimelineEvents(filter);
                this.updateFilterButtons(e.target);
            });
        });

        // Story filters
        document.querySelectorAll('#stories .btn-filter').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.filterStories(filter);
                this.updateFilterButtons(e.target);
            });
        });

        // Audio controls
        document.querySelectorAll('.btn-play').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const audioSrc = e.target.getAttribute('data-audio');
                const eventTitle = e.target.closest('.timeline-event').querySelector('.event-title').textContent;
                this.playAudio(audioSrc, eventTitle);
            });
        });

        document.querySelectorAll('.btn-play-story').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const storyCard = e.target.closest('.story-card');
                const title = storyCard.querySelector('.story-title').textContent;
                const description = storyCard.querySelector('.story-excerpt').textContent;
                this.playStoryAudio(title, description);
            });
        });


        // Share functionality
        document.getElementById('shareBtn').addEventListener('click', () => {
            this.openShareModal();
        });

        // Ask question functionality
        document.getElementById('askQuestionBtn').addEventListener('click', () => {
            this.handleAskQuestion();
        });

        // Modal controls
        document.getElementById('closeAudioModal').addEventListener('click', () => {
            this.closeAudioModal();
        });

        document.getElementById('closeShareModal').addEventListener('click', () => {
            this.closeShareModal();
        });

        document.getElementById('closeQuestionModal').addEventListener('click', () => {
            this.closeQuestionModal();
        });

        document.getElementById('cancelQuestion').addEventListener('click', () => {
            this.closeQuestionModal();
        });

        // Login modal controls
        document.getElementById('closeLoginModal').addEventListener('click', () => {
            this.closeLoginModal();
        });

        document.getElementById('cancelLogin').addEventListener('click', () => {
            this.closeLoginModal();
        });

        // Login form submission
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Sign out functionality
        document.getElementById('signOutBtn').addEventListener('click', () => {
            this.handleSignOut();
        });
        
        // Add event listeners for family member modal
        document.getElementById('closeFamilyModal').addEventListener('click', () => {
            this.closeFamilyModal();
        });
        
        document.getElementById('viewFullProfileBtn').addEventListener('click', () => {
            this.viewFullProfile();
        });
        
        document.getElementById('askFamilyMemberBtn').addEventListener('click', () => {
            this.askFamilyMember();
        });
        
        // Add click listeners to family member cards
        this.addFamilyMemberClickListeners();
        
        // Add event listener for manage favorites button
        document.getElementById('manageFavoritesBtn').addEventListener('click', () => {
            this.showManageFavoritesModal();
        });
        
        // Add event listeners for photos & videos buttons
        document.querySelectorAll('.btn-photos, .btn-photos-story').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const storyId = button.getAttribute('data-story');
                this.showPhotosModal(storyId);
            });
        });
        
        // Add event listener for photos modal close
        document.getElementById('closePhotosModal').addEventListener('click', () => {
            this.closePhotosModal();
        });

        // Question form submission
        document.getElementById('questionForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitQuestion();
        });

        // Copy link functionality
        document.getElementById('copyLink').addEventListener('click', () => {
            this.copyProfileLink();
        });

        // Family tree controls
        document.getElementById('zoomIn').addEventListener('click', () => {
            this.zoomFamilyTree(1.2);
        });

        document.getElementById('zoomOut').addEventListener('click', () => {
            this.zoomFamilyTree(0.8);
        });

        document.getElementById('centerTree').addEventListener('click', () => {
            this.centerFamilyTree();
        });




        // Close modals when clicking outside
        document.querySelectorAll('.audio-player-modal, .share-modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });
    }

    switchSection(section) {
        // Update section navigation buttons
        document.querySelectorAll('.section-nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Update content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(section).classList.add('active');

        this.currentSection = section;

        // Section-specific initialization
        if (section === 'family-tree') {
            this.initializeFamilyTree();
        }
    }

    filterTimelineEvents(filter) {
        const events = document.querySelectorAll('.timeline-event');
        
        events.forEach(event => {
            const category = event.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                event.style.display = 'flex';
                event.classList.add('fade-in');
            } else {
                event.style.display = 'none';
                event.classList.remove('fade-in');
            }
        });
    }

    filterStories(filter) {
        const stories = document.querySelectorAll('.story-card');
        
        stories.forEach(story => {
            const category = story.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                story.style.display = 'block';
                story.classList.add('fade-in');
            } else {
                story.style.display = 'none';
                story.classList.remove('fade-in');
            }
        });
    }

    updateFilterButtons(activeBtn) {
        const container = activeBtn.closest('.timeline-controls, .story-controls');
        container.querySelectorAll('.btn-filter').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    playAudio(audioSrc, title) {
        this.currentAudio = audioSrc;
        document.getElementById('audioTitle').textContent = title;
        document.getElementById('audioDescription').textContent = `Listen to the story: ${title}`;
        
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.src = audioSrc;
        
        this.openAudioModal();
    }

    playStoryAudio(title, description) {
        // For demo purposes, we'll use placeholder audio
        const audioSrc = `audio/${title.toLowerCase().replace(/\s+/g, '-')}.mp3`;
        
        document.getElementById('audioTitle').textContent = title;
        document.getElementById('audioDescription').textContent = description;
        
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.src = audioSrc;
        
        this.openAudioModal();
    }

    openAudioModal() {
        document.getElementById('audioPlayerModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeAudioModal() {
        document.getElementById('audioPlayerModal').classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Stop audio
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }


    openShareModal() {
        document.getElementById('shareModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeShareModal() {
        document.getElementById('shareModal').classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    copyProfileLink() {
        const urlInput = document.getElementById('profileUrl');
        urlInput.select();
        urlInput.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            document.execCommand('copy');
            
            // Show success feedback
            const copyBtn = document.getElementById('copyLink');
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.style.background = '#10b981';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = '';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    zoomFamilyTree(factor) {
        const treeWrapper = document.getElementById('treeWrapper');
        const currentScale = parseFloat(treeWrapper.style.transform?.match(/scale\(([^)]+)\)/)?.[1] || 1);
        const newScale = Math.max(0.5, Math.min(2, currentScale * factor));
        
        treeWrapper.style.transform = `scale(${newScale})`;
        treeWrapper.style.transformOrigin = 'center center';
    }

    centerFamilyTree() {
        const treeWrapper = document.getElementById('treeWrapper');
        treeWrapper.scrollTo({
            left: treeWrapper.scrollWidth / 2 - treeWrapper.clientWidth / 2,
            top: treeWrapper.scrollHeight / 2 - treeWrapper.clientHeight / 2,
            behavior: 'smooth'
        });
    }



    initializeFamilyTree() {
        // Add connection lines between family members
        this.drawFamilyConnections();
    }


    drawFamilyConnections() {
        // This would draw lines connecting family members
        // For now, we'll use CSS to create visual connections
        const generations = document.querySelectorAll('.generation');
        
        generations.forEach((generation, index) => {
            if (index < generations.length - 1) {
                const nextGeneration = generations[index + 1];
                const currentPersons = generation.querySelectorAll('.person-card');
                const nextPersons = nextGeneration.querySelectorAll('.person-card');
                
                // Create visual connections (simplified)
                currentPersons.forEach((person, personIndex) => {
                    person.style.position = 'relative';
                    
                    // Add connection indicator
                    if (personIndex < nextPersons.length) {
                        const connection = document.createElement('div');
                        connection.className = 'family-connection';
                        connection.style.cssText = `
                            position: absolute;
                            bottom: -20px;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 2px;
                            height: 20px;
                            background: var(--primary-color);
                        `;
                        person.appendChild(connection);
                    }
                });
            }
        });
    }

    loadProfileData() {
        // Simulate loading profile data
        // In a real app, this would fetch from your API
        this.simulateDataLoading();
    }

    updateQuestionButtonText() {
        const profileName = document.getElementById('profileName').textContent;
        const firstName = profileName.split(' ')[0]; // Get first name
        
        // Update button text
        const askQuestionText = document.getElementById('askQuestionText');
        if (askQuestionText) {
            askQuestionText.textContent = `Ask ${firstName} a Question`;
        }
        
        // Update modal title
        const modalTitle = document.getElementById('questionModalTitle');
        if (modalTitle) {
            modalTitle.textContent = `Ask ${firstName} a Question`;
        }
    }

    // Authentication Methods
    async handleAskQuestion() {
        try {
            const { getCurrentUser } = await import('./supabase-client.js');
            const result = await getCurrentUser();
            
            if (result.success && result.user) {
                // User is authenticated, show question modal
                this.showQuestionModal();
                this.updateUserInfo(result.user);
            } else {
                // User is not authenticated, show login modal
                this.showLoginModal();
            }
        } catch (error) {
            console.error('Error checking authentication:', error);
            this.showLoginModal();
        }
    }

    showLoginModal() {
        const modal = document.getElementById('loginModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLoginModal() {
        const modal = document.getElementById('loginModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form
        document.getElementById('loginForm').reset();
    }

    async handleLogin() {
        const form = document.getElementById('loginForm');
        const formData = new FormData(form);
        const email = formData.get('loginEmail');

        try {
            // Show loading state
            const submitBtn = document.querySelector('#loginForm .btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Import and use Supabase client
            const { signInWithEmail } = await import('./supabase-client.js');
            
            // Send magic link
            const result = await signInWithEmail(email);
            
            if (result.success) {
                this.showLoginSuccess();
                this.closeLoginModal();
            } else {
                throw new Error(result.error);
            }

        } catch (error) {
            console.error('Error sending magic link:', error);
            alert('Sorry, there was an error sending the magic link. Please try again.');
        } finally {
            // Reset button state
            const submitBtn = document.querySelector('#loginForm .btn-submit');
            submitBtn.textContent = 'Send Magic Link';
            submitBtn.disabled = false;
        }
    }

    showLoginSuccess() {
        // Create a temporary success message
        const successMessage = document.createElement('div');
        successMessage.className = 'login-success';
        successMessage.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #10b981;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 3000;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            ">
                <i class="fas fa-envelope"></i>
                <span>Magic link sent! Check your email.</span>
            </div>
        `;
        
        document.body.appendChild(successMessage);
        
        // Remove after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }

    updateUserInfo(user) {
        const userDisplayName = document.getElementById('userDisplayName');
        const userDisplayEmail = document.getElementById('userDisplayEmail');
        
        if (userDisplayName) {
            userDisplayName.textContent = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
        }
        
        if (userDisplayEmail) {
            userDisplayEmail.textContent = user.email || '';
        }
    }

    async handleSignOut() {
        try {
            const { signOut } = await import('./supabase-client.js');
            const result = await signOut();
            
            if (result.success) {
                this.closeQuestionModal();
                this.showSignOutSuccess();
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Error signing out:', error);
            alert('Error signing out. Please try again.');
        }
    }

    showSignOutSuccess() {
        // Create a temporary success message
        const successMessage = document.createElement('div');
        successMessage.className = 'signout-success';
        successMessage.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #6b7280;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 3000;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            ">
                <i class="fas fa-sign-out-alt"></i>
                <span>Signed out successfully!</span>
            </div>
        `;
        
        document.body.appendChild(successMessage);
        
        // Remove after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    }

    // Family Member Modal Methods
    addFamilyMemberClickListeners() {
        const familyCards = document.querySelectorAll('.person-card');
        familyCards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const personId = card.getAttribute('data-person');
                const memberData = this.familyData[personId];
                
                if (memberData && memberData.profileId) {
                    // Navigate to their profile
                    if (memberData.profileId === 'john-smith') {
                        // If it's John's profile, go to profile.html
                        window.location.href = 'profile.html';
                    } else {
                        // For all other family members, go to profile-view.html
                        window.location.href = `profile-view.html?id=${memberData.profileId}`;
                    }
                } else {
                    // Fallback to modal if no profile exists
                    this.showFamilyMemberModal(personId);
                }
            });
        });
    }

    showFamilyMemberModal(personId) {
        const memberData = this.familyData[personId];
        if (!memberData) return;

        // Update modal content
        document.getElementById('familyMemberName').textContent = memberData.name;
        document.getElementById('familyMemberImage').src = memberData.image;
        document.getElementById('familyMemberImage').alt = memberData.name;
        document.getElementById('familyMemberRelationship').textContent = memberData.relationship;
        
        // Format birth/death dates
        let bornText = memberData.born;
        if (memberData.died) {
            bornText += ` - ${memberData.died}`;
        } else {
            bornText += ' - Present';
        }
        document.getElementById('familyMemberBorn').textContent = bornText;
        
        document.getElementById('familyMemberLocation').textContent = memberData.location;
        document.getElementById('familyMemberOccupation').textContent = memberData.occupation;
        document.getElementById('familyMemberBio').textContent = memberData.bio;

        // Store current family member for actions
        this.currentFamilyMember = memberData;

        // Show modal
        const modal = document.getElementById('familyModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeFamilyModal() {
        const modal = document.getElementById('familyModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        this.currentFamilyMember = null;
    }

    viewFullProfile() {
        if (!this.currentFamilyMember) return;
        
        // For now, show an alert. In a real app, this would navigate to their profile page
        alert(`This would navigate to ${this.currentFamilyMember.name}'s full profile page. In a real application, this would be a separate profile page with their complete timeline, stories, and family tree.`);
    }

    askFamilyMember() {
        if (!this.currentFamilyMember) return;
        
        // Close family modal and open question modal
        this.closeFamilyModal();
        
        // Update question modal to be about the family member
        const questionModalTitle = document.getElementById('questionModalTitle');
        const askQuestionText = document.getElementById('askQuestionText');
        
        questionModalTitle.textContent = `Ask ${this.currentFamilyMember.name} a Question`;
        askQuestionText.textContent = `Ask ${this.currentFamilyMember.name} a Question`;
        
        // Show question modal
        this.showQuestionModal();
    }

    // Manage Favorites Modal
    showManageFavoritesModal() {
        // For now, show an alert. In a real app, this would open a modal to manage favorite stories
        alert('This would open a modal where you can:\n\n• View all your stories\n• Add stories to favorites\n• Remove stories from favorites\n• Reorder favorite stories\n\nIn a real application, this would be a comprehensive story management interface.');
    }

    // Media Modal Methods
    showPhotosModal(storyId) {
        const storyData = this.photosData[storyId];
        if (!storyData || !storyData.media || storyData.media.length === 0) {
            alert('No media available for this story.');
            return;
        }

        // Update modal title
        document.getElementById('photosModalTitle').textContent = storyData.title;

        // Clear and populate gallery
        const gallery = document.getElementById('photosGallery');
        gallery.innerHTML = '';

        storyData.media.forEach(mediaItem => {
            const mediaElement = document.createElement('div');
            mediaElement.className = mediaItem.type === 'video' ? 'video-item' : 'photo-item';
            
            if (mediaItem.type === 'video') {
                mediaElement.innerHTML = `
                    <video>
                        <source src="${mediaItem.url}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <div class="media-caption">${mediaItem.caption}</div>
                `;
            } else {
                mediaElement.innerHTML = `
                    <img src="${mediaItem.url}" alt="${mediaItem.caption}">
                    <div class="media-caption">${mediaItem.caption}</div>
                `;
            }
            
            gallery.appendChild(mediaElement);
        });

        // Show modal
        const modal = document.getElementById('photosModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closePhotosModal() {
        const modal = document.getElementById('photosModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    simulateDataLoading() {
        // Add loading states
        document.querySelectorAll('.timeline-event, .story-card, .person-card').forEach(element => {
            element.classList.add('loading');
        });

        // Simulate API delay
        setTimeout(() => {
            document.querySelectorAll('.loading').forEach(element => {
                element.classList.remove('loading');
            });
            
            // Animate elements in
            this.animateElements();
        }, 1000);
    }

    animateElements() {
        const elements = document.querySelectorAll('.timeline-event, .story-card, .person-card');
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('fade-in');
            }, index * 100);
        });
    }

    initializeAudioPlayer() {
        this.audioPlayer = document.getElementById('audioPlayer');
        
        // Audio player event listeners
        this.audioPlayer.addEventListener('loadstart', () => {
            console.log('Audio loading started');
        });
        
        this.audioPlayer.addEventListener('canplay', () => {
            console.log('Audio can start playing');
        });
        
        this.audioPlayer.addEventListener('ended', () => {
            console.log('Audio playback ended');
        });
        
        this.audioPlayer.addEventListener('error', (e) => {
            console.error('Audio error:', e);
            // Show error message to user
            this.showAudioError();
        });
    }

    showAudioError() {
        const modal = document.getElementById('audioPlayerModal');
        const description = document.getElementById('audioDescription');
        description.innerHTML = `
            <p style="color: var(--error-color);">
                <i class="fas fa-exclamation-triangle"></i>
                Sorry, this audio story is not available at the moment.
            </p>
        `;
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('.timeline-event, .story-card, .person-card').forEach(el => {
            observer.observe(el);
        });
    }
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize the profile page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProfilePage();
    
    // Add some console styling
    console.log(
        '%c4Ever Profile Page',
        'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'
    );
    console.log(
        '%cTimeline and Family Tree loaded successfully! 🎉',
        'font-size: 16px; color: #6366f1;'
    );
});

// Handle page visibility changes (pause audio when tab is not active)
document.addEventListener('visibilitychange', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    if (document.hidden && !audioPlayer.paused) {
        audioPlayer.pause();
    }
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', debounce(() => {
    // Recalculate family tree layout if needed
    const familyTree = document.getElementById('familyTree');
    if (familyTree && window.innerWidth < 768) {
        // Adjust mobile layout
        familyTree.style.flexDirection = 'column';
    } else if (familyTree) {
        familyTree.style.flexDirection = 'row';
    }
}, 250));

// Question Modal Methods
ProfilePage.prototype.showQuestionModal = function() {
    const modal = document.getElementById('questionModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

ProfilePage.prototype.closeQuestionModal = function() {
    const modal = document.getElementById('questionModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset form
    document.getElementById('questionForm').reset();
};

ProfilePage.prototype.submitQuestion = async function() {
    const form = document.getElementById('questionForm');
    const formData = new FormData(form);
    
    try {
        // Get current user information
        const { getCurrentUser } = await import('./supabase-client.js');
        const userResult = await getCurrentUser();
        
        if (!userResult.success || !userResult.user) {
            throw new Error('User not authenticated');
        }
        
        const user = userResult.user;
        
        const questionData = {
            profile_id: 'john-smith', // This would be dynamic in a real app
            questioner_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous',
            questioner_email: user.email,
            question_category: formData.get('questionCategory'),
            question_text: formData.get('questionText')
        };

        // Show loading state
        const submitBtn = document.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        // Import and use Supabase client
        const { submitQuestion } = await import('./supabase-client.js');
        
        // Submit to Supabase
        const result = await submitQuestion(questionData);
        
        if (result.success) {
            console.log('Question submitted successfully:', result.data);
            this.showQuestionSuccess();
            
            // Reset form and close modal
            form.reset();
            this.closeQuestionModal();
        } else {
            throw new Error(result.error);
        }

    } catch (error) {
        console.error('Error submitting question:', error);
        alert('Sorry, there was an error submitting your question. Please try again.');
    } finally {
        // Reset button state
        const submitBtn = document.querySelector('.btn-submit');
        submitBtn.textContent = 'Submit Question';
        submitBtn.disabled = false;
    }
};

ProfilePage.prototype.showQuestionSuccess = function() {
    // Create a temporary success message
    const successMessage = document.createElement('div');
    successMessage.className = 'question-success';
    successMessage.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 3000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        ">
            <i class="fas fa-check-circle"></i>
            <span>Question submitted successfully!</span>
        </div>
    `;
    
    document.body.appendChild(successMessage);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
};
