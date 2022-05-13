import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  if (error) console.log('useRepositories error ', error);

  if (data) return { repositories: data.repositories, loading };
  return { loading };
};

export default useRepositories;
