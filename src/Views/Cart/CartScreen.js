import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  addToCart,
  removeFromCart,
} from '../../../Redux/CartReducer';
import TotalAmount from '../../Methot/TotalAmount';

const CartScreen = () => {
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();

  const increaseQuantity = item => {
    dispatch(incrementQuantity(item));
  };
  const decreaseQuantity = item => {
    if (item.quantity == 1) {
      dispatch(removeFromCart(item));
    } else {
      dispatch(decrementQuantity(item));
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.Header}>
        <View style={{margin: 15}}>
          <Text style={{fontWeight: 'bold', fontSize: 22}}>Toplam Tutar</Text>
          <Text style={{fontWeight: 'bold', fontSize: 22, color: 'blue'}}>
            ₺{TotalAmount(cart)}
          </Text>
        </View>
      </View>
      <ScrollView>
        {cart.map((item, index) => (
          <View style={styles.cardContainer}>
            <View
              style={{
                padding: 10,
                flexDirection: 'row',
              }}
              key={index}>
              <Image
                style={styles.productImageStyle}
                source={{uri: item.image}}
              />
              <View
                style={{
                  justifyContent: 'center',
                  marginHorizontal: 10,
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  {item.name}
                </Text>
                <View style={{flexDirection: 'row', marginVertical: 10}}>
                  <Text>{item.price}</Text>
                  <Text> X {item.quantity}</Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    marginRight: '4%',
                  }}>
                  <Pressable style={styles.button}>
                    <Pressable onPress={() => decreaseQuantity(item)}>
                      <Text
                        style={{
                          fontSize: 25,
                          color: 'white',
                        }}>
                        -
                      </Text>
                    </Pressable>

                    <Pressable>
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'white',
                          paddingHorizontal: 25,
                        }}>
                        {item.quantity}
                      </Text>
                    </Pressable>

                    <Pressable onPress={() => increaseQuantity(item)}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'white',
                        }}>
                        +
                      </Text>
                    </Pressable>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Header: {borderBottomWidth: 1, borderColor: 'grey'},
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  productImageStyle: {width: 100, height: 100, borderRadius: 8, marginTop: 6},
  button: {
    flexDirection: 'row',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 5,
    width: 120,
  },
});

export default CartScreen;
