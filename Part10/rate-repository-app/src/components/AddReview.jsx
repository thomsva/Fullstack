import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

import AddReviewForm from './AddReviewForm';

const AddReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const onSubmit = async (values) => {
    // const { ownerName, repositoryName, rating, text } = values;
    const review = {
      ownerName: values.ownerName,
      repositoryName: values.repositoryName,
      rating: parseInt(values.rating),
      text: values.text,
    };

    try {
      console.log('values for query', review);
      const { data } = await mutate({
        variables: { review },
      });
      console.log('d', data);
    } catch (e) {
      console.log(e);
    }
  };

  console.log('r', result);
  return <AddReviewForm onSubmit={onSubmit} />;
};

export default AddReview;
