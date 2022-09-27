/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import {
  useColorScheme
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { LoginModal } from './src/components/blocks/loginModal';
import { LoginHome } from './src/components/pages/login';
import { Main } from './src/components/pages/main';
import { QnaScreen } from './src/components/pages/qna';
import { QnaEditScreen } from './src/components/pages/qnaEdit';
import { StoryScreen } from './src/components/pages/story';
import { StoryCommentScreen } from './src/components/pages/storyComment';
import { StoryEditScreen } from './src/components/pages/storyEdit';
import { TipDetailScreen } from './src/components/pages/tipDetail';
import { TipEditScreen } from './src/components/pages/tipEdit';
import { store } from './src/redux/store';
import { RootStackParamList } from './src/type/navigate/types';
import { Theme } from './src/type/theme';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const Stack = createNativeStackNavigator<RootStackParamList>()

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
          {
            useMemo(() => (
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Main' component={Main} />
                <Stack.Screen name="Story" component={StoryScreen} />
                <Stack.Screen name="LoginHome" component={LoginHome} />
                <Stack.Screen name="StoryComment" component={StoryCommentScreen} />
                <Stack.Screen name="StoryEdit" component={StoryEditScreen}/>
                <Stack.Screen name="Qna" component={QnaScreen}/>
                <Stack.Screen name="QnaEdit" component={QnaEditScreen}/>
                <Stack.Screen name="Tip" component={TipDetailScreen}/>
                <Stack.Screen name="TipEdit" component={TipEditScreen}/>
              </Stack.Navigator>
            ), [])
          }
          <LoginModal/>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

//background_deactive : '#727F78',
const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#D9CCB9',
    background: '#45534C',
    card: '#1B1F1D',
    text: '#D9CCB9',
    border: '#D9CCB9',
    notification: '#FFCC00',
  }
}

// background_deactive : '#9EAAA4',
const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#45534C',
    background: '#F3F0EB',
    card: '#D9CCB9',
    text: '#45534C',
    border: '#45534C',
    notification: '#FF421A',
  }
}


export default App;
