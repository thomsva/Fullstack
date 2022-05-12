import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import Text from './Text';

const Repository = () => {
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>Error</Text>;

  // return <Text>Success {id}</Text>;
  return <RepositoryItem item={data.repository} showLink={true} />;
};

export default Repository;
