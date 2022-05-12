import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';
import SignInContainer from './SignInContainer';

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn, result] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
    } catch (e) {
      console.error(e);
    }
  };

  if (!result.loading && result.called) {
    try {
      if (result.data.authenticate.accessToken) {
        // TODO: Causes warning 'Cannot update a component MemoryRouter...'
        navigate('/', { replace: true });
      }
    } catch (e) {
      console.error('Authentication failed:', e);
    }
  }

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
