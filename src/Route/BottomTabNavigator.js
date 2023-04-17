import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeStack from './HomeStack';
import CartStack from './CartStack';
import FavoriteStack from './FavoriteStack';
import TotalQuantity from '../Methot/TotalQuantity';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();
const {Screen, Navigator} = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const cart = useSelector(state => state.cart.cart);

  const CustomButton = props => {
    const {customButton, icon} = styles;

    return (
      <TouchableOpacity onPress={() => props.onPress()} style={customButton}>
        <Image
          source={require('../assets/icons/ic_cart.png')}
          style={{height: 30, width: 30}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Navigator screenOptions={screenOptions}>
      <Screen
        name="Ana Sayfa"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Image
              style={{
                tintColor: focused ? '#1323F1' : '#E5E5E5',
                height: 24,
                width: 24,
              }}
              source={require('../assets/icons/home.png')}
            />
          ),
        }}
      />

      <Screen
        name="Sepet"
        component={CartStack}
        options={{
          tabBarBadge: TotalQuantity(cart) || null,
          tabBarIcon: ({focused, color}) => (
            <Image
              style={{
                tintColor: focused ? '#1323F1' : '#E5E5E5',
                height: 30,
                width: 30,
              }}
              source={require('../assets/icons/ic_cart_gray.png')}
            />
          ),
        }}
      />
      <Screen
        name="Favorilerim"
        component={FavoriteStack}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Image
              style={{
                tintColor: focused ? '#1323F1' : '#E5E5E5',
                height: 40,
                width: 40,
              }}
              source={require('../assets/icons/emptyStar.png')}
            />
          ),
        }}
      />
    </Navigator>
  );
};

const styles = {
  customButton: {
    backgroundColor: '#1323F1',
    height: 65,
    width: 65,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 30,
    borderWidth: 3,
    borderColor: 'white',
  },

  icon: {
    left: 1,
  },
};

const screenOptions = {
  headerShown: false,
  tabBarShowLabel: true,
  tabBarInactiveTintColor: '#E5E5E5',
  tabBarActiveTintColor: '#1323F1',

  tabBarStyle: {
    height: 90,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: 'white',
  },
};

export default BottomTabNavigator;
