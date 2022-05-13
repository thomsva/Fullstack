import { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';
import RepositoryListSortOrder from './RepositoryListSortOrder';
import { useDebounce } from 'use-debounce';
import Text from './Text';

const RepositoryList = () => {
  const [text, setText] = useState('');
  const [deouncedText] = useDebounce(text, 500);

  const [variables, setVariables] = useState({
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
    searchKeyword: text,
  });

  const { repositories } = useRepositories(variables);

  const setSortOrder = (sortOrder) => {
    const { orderBy, orderDirection } = sortOrder;
    setVariables({ ...variables, orderBy, orderDirection });
  };

  useEffect(() => {
    setVariables({ ...variables, searchKeyword: deouncedText });
  }, [deouncedText]);
  return (
    <>
      <RepositoryListSortOrder setSortOrder={setSortOrder} />
      <Text>Filter:</Text>
      <TextInput onChangeText={setText} value={text} />
      <RepositoryListContainer repositories={repositories} />
    </>
  );
};

export default RepositoryList;
