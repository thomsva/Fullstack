import Text from './Text';
import theme from '../theme';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  itemButton: {
    padding: 12,
    marginTop: 8,
    backgroundColor: theme.palette.primary,
    borderRadius: 8,
    alignSelf: 'stretch',
  },
  buttonText: {
    alignSelf: 'center',
  },
  colorLight: {
    backgroundColor: theme.palette.light,
  },
  colorPrimary: {
    backgroundColor: theme.palette.primary,
  },
  colorDull: {
    backgroundColor: theme.palette.dull,
  },
  colorPrimaryLight: {
    backgroundColor: theme.palette.primary_light,
  },
  colorSecondary: {
    backgroundColor: theme.palette.secondary,
  },
});

const Button = ({ color, style, text }) => {
  const buttonStyle = [
    styles.itemButton,
    color === 'primary' && styles.colorPrimary,
    color === 'dull' && styles.colorDull,
    color === 'primaryLight' && styles.colorPrimaryLight,
    color === 'secondary' && styles.colorSecondary,
    color === 'light' && styles.colorLight,
    style,
  ];

  return (
    <View style={buttonStyle}>
      <Text
        fontSize="button"
        fontWeight="bold"
        color="light"
        style={styles.buttonText}
      >
        {text}
      </Text>
    </View>
  );
};

export default Button;
