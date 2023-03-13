import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Styles from '../../../constants/styles';
import { Back } from '../../../constants/assets';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={Styles.mainContainer}>
      <View style={Styles.backButton}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Back width={25} height={25} />
        </TouchableOpacity>
      </View>
      <View style={Styles.commentScreen}>
        <Text style={{ color: 'red' }}>profile screen</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
ProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};
