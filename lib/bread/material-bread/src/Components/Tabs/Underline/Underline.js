import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Animated } from 'react-native';
import withTheme from '../../../Theme/withTheme';
import styles from './Undrline.styles';

class Underline extends Component {
  static propTypes = {
    color: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.number,
      PropTypes.object
    ]),
    tabWidth: PropTypes.number
  };

  render() {
    const { tabWidth, color, value } = this.props;

    return (
      <Animated.View
        style={[
          styles.underline,
          {
            width: tabWidth,
            backgroundColor: color,
            transform: [{ translateX: value }]
          }
        ]}
      />
    );
  }
}

export default withTheme(Underline);
