import { Alert, Pressable, StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { format } from 'date-fns';
import Button from './Button';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

// format(new Date(2014, 1, 11), 'yyyy-MM-dd');

const styles = StyleSheet.create({
  roundItem: {
    marginTop: 8,
    marginRight: 8,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
    minHeight: 60,
    resizeMode: 'cover',
    borderRadius: 30,
    borderWidth: 3,
    borderColor: theme.palette.primary,
  },
  containerHorisontal: {
    flexDirection: 'row',
    backgroundColor: theme.palette.light,
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    justifyContent: 'space-evenly',
    padding: 4,
  },
  containerVertical: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.palette.light,
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 8,
  },
  item: {
    flexGrow: 2,
    flexWrap: 'nowrap',
    justifyContent: 'center',
  },
  date: {
    flexGrow: 2,
    flexWrap: 'nowrap',
    justifyContent: 'center',
    marginBottom: 8,
  },
});

const ReviewItem = ({ review, showButtons, refetch }) => {
  const navigate = useNavigate();
  const [mutate] = useMutation(DELETE_REVIEW);

  const onPressDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Delete', onPress: () => deleteItem() },
      ]
    );
  };

  const deleteItem = async () => {
    try {
      await mutate({
        variables: { deleteReviewId: review.id },
      });
      await refetch();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View>
      <View style={styles.containerHorisontal}>
        <View style={styles.roundItem}>
          <Text fontSize="button" color="primary" weight="bold">
            {review.rating}
          </Text>
        </View>

        <View style={styles.containerVertical}>
          <View style={styles.item}>
            <Text fontSize="heading" fontWeight="bold">
              {showButtons && review.repository.fullName}
              {!showButtons && review.user.username}
            </Text>
          </View>
          <View style={styles.date}>
            <Text color="dull">
              {format(new Date(review.createdAt), 'd.M.yyyy')}
            </Text>
          </View>
          <View style={styles.item}>
            <Text>{review.text}</Text>
          </View>
        </View>
      </View>

      {showButtons && (
        <View style={styles.containerHorisontal}>
          <Pressable
            onPress={() => navigate('/repository/' + review.repositoryId)}
          >
            <Button text="View repository" />
          </Pressable>
          <Pressable onPress={() => onPressDelete()}>
            <Button color="secondary" text="Delete review" />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
