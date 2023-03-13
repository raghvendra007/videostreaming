import React from 'react';
import BottomTabNavigator from './BottomTabNavigator';
import CheckoutStack from './CheckoutStack';
import ProductDetailsScreen from '../ui/screens/product_details/ProductDetailsScreen';
import SelectShippingAddressScreen from '../ui/screens/shipping_address/SelectShippingAddressScreen';
import ShippingAddressScreen from '../ui/screens/shipping_address/ShippingAddressScreen';
import CommentsScreen from '../ui/screens/comments/CommentsScreen';
import ProfileScreen from '../ui/screens/profile/ProfileScreen';
import PaymentMethodScreen from '../ui/screens/payment_method/PaymentMethodScreen';
import {
  BOTTOM_NAVIGATOR,
  CHECKOUT_STACK,
  COMMENTS_SCREEN,
  PRODUCT_DETAILS_SCREEN,
  PROFILE_SCREEN,
  PAYMENT_METHOD_SCREEN,
  SELECT_SHIPPING_ADDRESS_SCREEN,
  SHIPPING_ADDRESS_SCREEN,
  ADD_CREDIT_CARD_SCREEN,
  CHECKOUT_SCREEN,
} from '../constants/routes';
import AddCreditCardScreen from '../ui/screens/add_credit_card/AddCreditCardScreen';
import CheckoutScreen from '../ui/screens/checkout_screen/CheckoutScreen';

const { createNativeStackNavigator } = require('@react-navigation/native-stack');

const Stack = createNativeStackNavigator();

const RootStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={BOTTOM_NAVIGATOR} component={BottomTabNavigator} />
      <Stack.Screen name={PRODUCT_DETAILS_SCREEN} component={ProductDetailsScreen} />
      <Stack.Screen name={CHECKOUT_SCREEN} component={CheckoutScreen} />
      <Stack.Screen name={PAYMENT_METHOD_SCREEN} component={PaymentMethodScreen} />
      <Stack.Screen name={ADD_CREDIT_CARD_SCREEN} component={AddCreditCardScreen} />
      <Stack.Screen name={COMMENTS_SCREEN} component={CommentsScreen} />
      <Stack.Screen name={PROFILE_SCREEN} component={ProfileScreen} />
      <Stack.Screen name={CHECKOUT_STACK} component={CheckoutStack} />
      <Stack.Screen name={SELECT_SHIPPING_ADDRESS_SCREEN} component={SelectShippingAddressScreen} />
      <Stack.Screen name={SHIPPING_ADDRESS_SCREEN} component={ShippingAddressScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
