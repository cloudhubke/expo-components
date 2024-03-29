// just copy this code from the driving repo :)
import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Text } from 'react-native-ui-lib';
import { moderateScale } from 'react-native-size-matters';
import ThemeContext from '@expocraft/core/lib/theme/ThemeContext';

const android = Platform.OS === 'android';

const Typography: React.FC<{
  [x: string]: any;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  title?: boolean;
  subTitle?: boolean;
  header?: boolean;
  subHeader?: boolean;
  body?: boolean;
  caption?: boolean;
  small?: boolean;
  size?: number;
  transform?: boolean;
  button?: boolean;
  lines?: boolean;
  allowFontScaling?: boolean;
  // ?: boolean;styling
  regular?: boolean;
  bold?: boolean;
  normal?: boolean;
  semibold?: boolean;
  medium?: boolean;
  weight?: any;
  light?: boolean;
  center?: boolean;
  right?: boolean;
  spacing?: string; // letter-spacing
  lineHeight?: number; // line-height
  noWrap?: boolean;
  fullWidth?: boolean;
  // ?: boolean;colors
  color?: boolean;
  accent?: boolean;
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  black?: boolean;
  white?: boolean;
  gray?: boolean;
  gray2?: boolean;
  dark?: boolean;
  mistyWhite?: boolean;
  milkyWhite?: boolean;
  error?: boolean;
  clear?: boolean;
  facebook?: boolean;
  transparent?: boolean;
  silver?: boolean;
  steel?: boolean;
  ricePaper?: boolean;
  frost?: boolean;
  cloud?: boolean;
  windowTint?: boolean;
  panther?: boolean;
  charcoal?: boolean;
  coal?: boolean;
  bloodOrange?: boolean;
  snow?: boolean;
  ember?: boolean;
  fire?: boolean;
  drawer?: boolean;
  eggplant?: boolean;
  twitterColor?: boolean;
  facebookColor?: boolean;
  googleColor?: boolean;
  linkedinColor?: boolean;
  pinterestColor?: boolean;
  youtubeColor?: boolean;
  tumblrColor?: boolean;
  behanceColor?: boolean;
  dribbbleColor?: boolean;
  redditColor?: boolean;
  instagramColor?: boolean;
  success?: boolean;
  info?: boolean;
  rose?: boolean;
  warning?: boolean;
  danger?: boolean;
  style?: any;
  cropped?: boolean;
  children?: any;
}> = ({
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  title,
  subTitle,
  header,
  subHeader,
  body,
  caption,
  small,
  size,
  transform,
  button,
  lines,
  allowFontScaling,
  // styling
  regular,
  bold,
  normal,
  semibold,
  medium,
  weight,
  light,
  center,
  right,
  spacing, // letter-spacing
  lineHeight, // line-height
  noWrap,
  fullWidth,
  // colors
  color,
  accent,
  primary,
  secondary,
  tertiary,
  black,
  white,
  gray,
  gray2,
  dark,
  mistyWhite,
  milkyWhite,
  error,
  clear,
  facebook,
  transparent,
  silver,
  steel,
  ricePaper,
  frost,
  cloud,
  windowTint,
  panther,
  charcoal,
  coal,
  bloodOrange,
  snow,
  ember,
  fire,
  drawer,
  eggplant,
  twitterColor,
  facebookColor,
  googleColor,
  linkedinColor,
  pinterestColor,
  youtubeColor,
  tumblrColor,
  behanceColor,
  dribbbleColor,
  redditColor,
  instagramColor,
  success,
  info,
  rose,
  warning,
  danger,
  style,
  cropped,
  children,
  ...props
}) => {
  const { colors, fonts }: any = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    // default style
    text: {
      ...fonts.default,
    },
    // other variations
    regular: {
      fontWeight: 'normal',
    },
    bold: fonts.bold,

    semibold: {
      ...fonts.semibold,
    },
    medium: {
      fontWeight: '500',
    },
    light: fonts.light,
    normal: fonts.normal,
    thin: {
      fontWeight: '100',
    },
    // position
    center: { textAlign: 'center' },
    right: { textAlign: 'right' },
    // colors
    accent: { color: colors.accent },
    primary: { color: colors.primary },
    secondary: { color: colors.secondary },
    tertiary: { color: colors.tertiary },
    black: { color: colors.black },
    white: { color: colors.white },
    gray: { color: colors.gray },
    gray2: { color: colors.gray2 },
    dark: { color: colors.dark },
    mistyWhite: { color: colors.mistyWhite },
    milkyWhite: { color: colors.milkyWhite },
    error: { color: colors.error },
    clear: { color: colors.clear },
    facebook: { color: colors.facebook },
    transparent: { color: colors.transparent },
    silver: { color: colors.silver },
    steel: { color: colors.steel },
    ricePaper: { color: colors.ricePaper },
    frost: { color: colors.frost },
    cloud: { color: colors.cloud },
    windowTint: { color: colors.windowTint },
    panther: { color: colors.panther },
    charcoal: { color: colors.charcoal },
    coal: { color: colors.coal },
    bloodOrange: { color: colors.bloodOrange },
    snow: { color: colors.snow },
    ember: { color: colors.ember },
    fire: { color: colors.fire },
    drawer: { color: colors.drawer },
    eggplant: { color: colors.eggplant },
    twitterColor: { color: colors.twitterColor },
    facebookColor: { color: colors.facebookColor },
    googleColor: { color: colors.googleColor },
    linkedinColor: { color: colors.linkedinColor },
    pinterestColor: { color: colors.pinterestColor },
    youtubeColor: { color: colors.youtubeColor },
    tumblrColor: { color: colors.tumblrColor },
    behanceColor: { color: colors.behanceColor },
    dribbbleColor: { color: colors.dribbbleColor },
    redditColor: { color: colors.redditColor },
    instagramColor: { color: colors.instagramColor },
    success: { color: colors.success },
    info: { color: colors.info },
    rose: { color: colors.rose },
    warning: { color: colors.warning },
    danger: { color: colors.danger },
    // fonts
    h1: fonts.h1,
    h2: fonts.h2,
    h3: fonts.h3,
    h4: fonts.h4,
    h5: fonts.h5,
    h6: fonts.h6,
    title: fonts.title,
    subTitle: fonts.subTitle,

    header: fonts.header,
    subHeader: fonts.subHeader,

    body: { ...fonts.body },
    caption: fonts.caption,
    small: fonts.small,
    button: fonts.button,
  });

  const textStyles = [
    styles.text,
    h1 && styles.h1,
    h2 && styles.h2,
    h3 && styles.h3,
    h4 && styles.h4,
    h5 && styles.h5,
    h6 && styles.h6,
    title && styles.title,
    subTitle && styles.subTitle,
    header && styles.header,
    subHeader && styles.subHeader,
    body && styles.body,
    caption && styles.caption,
    small && styles.small,
    size && {
      fontSize: moderateScale(size),
      lineHeight: moderateScale(size) * 1.5,
    },
    button && styles.button,
    transform && { textTransform: transform },
    lineHeight && { lineHeight },
    noWrap && {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    fullWidth && { width: '100%' },
    spacing && { letterSpacing: spacing },
    weight && { fontWeight: weight },
    regular && styles.regular,
    bold && styles.bold,
    semibold && styles.semibold,
    medium && styles.medium,
    light && styles.light,
    normal && styles.normal,
    center && styles.center,
    right && styles.right,
    color && styles[color],
    color && !styles[color] && { color },
    // color shortcuts
    accent && styles.accent,
    primary && styles.primary,
    secondary && styles.secondary,
    tertiary && styles.tertiary,
    black && styles.black,
    white && styles.white,
    gray && styles.gray,
    gray2 && styles.gray2,
    dark && styles.dark,
    error && styles.error,
    mistyWhite && styles.mistyWhite,
    milkyWhite && styles.milkyWhite,
    clear && styles.clear,
    facebook && styles.facebook,
    transparent && styles.transparent,
    silver && styles.silver,
    steel && styles.steel,
    error && styles.error,
    ricePaper && styles.ricePaper,
    frost && styles.frost,
    cloud && styles.cloud,
    windowTint && styles.windowTint,
    panther && styles.panther,
    charcoal && styles.charcoal,
    coal && styles.coal,
    bloodOrange && styles.bloodOrange,
    snow && styles.snow,
    ember && styles.ember,
    fire && styles.fire,
    drawer && styles.drawer,
    eggplant && styles.eggplant,
    twitterColor && styles.twitterColor,
    facebookColor && styles.facebookColor,
    googleColor && styles.googleColor,
    linkedinColor && styles.linkedinColor,
    pinterestColor && styles.pinterestColor,
    youtubeColor && styles.youtubeColor,
    tumblrColor && styles.tumblrColor,
    behanceColor && styles.behanceColor,
    dribbbleColor && styles.dribbbleColor,
    redditColor && styles.redditColor,
    instagramColor && styles.instagramColor,
    success && styles.success,
    info && styles.info,
    rose && styles.rose,
    warning && styles.warning,
    danger && styles.danger,
    style, // rewrite predefined styles
  ].filter((t) => !!t);

  if (cropped || button) {
    return (
      <Text
        allowFontScaling={allowFontScaling}
        style={[textStyles]}
        numberOfLines={lines}
        {...props}
      >
        {children}
      </Text>
    );
  }

  return (
    <Text
      allowFontScaling={allowFontScaling}
      style={textStyles}
      numberOfLines={lines}
      {...props}
    >
      {children}
    </Text>
  );
};

export default Typography;
