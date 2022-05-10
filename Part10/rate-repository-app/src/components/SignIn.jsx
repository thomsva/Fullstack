import { useNavigate } from 'react-router-native';
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
  const navigate = useNavigate();
  const [signIn, result] = useSignIn();

  const onSubmit = async values => {
    const { username, password } = values;
    try {
      await signIn({ username, password })
    } catch (e) {
      console.error(e)
    }
  };

  if (!result.loading && result.called) {
    try {
      if (result.data.authenticate.accessToken) {
        // TODO: Causes warning Cannot update a component MemoryRouter...
        navigate('/', { replace: true });
      }
    } catch (e) {
      console.error('Authentication failed:', e);
    }
  } 


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