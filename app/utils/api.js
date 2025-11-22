// app/utils/api.js - FINAL FIXED VERSION

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

// Fetch courses (using products as courses)
export const fetchCourses = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products?limit=30`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }

    const data = await response.json();
    const courses = data.products.map(product => ({
      id: product.id,
      title: product.title,
      description: product.description,
      image: product.thumbnail,
      category: product.category,
      rating: product.rating,
      price: product.price,
      status: product.stock > 50 ? 'Active' : product.stock > 0 ? 'Limited' : 'Full',
    }));
    
    console.log(`Fetched ${courses.length} courses`);
    return courses;
  } catch (error) {
    console.error('Fetch courses error:', error.message);
    throw error;
  }
};

// Fetch single course details
export const fetchCourseDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch course details');
    }

    const data = await response.json();
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      image: data.thumbnail,
      images: data.images,
      category: data.category,
      rating: data.rating,
      price: data.price,
      brand: data.brand,
      stock: data.stock,
      status: data.stock > 50 ? 'Active' : data.stock > 0 ? 'Limited' : 'Full',
    };
  } catch (error) {
    console.error('Fetch course details error:', error.message);
    throw error;
  }
};