import { useState } from 'react';
import useRepositories from '../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';
import RepositoryListSortOrder from './RepositoryListSortOrder';

const RepositoryList = () => {
  const [sortOrder, setSortOrder] = useState({
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
  });

  const { repositories } = useRepositories(sortOrder);

  return (
    <>
      <RepositoryListSortOrder setSortOrder={setSortOrder} />
      <RepositoryListContainer repositories={repositories} />
    </>
  );
};

export default RepositoryList;
