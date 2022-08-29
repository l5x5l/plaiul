/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {  NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  useColorScheme,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { Main } from './src/components/pages/main';
import { Theme } from './src/type/theme';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';


  const Stack = createNativeStackNavigator()

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='MAIN' component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#D9CCB9',
    background: '#45534C',
    background_deactive : '#727F78',
    card: '#1B1F1D',
    text: '#D9CCB9',
    border: '#D9CCB9',
    notification: 'FFCC00',
  }
}

const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#45534C',
    background: '#F3F0EB',
    background_deactive : '#9EAAA4',
    card: '#D9CCB9',
    text: '#45534C',
    border: '#45534C',
    notification: '#FF421A',
  }
}


export default App;
