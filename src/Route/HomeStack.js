import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Views/Home/HomeScreen';
import ProductDetail from '../Views/Home/ProductDetail/ProductDetail';
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen component={HomeScreen} name="Ana Sayfam" />
      <Stack.Screen component={ProductDetail} name="Ürün Detay" />
    </Stack.Navigator>
  );
};

const screenOptions = {
  headerShown: false,
};
export default HomeStack;
