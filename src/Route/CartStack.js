import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CartScreen from '../Views/Cart/CartScreen';
const Stack = createStackNavigator();

const CartStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen component={CartScreen} name="Sepetim" />
    </Stack.Navigator>
  );
};

const screenOptions = {
  headerShown: false,
};
export default CartStack;
