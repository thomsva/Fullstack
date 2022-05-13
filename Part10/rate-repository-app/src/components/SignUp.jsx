import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';
import SignUpForm from './SignUpForm';
import useSignIn from '../hooks/useSignIn';

const SignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const user = {
      username: values.userName,
      password: values.password,
    };

    console.log('new user', user);

    try {
      const { data } = await mutate({
        variables: { user },
      });
      console.log(data);
      try {
        await signIn(user);
      } catch (e) {
        console.error('Error signing in', e);
      }
      navigate('/', { replace: true });
    } catch (e) {
      console.log('Create user result:', result);
      console.error(e);
    }
  };

  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;
