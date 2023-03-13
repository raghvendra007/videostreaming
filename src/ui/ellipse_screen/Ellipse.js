import React, {useState, useRef} from 'react';
import Video from 'react-native-video';
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';

const Ellipse =()=>{
    return(
        <View style={{display:"flex",backgroundColor:"blue",position:"absolute"}}>
        <Text style={{color:"red",fontSize:24,position:"absolute",top:400,marginLeft:150}}>Ellipse</Text>
    </View>
    )
}

export default Ellipse;