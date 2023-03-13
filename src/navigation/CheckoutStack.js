import React from 'react';
import AddCreditCardScreen from '../ui/screens/add_credit_card/AddCreditCardScreen';
import CheckoutScreen from '../ui/screens/checkout_screen/CheckoutScreen';
import PaymentMethodScreen from '../ui/screens/payment_method/PaymentMethodScreen';
import SelectShippingAddressScreen from '../ui/screens/shipping_address/SelectShippingAddressScreen';
import ShippingAddressScreen from '../ui/screens/shipping_address/ShippingAddressScreen';

const { createNativeStackNavigator } = require('@react-navigation/native-stack');

const Stack = createNativeStackNavigator();

const CheckoutStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="PaymentMethodScreen" component={PaymentMethodScreen} />
      <Stack.Screen name="AddCreditCardScreen" component={AddCreditCardScreen} />
      <Stack.Screen name="SelectShippingAddressScreen" component={SelectShippingAddressScreen} />
      <Stack.Screen name="ShippingAddressScreen" component={ShippingAddressScreen} />
    </Stack.Navigator>
  );
};

export default CheckoutStack;
