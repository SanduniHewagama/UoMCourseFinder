// app/utils/api.js

const BASE_URL = 'https://dummyjson.com';

// Authentication APIs
export const loginUser = async (username, password) => {
  try {
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

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Mock registration (DummyJSON doesn't have real registration)
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/users/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
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

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
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
    
    return courses;
  } catch (error) {
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
    throw error;
  }
};