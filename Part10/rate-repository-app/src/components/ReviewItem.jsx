import Text from './Text';

const ReviewItem = ({ review }) => {
  console.log('temm', review);
  return <Text>{review.text}</Text>;
};

export default ReviewItem;
