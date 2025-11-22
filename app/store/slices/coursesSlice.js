// app/store/slices/coursesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchCourses, fetchCourseDetails } from '../../utils/api';

const FAVORITES_KEY = '@favorites';

export const getCourses = createAsyncThunk(
  'courses/getCourses',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchCourses();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCourseDetails = createAsyncThunk(
  'courses/getCourseDetails',
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchCourseDetails(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadFavorites = createAsyncThunk(
  'courses/loadFavorites',
  async () => {
    try {
      const favoritesJSON = await AsyncStorage.getItem(FAVORITES_KEY);
      return favoritesJSON ? JSON.parse(favoritesJSON) : [];
    } catch (error) {
      return [];
    }
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    selectedCourse: null,
    favorites: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const courseId = action.payload;
      const index = state.favorites.findIndex((id) => id === courseId);
      
      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(courseId);
      }
      
      AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
    },
    clearSelectedCourse: (state) => {
      state.selectedCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getCourseDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCourseDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCourse = action.payload;
      })
      .addCase(getCourseDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  },
});

export const { toggleFavorite, clearSelectedCourse } = coursesSlice.actions;
export default coursesSlice.reducer;