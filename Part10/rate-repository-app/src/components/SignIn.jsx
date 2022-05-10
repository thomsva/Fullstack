import { Formik } from 'formik';
import SignInForm from './SignInForm';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username missing'),
  password: yup
    .string()
    .required('Password required'),
});

const SignIn = () => {
  const [signIn, result] = useSignIn();

  const onSubmit = async values => {
    const { username, password } = values;
    try {
      await signIn({ username, password })
    } catch (e) {
      console.error(e)
    }
  };

  // Result will contain token if credentials are ok
  if (!result.loading) console.log('result:', result)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;