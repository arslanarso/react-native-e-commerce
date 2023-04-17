import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  Alert,
  Text,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from '../../../../Redux/CartReducer';

const ProductDetail = ({route}) => {
  const item = route.params.item;
  const navigation = useNavigation();
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();
  const BannerWidth = Dimensions.get('window').width;
  const [subCategories, setSubCategories] = useState('');
  let sub_Categories = subCategories;

  let str = item.toString();

  const goBack = () => {
    navigation.goBack();
  };
  const addItemToCart = item => {
    dispatch(addToCart(item));
  };
  const removeItemFromCart = item => {
    dispatch(removeFromCart(item));
  };
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

  const AddToCartButton = () => {
    return (
      <>
        {cart.some(value => value.id == item.id) ? (
          <Pressable
            style={styles.removeButton}
            onPress={() => {
              Alert.alert('Başarılı', 'Ürün Başarıyla Sepetten Çıkartıldı', [
                {text: 'Tamam', onPress: () => {}},
              ]);
              removeItemFromCart(item);
            }}>
            <Text
              style={{
                color: '#f70c02',
                fontWeight: 'bold',
              }}>
              SİL
            </Text>
          </Pressable>
        ) : (
          <Pressable
            style={styles.button}
            onPress={() => {
              Alert.alert('Başarılı', 'Ürün Başarıyla Sepete Eklendi', [
                {text: 'Tamam', onPress: () => {}},
              ]);
              addItemToCart(item);
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
              }}>
              Sepete Ekle
            </Text>
          </Pressable>
        )}
      </>
    );
  };

  return (
    <View style={styles.page}>
      <View style={styles.pageHeader}>
        <Ionicons
          onPress={goBack}
          name="arrow-back-outline"
          color={'white'}
          size={35}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10,
          }}>
          <Text style={{color: 'white', fontSize: 17, fontWeight: 'bold'}}>
            {item.name}
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <Image
          style={styles.image}
          source={{
            uri: item.image,
          }}
        />
        <Text style={styles.title}>{item.name}</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.description}>{item.description}</Text>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <View>
          <Text style={{color: 'blue', fontSize: 20}}>Price : </Text>
          <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
            {item.price} ₺
          </Text>
        </View>
        <AddToCartButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    height: '78%',
    padding: 15,
  },
  footer: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    fontStyle: 'italic',
  },

  image: {
    height: 200,
    resizeMode: 'cover',
  },
  pageHeader: {
    backgroundColor: 'blue',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    paddingTop: '15%',
    paddingVertical: 10,
  },
  button: {
    backgroundColor: 'blue',
    alignItems: 'center',
    width: 150,
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  removeButton: {
    backgroundColor: '#fc8f8b',
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
});

export default ProductDetail;
