import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import Button from './Button';
import { Formik } from 'formik';
import * as yup from 'yup';

const styles = StyleSheet.create({
  containerVertical: {
    flex: 1,
    backgroundColor: theme.palette.light,
    flexDirection: 'column',
    padding: 8,
    flexWrap: 'nowrap',
    height: 80,
    alignItems: 'stretch',
  },

  itemTextField: {
    justifyContent: 'center',
    padding: 12,
    backgroundColor: theme.palette.light,
    marginTop: 8,
    marginBottom: 8,
    borderColor: theme.palette.mainBackground,
    borderWidth: 2,
  },
  itemButton: {
    padding: 12,
    marginTop: 8,
    backgroundColor: theme.palette.primary,
    borderRadius: 8,
    alignSelf: 'stretch',
  },
  buttonText: {
    alignSelf: 'center',
  },
});

const initialValues = {
  ownerName: 'x',
  repositoryName: 'x',
  rating: '1',
  text: 'x',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().required('Not a valid number'),
  text: yup.string().required('Review is required'),
});

const AddReviewForm = ({ onSubmit }) => {
  // const onSubmit = (values) => {
  //   console.log('form subitted', values);
  // };

  return (
    <View style={styles.containerVertical}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <FormikTextInput
              name="ownerName"
              placeholder="Repository owner name"
              style={styles.itemTextField}
            />
            <FormikTextInput
              name="repositoryName"
              placeholder="Repository name"
              style={styles.itemTextField}
            />
            <FormikTextInput
              name="rating"
              placeholder="Rating between 0 and 100"
              style={styles.itemTextField}
            />
            <FormikTextInput
              name="text"
              placeholder="Review"
              style={styles.itemTextField}
            />
            <Pressable onPress={handleSubmit}>
              <Button text="Create review" />
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  );
};

export default AddReviewForm;
