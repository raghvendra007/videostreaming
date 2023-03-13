import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Styles from '../../../constants/styles';
import { Back } from '../../../constants/assets';

const CommentsScreen = ({ navigation }) => {
  return (
    <View style={Styles.mainContainer}>
      <View style={Styles.backButton}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Back width={20} height={20} />
        </TouchableOpacity>
      </View>
      <View style={Styles.commentScreen}>
        <Text style={{ color: 'red' }}>Comment screen</Text>
      </View>
    </View>
  );
};

export default CommentsScreen;
CommentsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};
