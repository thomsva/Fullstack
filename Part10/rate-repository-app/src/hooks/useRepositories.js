import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    returnPartialData: true
  });

  if (error) console.log('useRepositories error ', error);

  if (data) return { repositories: data.repositories, loading };
  return { loading }
};

export default useRepositories;





