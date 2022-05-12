import { useQuery } from '@apollo/client';
import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>Error</Text>;

  //const reviewNodes = data.repository.reviews.edges.map((edge) => edge.node);
  const reviewNodes = data.repository.reviews.edges;

  console.log('rn', reviewNodes);

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <RepositoryItem item={data.repository} showLink={true} />
      )}
    />
  );
};

export default SingleRepository;
