import { View } from 'react-native';
import Text from './Text';

const RepositoryItem = ({ item }) => {
  console.log(item)
  return (
    <View>
      <Text fontSize='subheading' fontWeight='bold'>Full name: {item.id}</Text>
      <Text>Description: {item.fullName}</Text>
      <Text>Language: {item.description}</Text>
      <Text>Stars: {item.stargazersCount}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Reviews: {item.reviewCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text>
    </View>
  )
}

export default RepositoryItem