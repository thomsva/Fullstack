import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.palette.dark,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorLight: {
    color: theme.palette.light,
  },
  colorPrimary: {
    color: theme.palette.primary,
  },
  colorSecondary: {
    color: theme.palette.secondary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontSizeTabheading: {
    fontSize: theme.fontSizes.tabheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'primary' && styles.colorPrimary,
    color === 'secondary' && styles.colorSecondary,
    color === 'light' && styles.colorLight,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontSize === 'tabheading' && styles.fontSizeTabheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;