import { useQuery } from '@apollo/client';
import { useState } from 'react';
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

  const [variables, setVariables] = useState({
    id,
    first: 3,
  });

  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  if (loading && reviewNodes === undefined) return <Text>Loading</Text>;
  if (error) return <Text>Error</Text>;

  const reviewNodes = data.repository.reviews.edges;

  const handleFetchMore = () => {
    console.log('Reached end, fetching more...');
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    setVariables({
      ...variables,
      after: data.repository.reviews.pageInfo.endCursor,
    });

    fetchMore({ variables });
  };

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ node }) => node.id}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.1}
      ListHeaderComponent={() => (
        <RepositoryItem item={data.repository} showLink={true} />
      )}
    />
  );
};

export default SingleRepository;
