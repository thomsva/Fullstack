import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';

import AddReviewForm from './AddReviewForm';

const AddReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const review = {
      ownerName: values.ownerName,
      repositoryName: values.repositoryName,
      rating: parseInt(values.rating),
      text: values.text,
    };

    try {
      const { data } = await mutate({
        variables: { review: review },
      });
      const destination = data.createReview.repositoryId;
      navigate('/repository/' + destination, { replace: true });
    } catch (e) {
      console.log('Create review result:', result);
      console.error(e);
    }
  };

  return <AddReviewForm onSubmit={onSubmit} />;
};

export default AddReview;
