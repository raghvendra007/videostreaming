import React from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';
import COLORS from '../../../constants/colors';
import * as Fonts from '../../../constants/fonts';

const StyleInputText = ({
  placeholder,
  keyboardType = 'default',
  onChange,
  initialValue,
  handleBlur,
  length,
  secureTextEntry = 'false',
}) => {
  const mode = 'BodyRegular13';
  const modeResolver = () => {
    const textStyle = { ...Fonts[mode] };
    return textStyle;
  };
  return (
    <TextInput
      style={[{ paddingBottom: 10, paddingTop: 5 }, modeResolver()]}
      placeholder={placeholder}
      placeholderTextColor={COLORS.grey}
      color={COLORS.white}
      onChangeText={(text) => onChange(text)}
      onBlur={handleBlur}
      keyboardType={keyboardType}
      value={initialValue}
      maxLength={length}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default StyleInputText;
StyleInputText.propTypes = {
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
  onChange: PropTypes.func,
  initialValue: PropTypes.string,
  handleBlur: PropTypes.func,
  length: PropTypes.number,
  secureTextEntry: PropTypes.bool,
};
