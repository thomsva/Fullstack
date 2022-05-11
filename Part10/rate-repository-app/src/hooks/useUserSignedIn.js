import { useQuery } from '@apollo/client';

import { GET_USER_SIGNED_IN } from '../graphql/queries';

const useUserSignedIn = () => {
  const { data, error, loading , ...result} = useQuery(GET_USER_SIGNED_IN, {
    fetchPolicy: 'cache-and-network',
    returnPartialData: true
  });

  if (error) console.log('useUserSignedIn error ', error);
  console.log('result', result)

  if (data) return { me: data.me };
  return { me: false, loading}
};

export default useUserSignedIn;

