import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import Button from './Button';
import { Formik } from 'formik';
import * as yup from 'yup';

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

const initialValues = {
  userName: '',
  password: '',
  confirm: '',
};

const validationSchema = yup.object().shape({
  userName: yup
    .string()
    .required('Username is required')
    .max(30, 'Username too long'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password too short')
    .max(50, 'Password too long'),
  confirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords need to match')
    .required('Password confirmation is required'),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.containerVertical}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <FormikTextInput
              name="userName"
              placeholder="Username"
              style={styles.itemTextField}
            />
            <FormikTextInput
              name="password"
              placeholder="Password "
              style={styles.itemTextField}
            />
            <FormikTextInput
              name="confirm"
              placeholder="Password confirmation"
              style={styles.itemTextField}
              secureTextEntry
            />
            <Pressable onPress={handleSubmit}>
              <Button text="Sign up" />
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignUpForm;
