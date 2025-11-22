// App.js (Replace your existing App.js with this)
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import AppNavigator from './app/navigation/AppNavigator';
import { COLORS } from './app/constants/colors';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" backgroundColor={COLORS.primary} />
      <AppNavigator />
    </Provider>
  );
}