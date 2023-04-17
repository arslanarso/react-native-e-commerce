import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FavoritesScreen from '../Views/Favorites/FavoritesScreen';
const Stack = createStackNavigator();

const FavoriteStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen component={FavoritesScreen} name="Favoriler" />
    </Stack.Navigator>
  );
};

const screenOptions = {
  headerShown: false,
};
export default FavoriteStack;
