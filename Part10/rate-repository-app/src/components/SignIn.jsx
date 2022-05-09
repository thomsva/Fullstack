import Text from './Text';
import { Pressable, View } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';

const initialValues = {
  username: 'x',
  password: 'x',
};

const SignInForm = ({ onSubmit }) => {

  return (
    <View>
      <FormikTextInput
        name='username'
        placeholder='User name'
      />
      <FormikTextInput
        name='password'
        placeholder='Password'
      />
      <Pressable onPress={onSubmit}>
        <Text>Submit</Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const onSubmit = values => console.log(values);

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;