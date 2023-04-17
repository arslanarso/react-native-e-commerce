import React from 'react';
import renderer from 'react-test-renderer';
import Products from '../src/components/Home/Products';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from '../Redux/store';

it('renders correctly', () => {
  const item = {
    id: 1,
    name: 'Test Product',
    price: 19.99,
    image: 'https://example.com/test.jpg',
    quantity: 1,
  };
  const tree = renderer
    .create(
      <NavigationContainer>
        <Provider store={store}>
          <Products item={item} />
        </Provider>
      </NavigationContainer>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
