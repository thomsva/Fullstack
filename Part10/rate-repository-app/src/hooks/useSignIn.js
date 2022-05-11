import { useApolloClient, useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';


const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(SIGN_IN);
  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { credentials: { username, password } } });
    try {
      console.log('token', data.authenticate.accessToken)
      await authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();
      
    } catch (e) {
      console.error(e);
    }


  };
  
  return [signIn, result];
};

export default useSignIn