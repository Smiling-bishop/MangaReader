import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../pages/Home';
import appStyles from '../appStyles';
import Manga from '../pages/Manga';
import Reader from '../pages/Reader';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: appStyles.mainColor,
        },
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Manga" component={Manga} />
      <Stack.Screen name="Reader" component={Reader} />
    </Stack.Navigator>
  );
};

const Navigation = () => (
  <NavigationContainer>
    <MainStack />
  </NavigationContainer>
);
export default Navigation;
