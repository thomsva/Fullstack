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
});

const Button = ({ text }) => {
  return (
    <View style={styles.itemButton}>
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
