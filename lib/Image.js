import React from 'react';

let FastImage = require('react-native').Image;

try {
  const Image = require('react-native-fast-image');
  if (Image) {
    FastImage = Image;
  }
} catch (e) {}

export default ({ size = 48, src, style, ...props }) => {
  const localStyles = !style ? { height: size, width: size } : {};
  return (
    <FastImage
      style={{ ...localStyles, resizeMode: 'contain', ...style }}
      source={src}
      {...props}
    />
  );
};
