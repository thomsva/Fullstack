import { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';
import RepositoryListSortOrder from './RepositoryListSortOrder';
import { useDebounce } from 'use-debounce';
import Text from './Text';

const RepositoryList = () => {
  const [text, setText] = useState('');
  const [debouncedText] = useDebounce(text, 500);

  const [variables, setVariables] = useState({
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
    searchKeyword: text,
    first: 20,
  });

  const { repositories, fetchMore } = useRepositories(variables);

  const setSortOrder = (sortOrder) => {
    const { orderBy, orderDirection } = sortOrder;
    setVariables({ ...variables, orderBy, orderDirection });
  };

  useEffect(() => {
    setVariables({ ...variables, searchKeyword: debouncedText });
  }, [debouncedText]);

  const onEndReached = () => {
    console.log('You have reached the end of the list');
    fetchMore();
  };

  return (
    <>
      <RepositoryListSortOrder setSortOrder={setSortOrder} />
      <Text>Filter:</Text>
      <TextInput onChangeText={setText} value={text} />
      <RepositoryListContainer
        repositories={repositories}
        onEndReached={onEndReached}
      />
    </>
  );
};

export default RepositoryList;
