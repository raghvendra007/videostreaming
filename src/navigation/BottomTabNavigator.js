import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '../ui/screens/feed_screen/FeedScreen';
import Cart from '../ui/screens/cart_screen/Cart';
import Discover from '../ui/screens/discover_screen/Discover';
import Ellipse from '../ui/screens/ellipse_screen/Ellipse';
import Comment from '../ui/screens/comment_screen/Comment';
import { HOME, DISCOVER, ELLIPSE, CART, COMMENT } from '../constants/assets';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        showLabel: false,
        header: () => null,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          position: 'absolute',
          elevation: 0,
          bottom: 0,
        },
      }}
    >
      <Tab.Screen
        name="feed"
        component={FeedScreen}
        screenOptions={{
          showLabel: false,
          headerShown: false,
          tabBarShowLabel: false,
        }}
        options={{
          tabBarIcon: ({ size, focused, color }) => <HOME height={23.63} width={23.48} />,
        }}
      />
      <Tab.Screen
        name="discover"
        component={Discover}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ size, focused, color }) => (
            <DISCOVER height={28} width={28} opacity={0.4} />
          ),
        }}
      />
      <Tab.Screen
        name="ellipse"
        component={Ellipse}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ size, focused, color }) => (
            <ELLIPSE width={36} height={36} />
          ),
        }}
      />
      <Tab.Screen
        name="comment"
        component={Comment}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ size, focused, color }) => (
            <COMMENT width={26} height={26} />
          ),
        }}
      />
      <Tab.Screen
        name="shopping_cart"
        component={Cart}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ size, focused, color }) => <CART width={26} height={26} opacity={0.4} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
