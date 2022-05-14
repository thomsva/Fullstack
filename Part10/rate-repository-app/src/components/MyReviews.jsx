import { useQuery } from '@apollo/client';
import { FlatList, StyleSheet, View } from 'react-native';
import { GET_OWN_REVIEWS } from '../graphql/queries';
import ReviewItem from './ReviewItem';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, error, loading, refetch } = useQuery(GET_OWN_REVIEWS, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>Error</Text>;

  const reviewNodes = data.me.reviews.edges;
  // const reviewNodes = data.me.reviews.edges.map((edge) => edge.node);
  console.log(reviewNodes);
  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <ReviewItem review={item.node} showButtons={true} refetch={refetch} />
      )}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ node }) => node.id}
    />
  );
};

export default MyReviews;
