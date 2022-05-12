import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import Button from './Button';

const styles = StyleSheet.create({
  containerVertical: {
    flex: 1,
    backgroundColor: theme.palette.light,
    flexDirection: 'column',
    padding: 8,
    flexWrap: 'nowrap',
    height: 80,
    alignItems: 'stretch',
  },

  itemTextField: {
    justifyContent: 'center',
    padding: 12,
    backgroundColor: theme.palette.light,
    marginTop: 8,
    marginBottom: 8,
    borderColor: theme.palette.mainBackground,
    borderWidth: 2,
  },
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

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.containerVertical}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        style={styles.itemTextField}
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        style={styles.itemTextField}
        secureTextEntry
      />
      <Pressable onPress={onSubmit}>
        <Button text="Sign in" />
      </Pressable>
    </View>
  );
};

export default SignInForm;
