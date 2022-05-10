// import { useState, useEffect  } from 'react';

// const useRepositories = () => {
//   const [repositories, setRepositories] = useState();
//   const [loading, setLoading] = useState(false);

//   const fetchRepositories = async () => {
//     setLoading(true);

//     // Replace the IP address part with your own IP address!
//     const response = await fetch('http://192.168.1.33:5000/api/repositories');
//     const json = await response.json();

//     setLoading(false);
//     setRepositories(json);
//   };

//   useEffect(() => {
//     fetchRepositories();
//   }, []);
//   return { repositories, loading, refetch: fetchRepositories };
// };

// export default useRepositories;


import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, error, loading} = useQuery(GET_REPOSITORIES);

  if (error) console.log('useRepositories error ', error);

  if (data) return { repositories: data.repositories, loading };
  return { loading }
};

export default useRepositories;





