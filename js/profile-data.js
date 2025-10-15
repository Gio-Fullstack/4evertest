// Profile Data for All Family Members
const profilesData = {
    'john-smith': {
        id: 'john-smith',
        name: 'John Smith',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john-smith&backgroundColor=c0aede',
        bio: 'Born in 1950, father of three, husband to Mary, son of Robert and Helen. Lived a life full of adventure, love, and countless stories worth preserving.',
        birthYear: 1950,
        stats: {
            stories: 3,
            timelineEvents: 31,
            connections: 42,
            familyMembers: 7
        },
        familyTree: ['mary-smith', 'sarah-johnson', 'michael-smith', 'emily-smith', 'robert-smith', 'helen-smith']
    },
    'sarah-johnson': {
        id: 'sarah-johnson',
        name: 'Sarah Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah-johnson&backgroundColor=b6e3f4',
        bio: 'Born in 1982, eldest daughter of John and Mary Smith. Married with two children. Working as a teacher, following in my father\'s footsteps. Love, family, and education define my life.',
        birthYear: 1982,
        stats: {
            stories: 5,
            timelineEvents: 18,
            connections: 35,
            familyMembers: 6
        },
        stories: [
            {
                id: 'sarah-wedding',
                title: 'My Wedding Day',
                date: '2010',
                category: 'Family',
                description: 'One of the happiest days of my life. Surrounded by family and friends, I married the love of my life. Dad walked me down the aisle and we both cried tears of joy.',
                image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop',
                hasMedia: true
            },
            {
                id: 'sarah-first-teaching',
                title: 'My First Day Teaching',
                date: '2004',
                category: 'Career',
                description: 'Following in Dad\'s footsteps, I became a teacher. Walking into my first classroom as a teacher, not a student, was surreal and exciting.',
                image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop',
                hasMedia: true
            },
            {
                id: 'sarah-graduation',
                title: 'College Graduation',
                date: '2003',
                category: 'Milestones',
                description: 'Graduating from college with a degree in Education. Mom and Dad were so proud. This was the beginning of my teaching journey.',
                image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
                hasMedia: false
            },
            {
                id: 'sarah-first-child',
                title: 'Becoming a Mother',
                date: '2012',
                category: 'Family',
                description: 'The day I became a mother changed everything. Holding my daughter for the first time, I understood the depth of my parents\' love for me.',
                hasMedia: true
            },
            {
                id: 'sarah-childhood',
                title: 'Growing Up with My Brothers',
                date: '1990',
                category: 'Childhood',
                description: 'Being the oldest of three, I was always the responsible one. But Michael and Emily kept life interesting and full of laughter.',
                hasMedia: true
            }
        ],
        timeline: [
            { year: '1982', title: 'Born in Chicago', icon: 'fa-baby', category: 'milestones', description: 'Born on a beautiful spring morning in Chicago. The beginning of a wonderful life journey.', hasMedia: true },
            { year: '1983', title: 'First Steps', icon: 'fa-walking', category: 'childhood', description: 'Took my first wobbly steps across the living room. Everyone was cheering me on.', hasMedia: true },
            { year: '1987', title: 'First Day of Kindergarten', icon: 'fa-graduation-cap', category: 'childhood', description: 'Nervous but excited to start school and make new friends.', hasMedia: false },
            { year: '2000', title: 'High School Graduation', icon: 'fa-graduation-cap', category: 'education', description: 'Graduated with honors and excited for the next chapter.', hasMedia: true },
            { year: '2003', title: 'College Graduation', icon: 'fa-graduation-cap', category: 'education', description: 'Earned my degree in Education. Mom and Dad were so proud.', hasMedia: true },
            { year: '2004', title: 'First Teaching Job', icon: 'fa-chalkboard-teacher', category: 'career', description: 'Walking into my first classroom as a teacher was surreal and exciting.', hasMedia: true },
            { year: '2008', title: 'Met My Husband', icon: 'fa-heart', category: 'family', description: 'We met at a coffee shop and instantly connected. Love at first sight.', hasMedia: false },
            { year: '2010', title: 'Wedding Day', icon: 'fa-ring', category: 'family', description: 'The happiest day of my life. Dad walked me down the aisle.', hasMedia: true },
            { year: '2012', title: 'First Child Born', icon: 'fa-baby', category: 'family', description: 'Becoming a mother changed everything. Pure love and joy.', hasMedia: true },
            { year: '2015', title: 'Second Child Born', icon: 'fa-baby', category: 'family', description: 'Our family grew again with the arrival of our second child.', hasMedia: true },
            { year: '2018', title: 'Became Department Head', icon: 'fa-trophy', category: 'career', description: 'Promoted to lead the education department after years of dedication.', hasMedia: false }
        ],
        familyTree: ['john-smith', 'mary-smith', 'michael-smith', 'emily-smith']
    },
    'mary-smith': {
        id: 'mary-smith',
        name: 'Mary Smith',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mary-smith&backgroundColor=ffd5dc',
        bio: 'Born in 1952, wife to John Smith for over 50 years. Mother of three wonderful children. Retired nurse who dedicated her life to caring for others and her family.',
        birthYear: 1952,
        stats: {
            stories: 4,
            timelineEvents: 22,
            connections: 28,
            familyMembers: 7
        },
        stories: [
            {
                id: 'mary-wedding',
                title: 'Marrying My Best Friend',
                date: '1975',
                category: 'Family',
                description: 'The day I married John was the beginning of our beautiful journey together. We met at a coffee shop, and I knew he was the one from our first conversation.',
                image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=400&fit=crop',
                hasMedia: true
            },
            {
                id: 'mary-nursing',
                title: 'Becoming a Nurse',
                date: '1973',
                category: 'Career',
                description: 'Graduating from nursing school was a dream come true. I wanted to help people, and nursing gave me that opportunity every single day.',
                hasMedia: false
            },
            {
                id: 'mary-japan',
                title: 'Trip to Japan',
                date: '2016',
                category: 'Travel',
                description: 'John and I celebrated our retirement with a dream trip to Japan. The cherry blossoms were in full bloom, and we explored ancient temples in Kyoto. An unforgettable adventure!',
                image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop',
                hasMedia: true
            },
            {
                id: 'mary-grandchildren',
                title: 'Meeting My First Grandchild',
                date: '2012',
                category: 'Family',
                description: 'The moment Sarah placed my first grandchild in my arms, my heart grew three sizes. Being a grandmother is the greatest joy.',
                hasMedia: true
            }
        ],
        timeline: [
            { year: '1952', title: 'Born in New York', icon: 'fa-baby', category: 'milestones', description: 'Born in a bustling New York hospital, the start of my incredible journey.', hasMedia: true },
            { year: '1970', title: 'Started Nursing School', icon: 'fa-user-nurse', category: 'education', description: 'Pursued my dream of becoming a nurse to help others.', hasMedia: false },
            { year: '1973', title: 'Became a Nurse', icon: 'fa-briefcase', category: 'career', description: 'Graduated and began my career caring for patients.', hasMedia: true },
            { year: '1974', title: 'Met John', icon: 'fa-heart', category: 'family', description: 'Met the love of my life at a coffee shop. I knew he was special from the first conversation.', hasMedia: false },
            { year: '1975', title: 'Wedding Day', icon: 'fa-ring', category: 'family', description: 'Married my best friend. The beginning of our beautiful journey together.', hasMedia: true },
            { year: '1982', title: 'Sarah\'s Birth', icon: 'fa-baby', category: 'family', description: 'Our first child was born. Becoming a mother was life-changing.', hasMedia: true },
            { year: '1985', title: 'Michael\'s Birth', icon: 'fa-baby', category: 'family', description: 'Our son arrived, completing our growing family.', hasMedia: true },
            { year: '1988', title: 'Emily\'s Birth', icon: 'fa-baby', category: 'family', description: 'Our third and final child. Three children, endless love.', hasMedia: true },
            { year: '2010', title: 'Retirement from Nursing', icon: 'fa-calendar-check', category: 'career', description: 'After decades of caring for others, it was time to enjoy life with family.', hasMedia: false },
            { year: '2016', title: 'Trip to Japan', icon: 'fa-plane', category: 'travel', description: 'John and I celebrated retirement with a dream trip to Japan. Cherry blossoms and ancient temples.', hasMedia: true }
        ],
        familyTree: ['john-smith', 'sarah-johnson', 'michael-smith', 'emily-smith']
    },
    'michael-smith': {
        id: 'michael-smith',
        name: 'Michael Smith',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael-smith&backgroundColor=d1d4f9',
        bio: 'Born in 1985, son of John and Mary Smith. Chef and restaurant owner in Austin, Texas. Following my passion for food and bringing joy to people through culinary experiences.',
        birthYear: 1985,
        stats: {
            stories: 3,
            timelineEvents: 15,
            connections: 22,
            familyMembers: 5
        },
        stories: [
            {
                id: 'michael-restaurant',
                title: 'Opening My Restaurant',
                date: '2022',
                category: 'Career',
                description: 'After years of culinary school and working in kitchens, I finally opened my own restaurant in Austin. It was a dream come true, and having my parents there on opening night made it perfect.',
                image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
                hasMedia: true
            },
            {
                id: 'michael-culinary-school',
                title: 'Culinary School Graduation',
                date: '2007',
                category: 'Education',
                description: 'Graduating from culinary school was the beginning of my journey as a chef. I learned not just cooking techniques, but the art of creating memorable experiences.',
                hasMedia: false
            },
            {
                id: 'michael-first-dish',
                title: 'My First Restaurant Job',
                date: '2008',
                category: 'Career',
                description: 'Working in a professional kitchen for the first time was intense and exhilarating. The heat, the pressure, the creativity - I loved every minute.',
                hasMedia: true
            }
        ],
        timeline: [
            { year: '1985', title: 'Born in Chicago', icon: 'fa-baby', category: 'milestones', description: 'Born in Chicago, second child of John and Mary. Sarah was excited to have a little brother.', hasMedia: true },
            { year: '1986', title: 'First Steps', icon: 'fa-walking', category: 'childhood', description: 'Took my first steps at 11 months. Determined to keep up with my big sister Sarah.', hasMedia: true },
            { year: '2005', title: 'High School Graduation', icon: 'fa-graduation-cap', category: 'education', description: 'Graduated high school with a passion for cooking already burning bright.', hasMedia: false },
            { year: '2005', title: 'Started Culinary School', icon: 'fa-utensils', category: 'education', description: 'Enrolled in culinary school to pursue my dream of becoming a chef.', hasMedia: false },
            { year: '2007', title: 'Graduated Culinary School', icon: 'fa-graduation-cap', category: 'education', description: 'Graduated with top honors. Ready to start my culinary journey.', hasMedia: true },
            { year: '2008', title: 'First Restaurant Job', icon: 'fa-briefcase', category: 'career', description: 'Started working in a professional kitchen. Intense, exhilarating, everything I hoped for.', hasMedia: true },
            { year: '2015', title: 'Head Chef Position', icon: 'fa-trophy', category: 'career', description: 'Promoted to Head Chef after years of dedication and hard work.', hasMedia: true },
            { year: '2022', title: 'Opened Own Restaurant', icon: 'fa-store', category: 'career', description: 'Finally opened my own restaurant in Austin. A dream come true with my parents there on opening night.', hasMedia: true }
        ],
        familyTree: ['john-smith', 'mary-smith', 'sarah-johnson', 'emily-smith']
    },
    'emily-smith': {
        id: 'emily-smith',
        name: 'Emily Smith',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily-smith&backgroundColor=ffdfbf',
        bio: 'Born in 1988, youngest daughter of John and Mary Smith. Artist based in New York City. Expressing life through color and canvas, creating beauty in a chaotic world.',
        birthYear: 1988,
        stats: {
            stories: 4,
            timelineEvents: 14,
            connections: 30,
            familyMembers: 5
        },
        stories: [
            {
                id: 'emily-exhibition',
                title: 'My First Art Exhibition',
                date: '2023',
                category: 'Career',
                description: 'Having my first major art exhibition in New York was a dream come true. Seeing people connect with my paintings was incredibly moving and validated years of hard work.',
                image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop',
                hasMedia: true
            },
            {
                id: 'emily-art-school',
                title: 'Art School Days',
                date: '2010',
                category: 'Education',
                description: 'Art school opened my eyes to endless possibilities. I learned to see the world differently and express my vision through various mediums.',
                hasMedia: false
            },
            {
                id: 'emily-first-painting',
                title: 'My First Sold Painting',
                date: '2012',
                category: 'Career',
                description: 'Selling my first painting was validation that I could make a living doing what I love. A stranger connected with something I created from my heart.',
                hasMedia: true
            },
            {
                id: 'emily-paris',
                title: 'Studying in Paris',
                date: '2011',
                category: 'Travel',
                description: 'Spending a semester in Paris studying art was life-changing. The city\'s beauty, history, and artistic energy inspired me beyond words.',
                image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop',
                hasMedia: true
            }
        ],
        timeline: [
            { year: '1988', title: 'Born in Chicago', icon: 'fa-baby', category: 'milestones', description: 'Born the youngest of three children. Sarah and Michael were so excited to have a baby sister.', hasMedia: true },
            { year: '1989', title: 'First Steps', icon: 'fa-walking', category: 'childhood', description: 'Took my first steps at 10 months old, the earliest walker of all three kids.', hasMedia: true },
            { year: '2007', title: 'High School Graduation', icon: 'fa-graduation-cap', category: 'education', description: 'Graduated with a portfolio already showcasing my artistic talents.', hasMedia: false },
            { year: '2007', title: 'Started Art School', icon: 'fa-palette', category: 'education', description: 'Enrolled in art school to hone my skills and find my artistic voice.', hasMedia: false },
            { year: '2011', title: 'Studied in Paris', icon: 'fa-plane', category: 'travel', description: 'A semester in Paris studying art changed my perspective and inspired my work.', hasMedia: true },
            { year: '2011', title: 'Graduated Art School', icon: 'fa-graduation-cap', category: 'education', description: 'Graduated with honors, ready to pursue my art career.', hasMedia: true },
            { year: '2012', title: 'First Painting Sold', icon: 'fa-trophy', category: 'career', description: 'A stranger connected with my art and bought my first painting. Validation that I could do this.', hasMedia: true },
            { year: '2023', title: 'First Major Exhibition', icon: 'fa-award', category: 'career', description: 'My first major art exhibition in New York. Seeing people connect with my paintings was incredible.', hasMedia: true }
        ],
        familyTree: ['john-smith', 'mary-smith', 'sarah-johnson', 'michael-smith']
    },
    'robert-smith': {
        id: 'robert-smith',
        name: 'Robert Smith',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=robert-smith&backgroundColor=e0e0e0',
        bio: 'Born in 1920, passed away in 1995. Father to John Smith. WWII veteran and factory foreman. A man of integrity, hard work, and unwavering dedication to his family.',
        birthYear: 1920,
        deathYear: 1995,
        stats: {
            stories: 2,
            timelineEvents: 12,
            connections: 18,
            familyMembers: 4
        },
        stories: [
            {
                id: 'robert-wwii',
                title: 'Serving in World War II',
                date: '1942-1945',
                category: 'Military',
                description: 'I served my country during World War II. Those years shaped who I became - teaching me courage, duty, and the value of freedom. Stories I rarely told, but lessons I lived by.',
                hasMedia: false
            },
            {
                id: 'robert-family',
                title: 'Raising My Son',
                date: '1950-1970',
                category: 'Family',
                description: 'Watching John grow up was my greatest joy. Teaching him to be honest, work hard, and treat people with respect was more important than any job I ever had.',
                hasMedia: true
            }
        ],
        timeline: [
            { year: '1920', title: 'Born in Illinois', icon: 'fa-baby', category: 'milestones', description: 'Born in Illinois in 1920. Grew up during challenging times.', hasMedia: false },
            { year: '1942', title: 'Joined Military', icon: 'fa-flag', category: 'military', description: 'Joined the military to serve my country during WWII. Duty and honor were everything.', hasMedia: true },
            { year: '1945', title: 'Returned from War', icon: 'fa-home', category: 'military', description: 'Came home from the war. Those years shaped who I became.', hasMedia: true },
            { year: '1948', title: 'Married Helen', icon: 'fa-ring', category: 'family', description: 'Married the love of my life. She was my rock and partner.', hasMedia: true },
            { year: '1950', title: 'John\'s Birth', icon: 'fa-baby', category: 'family', description: 'Became a father. Watching John grow was my greatest joy.', hasMedia: true },
            { year: '1952', title: 'Started at Factory', icon: 'fa-briefcase', category: 'career', description: 'Began working at the factory. Honest work to provide for my family.', hasMedia: false },
            { year: '1975', title: 'John\'s Wedding', icon: 'fa-heart', category: 'family', description: 'Watched my son marry Mary. A proud moment for any father.', hasMedia: true },
            { year: '1982', title: 'First Grandchild', icon: 'fa-baby', category: 'family', description: 'Became a grandfather. Sarah brought new joy to our lives.', hasMedia: true },
            { year: '1990', title: 'Retired', icon: 'fa-calendar-check', category: 'career', description: 'Retired after decades of hard work. Time to enjoy family.', hasMedia: false }
        ],
        familyTree: ['helen-smith', 'john-smith']
    },
    'helen-smith': {
        id: 'helen-smith',
        name: 'Helen Smith',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=helen-smith&backgroundColor=f4e4ba',
        bio: 'Born in 1925, passed away in 2000. Mother to John Smith. Devoted homemaker and community volunteer. Her love, warmth, and wisdom shaped our entire family.',
        birthYear: 1925,
        deathYear: 2000,
        stats: {
            stories: 2,
            timelineEvents: 7,
            connections: 15,
            familyMembers: 4
        },
        stories: [
            {
                id: 'helen-homemaking',
                title: 'Creating a Home',
                date: '1950-1980',
                category: 'Family',
                description: 'My greatest accomplishment wasn\'t any career, but the warm, loving home I created for Robert and John. Every meal, every hug, every lesson was made with love.',
                hasMedia: true
            },
            {
                id: 'helen-grandchildren',
                title: 'Being a Grandmother',
                date: '1982-2000',
                category: 'Family',
                description: 'My grandchildren brought such joy to my later years. Sarah, Michael, and Emily filled my life with laughter, love, and purpose. They were my greatest blessing.',
                hasMedia: true
            }
        ],
        timeline: [
            { year: '1925', title: 'Born in Chicago', icon: 'fa-baby', category: 'milestones', description: 'Born in Chicago in 1925. A simpler time with strong family values.', hasMedia: false },
            { year: '1948', title: 'Married Robert', icon: 'fa-ring', category: 'family', description: 'Married my dear Robert. He was my everything.', hasMedia: true },
            { year: '1950', title: 'John\'s Birth', icon: 'fa-baby', category: 'family', description: 'Became a mother. John was my world.', hasMedia: true },
            { year: '1975', title: 'John\'s Wedding', icon: 'fa-heart', category: 'family', description: 'Watched John marry Mary. A beautiful ceremony filled with love.', hasMedia: true },
            { year: '1982', title: 'First Grandchild Born', icon: 'fa-baby', category: 'family', description: 'Sarah was born. My heart grew three sizes that day.', hasMedia: true },
            { year: '1985', title: 'Second Grandchild Born', icon: 'fa-baby', category: 'family', description: 'Michael arrived. Another precious grandchild to love.', hasMedia: true },
            { year: '1988', title: 'Third Grandchild Born', icon: 'fa-baby', category: 'family', description: 'Emily completed the trio. Three beautiful grandchildren.', hasMedia: true }
        ],
        familyTree: ['robert-smith', 'john-smith']
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = profilesData;
}

