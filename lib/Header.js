import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { verticalScale } from 'react-native-size-matters';
import ThemeContext from './theme/ThemeContext';
import Block from './Block';
import StatusBar from './StatusBar';

const Header: React.FC<{
  onBack: () => any,
  onClose: () => any,
  leftComponent: React.ReactNode,
  middleComponent: React.ReactNode,
  rightComponent: React.ReactNode,
  titlecenter: any,
  color: any,
  style: any,
  children: any,
  height: number,
  shadow: boolean,
  hasHeight: boolean,
  dark: boolean,
  light: boolean,
  borderBottom: boolean,
}> = ({
  onBack = () => null,
  onClose = () => null,
  leftComponent,
  middleComponent,
  rightComponent: RightComponent,
  titlecenter,
  color,
  style,
  children,
  height,
  shadow,
  hasHeight = false,
  dark,
  light,
  borderBottom,
  ...props
}) => {
  const { colors, sizes } = React.useContext(ThemeContext);
  const goBack = () => {
    onBack();
    onClose();
  };

  const renderLeft = () => (
    <Block flex={false} style={{ paddingRight: sizes.base }} middle>
      {typeof leftComponent === 'function'
        ? leftComponent()
        : leftComponent || (
            <TouchableOpacity onPress={goBack}>
              <Ionicons name="md-arrow-back" size={32} color="black" />
            </TouchableOpacity>
          )}
    </Block>
  );

  const renderMiddle = () => (
    <Block
      style={{ paddingHorizontal: sizes.base, position: 'relative' }}
      center={Boolean(titlecenter)}
      middle
    >
      {typeof middleComponent === 'function' ? middleComponent() : children}
    </Block>
  );

  const renderRight = () => (
    <Block flex={false} style={{ paddingLeft: sizes.base }} middle>
      {typeof RightComponent === 'function' ? RightComponent() : RightComponent}
    </Block>
  );

  const headerStyles = [
    height && {
      minHeight: height,
      paddingTop: verticalScale(5),
      paddingBottom: verticalScale(5),
    },

    borderBottom && {
      borderBottomColor: colors.gray2,
      borderBottomWidth: 0.5,
    },
    Array.isArray(style) ? [...style] : style,
  ];

  return (
    <View
      style={{
        backgroundColor: color,
        baddingBottom: sizes.padding,
      }}
    >
      <StatusBar
        light={light}
        dark={dark}
        hasHeight={hasHeight}
        color={color}
      />

      <Block
        row
        middle
        flex={false}
        style={headerStyles}
        padding={[0, sizes.padding, sizes.padding / 2, sizes.padding]}
        {...props}
      >
        {renderLeft()}
        {renderMiddle()}
        {renderRight()}
      </Block>
    </View>
  );
};

export default Header;
