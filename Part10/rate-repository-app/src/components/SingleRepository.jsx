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

  const variables = {
    id,
    first: 3,
  };

  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const repository = data?.repository;

  if (error) return <Text>Error</Text>;

  const reviewNodes = repository
    ? repository.reviews.edges.map(({ node }) => node)
    : [];

  const handleFetchMore = () => {
    console.log('Reached end, fetching more...');
    const canFetchMore = !loading && repository?.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        ...variables,
        after: repository.reviews.pageInfo.endCursor,
      },
    });
  };

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.1}
      ListHeaderComponent={() =>
        repository ? <RepositoryItem item={repository} showLink={true} /> : null
      }
    />
  );
};

export default SingleRepository;
