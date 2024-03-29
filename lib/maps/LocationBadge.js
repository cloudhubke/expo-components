import React, { useState } from 'react';
import Badge from '../Badge';
import hexToRgb from '../theme/hextToRgb';
import ThemeContext from '../theme/ThemeContext';

const LocationBadge = ({ style }) => {
  const { colors } = React.useContext(ThemeContext);
  const [] = useState(0);

  return (
    <Badge
      style={{
        backgroundColor: `rgba(${hexToRgb(colors.primary)}, 0.3)`,
        ...style,
      }}
      size={28}
    >
      <Badge
        style={{
          backgroundColor: colors.primary,
          borderWidth: 2,
          borderColor: colors.milkyWhite,
          zIndex: 1,
        }}
        size={15}
      />
    </Badge>
  );
};

export default LocationBadge;
