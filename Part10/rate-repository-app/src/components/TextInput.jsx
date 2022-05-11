import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  error: {
    backgroundColor: theme.palette.error_light,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, error && styles.error];
  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
