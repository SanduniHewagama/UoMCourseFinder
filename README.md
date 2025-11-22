# 🎓 UoM Course Finder

<div align="center">
  
  ![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
  ![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

  **A Cross-Platform Mobile Application for Browsing and Managing University Courses**
  
  [Features](#-features) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure)

</div>

---

## 📱 About The Project

**UoM Course Finder** is a mobile application developed as part of the IN3210 Mobile Applications Development course assignment. The app allows students to explore online courses, save their favorites, and manage their learning journey with an intuitive and modern interface.

**Student Details:**
- **Name:** Hewagama S
- **Index Number:** 224075K
- **Assignment:** Cross-Platform Mobile Development with React Native
- **Domain:** Campus & Education Tech (Last Digit: 5)

---

## ✨ Features

### Core Functionality
- ✅ **User Authentication** - Secure registration and login system with form validation
- 🏠 **Dynamic Course Listing** - Browse courses fetched from educational APIs
- 📖 **Detailed Course View** - View comprehensive course information with descriptions
- ⭐ **Favorites Management** - Save and manage favorite courses with persistent storage
- 🧭 **Smooth Navigation** - Seamless navigation using React Navigation (Stack + Tab/Drawer)
- 🎨 **Modern UI/UX** - Clean and responsive design with Feather Icons
- 🌙 **Dark Mode Toggle** - Switch between light and dark themes
- 📱 **Responsive Design** - Optimized for various screen sizes

---

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (for Expo projects) or React Native CLI
- iOS Simulator or Android Emulator (or Expo Go app on physical device)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/uom-course-finder.git
   cd uom-course-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   
   For Expo:
   ```bash
   npx expo start
   ```
   
   For React Native CLI:
   ```bash
   npx react-native run-android
   # or
   npx react-native run-ios
   ```

4. **Run on device/emulator**
   - Scan the QR code with Expo Go app (for Expo)
   - Or press 'a' for Android emulator, 'i' for iOS simulator

---

## 🛠️ Tech Stack

### Frontend Framework
- **React Native** - Cross-platform mobile development
- **Expo** - Development and build toolchain (if applicable)

### Navigation
- **React Navigation** - Navigation library for routing and screen management
  - Stack Navigator
  - Bottom Tab Navigator / Drawer Navigator

### State Management
- **Redux Toolkit** - Centralized state management for app-wide data
- **React Hooks** - Local state management (useState, useEffect, useContext)

### Data Persistence
- **AsyncStorage** - Local storage for favorites and authentication tokens
- **Secure Storage** - For sensitive authentication data (if implemented)

### API Integration
- **Axios** / **Fetch API** - HTTP client for API requests
- **Open Library API** / **Course APIs** - Educational data source

### UI/UX
- **Feather Icons** - Iconography
- **React Native Paper** / **Native Base** (if used) - UI component library
- **Styled Components** / **StyleSheet** - Styling solution

### Form Validation
- **Yup** - Schema validation for forms
- **Formik** (optional) - Form management

---

## 📁 Project Structure

```
uom-course-finder/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CourseCard.js
│   │   ├── Header.js
│   │   └── LoadingSpinner.js
│   ├── screens/             # Application screens
│   │   ├── auth/
│   │   │   ├── LoginScreen.js
│   │   │   └── RegisterScreen.js
│   │   ├── HomeScreen.js
│   │   ├── DetailsScreen.js
│   │   ├── FavoritesScreen.js
│   │   └── ProfileScreen.js
│   ├── navigation/          # Navigation configuration
│   │   ├── AppNavigator.js
│   │   └── AuthNavigator.js
│   ├── redux/               # State management
│   │   ├── store.js
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   ├── coursesSlice.js
│   │   │   └── favoritesSlice.js
│   ├── services/            # API services
│   │   ├── api.js
│   │   └── authService.js
│   ├── utils/               # Utility functions
│   │   ├── validation.js
│   │   └── storage.js
│   ├── constants/           # App constants
│   │   ├── colors.js
│   │   └── themes.js
│   └── assets/              # Images, fonts, etc.
├── App.js                   # Root component
├── package.json
└── README.md
```

---

## 🔑 Key Implementation Details

### Authentication Flow
- User registration with email/password validation
- Secure login with JWT token storage (simulated with dummy API)
- Protected routes accessible only after authentication
- Persistent login state across app restarts

### API Integration
- RESTful API calls to fetch course data
- Error handling and loading states
- Data caching for improved performance

### State Management Architecture
```javascript
// Redux Store Structure
{
  auth: {
    user: {},
    isAuthenticated: boolean,
    token: string
  },
  courses: {
    items: [],
    loading: boolean,
    error: string
  },
  favorites: {
    items: []
  }
}
```

### Navigation Structure
```
Auth Stack (if not logged in)
├── Login Screen
└── Register Screen

Main App (if logged in)
├── Tab Navigator / Drawer Navigator
│   ├── Home (Stack)
│   │   ├── Home Screen
│   │   └── Details Screen
│   ├── Favorites Screen
│   └── Profile Screen
```

---

## 🎯 Assignment Requirements Checklist

- ✅ User Authentication with validation
- ✅ React Hooks for form handling
- ✅ Navigation (Stack + Tab/Drawer)
- ✅ Dynamic item list from API
- ✅ Card-based UI with image, title, description
- ✅ Item interaction leading to Details Screen
- ✅ Redux Toolkit for state management
- ✅ Favorites functionality with persistence
- ✅ Consistent styling with Feather Icons
- ✅ Responsive design
- ✅ Feature-based Git commits
- ✅ Input validations
- ✅ Modular and reusable code
- ✅ Best practices and coding standards
- ✅ Dark mode (Bonus feature)

---

## 🌐 APIs Used

- **[Open Library API](https://openlibrary.org/developers/api)** - Educational content and course data
- **[DummyJSON](https://dummyjson.com/)** - Mock authentication and user data
- Alternative: Custom educational APIs or mock JSON data

---

## 💡 Best Practices Implemented

### Code Quality
- **Modular Components** - Reusable and maintainable components
- **Separation of Concerns** - Clear separation between UI, logic, and data
- **DRY Principle** - Don't Repeat Yourself
- **Meaningful Names** - Descriptive variable and function names
- **Code Comments** - Clear documentation where needed

### Security
- **Input Validation** - All user inputs validated
- **Secure Storage** - Sensitive data stored securely
- **Error Handling** - Graceful error management

### Performance
- **Lazy Loading** - Components loaded on demand
- **Memoization** - React.memo for performance optimization
- **Efficient Rendering** - FlatList for large lists

---

## 🐛 Known Issues & Future Enhancements

### Known Issues
- None reported (add any if applicable)

### Future Enhancements
- 🔔 Push notifications for new courses
- 🔍 Advanced search and filtering
- 📊 Progress tracking and analytics
- 👥 Social features (share courses)
- 🌍 Multi-language support
- 📥 Offline mode with data synchronization

## 👨‍💻 Developer

**[Your Name]**
- Index: 224075K
- Course: IN3210 Mobile Applications Development
- Institution: University of Moratuwa
---

<div align="center">

**⭐ If you found this project helpful, please consider giving it a star!**

</div>
