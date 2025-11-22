// app/utils/api.js - UPDATED WITH COURSE DATA

const BASE_URL = 'https://dummyjson.com';

// Authentication APIs
export const loginUser = async (username, password) => {
  try {
    console.log('Attempting login with:', username);
    
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 60,
      }),
    });

    const data = await response.json();
    console.log('Login response received');

    if (!response.ok) {
      throw new Error(data.message || 'Invalid credentials');
    }

    // DummyJSON returns "accessToken", not "token" - normalize it
    if (data.accessToken) {
      data.token = data.accessToken;
    }

    // Verify token exists
    if (!data.token) {
      throw new Error('No token received from server');
    }

    console.log('Login successful for user:', data.firstName);
    return data;
  } catch (error) {
    console.error('Login error:', error.message);
    throw new Error(error.message || 'Network error. Please try again.');
  }
};

// Mock registration (DummyJSON doesn't have real registration)
export const registerUser = async (userData) => {
  try {
    console.log('Attempting registration:', userData.username);
    
    const response = await fetch(`${BASE_URL}/users/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log('Registration response received');

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    console.error('Registration error:', error.message);
    throw new Error(error.message || 'Network error. Please try again.');
  }
};

// Get current user
export const getCurrentUser = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return data;
  } catch (error) {
    console.error('Get user error:', error.message);
    throw error;
  }
};

// ============= COURSE DATA =============
// Custom dummy data for UoM Course Finder
const COURSE_DATA = [
  {
    id: 1,
    title: 'Introduction to Computer Science',
    description: 'Learn the fundamentals of programming, algorithms, and computational thinking. Perfect for beginners starting their tech journey.',
    category: 'technology',
    status: 'Active',
    price: 49.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
    instructor: 'Dr. Sarah Johnson',
    duration: '8 weeks',
    level: 'Beginner',
    enrolled: 1250,
    lectures: 45,
    stock: 100,
    brand: 'UoM Tech',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400'
    ],
    skills: ['Python', 'Algorithms', 'Problem Solving'],
    requirements: ['No prior experience needed', 'Computer with internet'],
    syllabus: [
      'Introduction to Programming',
      'Data Structures Basics',
      'Algorithm Design',
      'Object-Oriented Programming',
      'Final Project'
    ]
  },
  {
    id: 2,
    title: 'Advanced Web Development',
    description: 'Master modern web technologies including React, Node.js, and cloud deployment strategies for building scalable applications.',
    category: 'technology',
    status: 'Active',
    price: 79.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
    instructor: 'Prof. Michael Chen',
    duration: '12 weeks',
    level: 'Advanced',
    enrolled: 890,
    lectures: 68,
    stock: 75,
    brand: 'UoM Tech',
    images: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400'
    ],
    skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
    requirements: ['Basic HTML/CSS/JS knowledge', 'Understanding of APIs']
  },
  {
    id: 3,
    title: 'Digital Marketing Essentials',
    description: 'Comprehensive guide to SEO, social media marketing, content strategy, and analytics for modern businesses and entrepreneurs.',
    category: 'business',
    status: 'Active',
    price: 39.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    instructor: 'Emma Williams',
    duration: '6 weeks',
    level: 'Beginner',
    enrolled: 2100,
    lectures: 32,
    stock: 150,
    brand: 'UoM Business',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400'
    ],
    skills: ['SEO', 'Social Media', 'Google Analytics', 'Content Marketing'],
    requirements: ['Basic internet knowledge', 'Social media accounts']
  },
  {
    id: 4,
    title: 'Data Science with Python',
    description: 'Explore data analysis, machine learning, and visualization using Python, Pandas, and Scikit-learn libraries.',
    category: 'technology',
    status: 'Limited',
    price: 89.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
    instructor: 'Dr. Rajesh Kumar',
    duration: '10 weeks',
    level: 'Intermediate',
    enrolled: 750,
    lectures: 55,
    stock: 25,
    brand: 'UoM Tech',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400'
    ],
    skills: ['Python', 'Pandas', 'Machine Learning', 'Data Visualization'],
    requirements: ['Basic Python knowledge', 'Statistics fundamentals']
  },
  {
    id: 5,
    title: 'Graphic Design Masterclass',
    description: 'Learn professional design principles, Adobe Creative Suite, and build a stunning portfolio for creative careers.',
    category: 'design',
    status: 'Active',
    price: 59.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
    instructor: 'Jessica Martinez',
    duration: '8 weeks',
    level: 'Beginner',
    enrolled: 1500,
    lectures: 42,
    stock: 80,
    brand: 'UoM Design',
    images: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400'
    ],
    skills: ['Photoshop', 'Illustrator', 'Typography', 'Branding'],
    requirements: ['Computer with Adobe CC', 'Creative mindset']
  },
  {
    id: 6,
    title: 'Financial Accounting Fundamentals',
    description: 'Master accounting principles, financial statements, and bookkeeping for business success and financial literacy.',
    category: 'business',
    status: 'Active',
    price: 44.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
    instructor: 'Prof. David Thompson',
    duration: '7 weeks',
    level: 'Beginner',
    enrolled: 980,
    lectures: 38,
    stock: 120,
    brand: 'UoM Business',
    images: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400'
    ],
    skills: ['Bookkeeping', 'Financial Statements', 'Tax Basics', 'Excel'],
    requirements: ['No prior experience needed', 'Calculator and Excel']
  },
  {
    id: 7,
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile applications using React Native and modern JavaScript for iOS and Android.',
    category: 'technology',
    status: 'Active',
    price: 69.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
    instructor: 'Alex Rodriguez',
    duration: '10 weeks',
    level: 'Intermediate',
    enrolled: 650,
    lectures: 50,
    stock: 60,
    brand: 'UoM Tech',
    images: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400'
    ],
    skills: ['React Native', 'JavaScript', 'Mobile UI', 'API Integration'],
    requirements: ['JavaScript knowledge', 'React basics', 'Mac or PC']
  },
  {
    id: 8,
    title: 'Creative Writing Workshop',
    description: 'Develop your storytelling skills and learn techniques for fiction, poetry, and creative non-fiction writing.',
    category: 'arts',
    status: 'Limited',
    price: 34.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400',
    instructor: 'Sophie Anderson',
    duration: '6 weeks',
    level: 'Beginner',
    enrolled: 1200,
    lectures: 28,
    stock: 30,
    brand: 'UoM Arts',
    images: [
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400'
    ],
    skills: ['Story Structure', 'Character Development', 'Dialogue', 'Editing'],
    requirements: ['Passion for writing', 'Open mind']
  },
  {
    id: 9,
    title: 'Cybersecurity Essentials',
    description: 'Learn to protect systems and networks from cyber threats with hands-on security practices and ethical hacking.',
    category: 'technology',
    status: 'Full',
    price: 94.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
    instructor: 'Dr. James Wilson',
    duration: '12 weeks',
    level: 'Advanced',
    enrolled: 450,
    lectures: 60,
    stock: 0,
    brand: 'UoM Tech',
    images: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400'
    ],
    skills: ['Network Security', 'Ethical Hacking', 'Cryptography', 'Risk Assessment'],
    requirements: ['Networking basics', 'Linux knowledge', 'Virtual machine software']
  },
  {
    id: 10,
    title: 'Project Management Professional',
    description: 'Master project planning, execution, and leadership skills for successful project delivery in any industry.',
    category: 'business',
    status: 'Active',
    price: 54.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
    instructor: 'Linda Parker',
    duration: '8 weeks',
    level: 'Intermediate',
    enrolled: 1100,
    lectures: 40,
    stock: 90,
    brand: 'UoM Business',
    images: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400'
    ],
    skills: ['Agile', 'Scrum', 'Risk Management', 'Team Leadership'],
    requirements: ['Some work experience', 'Interest in management']
  },
  {
    id: 11,
    title: 'Photography for Beginners',
    description: 'Master camera settings, composition, and photo editing to capture stunning images and tell visual stories.',
    category: 'arts',
    status: 'Active',
    price: 39.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400',
    instructor: 'Mark Stevens',
    duration: '6 weeks',
    level: 'Beginner',
    enrolled: 1800,
    lectures: 35,
    stock: 140,
    brand: 'UoM Arts',
    images: [
      'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400'
    ],
    skills: ['Camera Settings', 'Composition', 'Lighting', 'Lightroom'],
    requirements: ['Digital camera or smartphone', 'Interest in photography']
  },
  {
    id: 12,
    title: 'Machine Learning A-Z',
    description: 'Comprehensive machine learning course covering supervised and unsupervised learning with real-world projects.',
    category: 'technology',
    status: 'Active',
    price: 99.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400',
    instructor: 'Dr. Priya Sharma',
    duration: '14 weeks',
    level: 'Advanced',
    enrolled: 820,
    lectures: 75,
    stock: 50,
    brand: 'UoM Tech',
    images: [
      'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400'
    ],
    skills: ['Python', 'TensorFlow', 'Neural Networks', 'Deep Learning'],
    requirements: ['Python proficiency', 'Math & statistics knowledge', 'ML basics']
  },
  {
    id: 13,
    title: 'UI/UX Design Principles',
    description: 'Learn user interface and experience design principles, prototyping, and usability testing for digital products.',
    category: 'design',
    status: 'Active',
    price: 64.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1561070791-36c11767b26a?w=400',
    instructor: 'Ryan Cooper',
    duration: '9 weeks',
    level: 'Intermediate',
    enrolled: 1050,
    lectures: 48,
    stock: 70,
    brand: 'UoM Design',
    images: [
      'https://images.unsplash.com/photo-1561070791-36c11767b26a?w=400'
    ],
    skills: ['Figma', 'Wireframing', 'User Research', 'Prototyping'],
    requirements: ['Basic design knowledge', 'Figma account']
  },
  {
    id: 14,
    title: 'English for Academic Purposes',
    description: 'Enhance academic writing, critical reading, and presentation skills for university-level English communication.',
    category: 'language',
    status: 'Active',
    price: 29.99,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400',
    instructor: 'Dr. Helen Carter',
    duration: '8 weeks',
    level: 'Intermediate',
    enrolled: 1600,
    lectures: 36,
    stock: 200,
    brand: 'UoM Language',
    images: [
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400'
    ],
    skills: ['Academic Writing', 'Critical Reading', 'Presentations', 'Research Skills'],
    requirements: ['Intermediate English level']
  },
  {
    id: 15,
    title: 'Artificial Intelligence Fundamentals',
    description: 'Discover AI concepts, neural networks, and practical applications in real-world problem solving.',
    category: 'technology',
    status: 'Limited',
    price: 84.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
    instructor: 'Dr. Alan Turing',
    duration: '11 weeks',
    level: 'Advanced',
    enrolled: 680,
    lectures: 62,
    stock: 35,
    brand: 'UoM Tech',
    images: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400'
    ],
    skills: ['AI Concepts', 'Neural Networks', 'Computer Vision', 'NLP'],
    requirements: ['Python knowledge', 'Math background', 'ML basics']
  }
];

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch courses - Now returns custom course data
export const fetchCourses = async () => {
  try {
    await delay(800); // Simulate network delay
    console.log(`Fetched ${COURSE_DATA.length} courses`);
    return COURSE_DATA;
  } catch (error) {
    console.error('Fetch courses error:', error.message);
    throw new Error('Failed to fetch courses');
  }
};

// Fetch single course details
export const fetchCourseDetails = async (id) => {
  try {
    await delay(600);
    const course = COURSE_DATA.find((c) => c.id === parseInt(id));
    
    if (!course) {
      throw new Error('Course not found');
    }
    
    console.log('Fetched course details for:', course.title);
    return course;
  } catch (error) {
    console.error('Fetch course details error:', error.message);
    throw error;
  }
};

// Search courses
export const searchCourses = async (query) => {
  try {
    await delay(500);
    return COURSE_DATA.filter((course) =>
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase()) ||
      course.instructor.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Search courses error:', error.message);
    throw error;
  }
};

// Filter courses by category
export const filterByCategory = async (category) => {
  try {
    await delay(400);
    if (category === 'All') return COURSE_DATA;
    return COURSE_DATA.filter((course) => 
      course.category.toLowerCase() === category.toLowerCase()
    );
  } catch (error) {
    console.error('Filter courses error:', error.message);
    throw error;
  }
};