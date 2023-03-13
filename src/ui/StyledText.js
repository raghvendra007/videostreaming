/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextProps, Text } from 'react-native';
import PropTypes from 'prop-types';

// Utils
import * as Fonts from '../../../constants/fonts';
import COLORS from '../../../constants/colors';

const StyledText = (props) => {
  const { mode = 'BodyRegular13', children, style, color = 'white', ...restOfProps } = props;

  const modeResolver = () => {
    const textStyle = { ...Fonts[mode] };
    return textStyle;
  };

  return (
    <Text {...restOfProps} style={[style, { color: COLORS[color] }, modeResolver()]}>
      {children}
    </Text>
  );
};

export default StyledText;
StyledText.propTypes = {
  children: TextProps,
  style: TextProps,
  color: PropTypes.oneOf([
    'white',
    'black',
    'charcoal',
    'grey',
    'greyBackground',
    'offWhite',
    'green',
  ]),
  mode: PropTypes.string.isRequired,
};
