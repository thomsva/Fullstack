import { Image, StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  avatarImage: {
    marginTop: 8,
    flex: 0,
    width: 70,
    height: 70,
    resizeMode: 'cover',
    borderRadius: 8
  },
  containerHorisontal: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.palette.primary_light,
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    justifyContent: 'space-evenly',
    padding: 4,
  },
  containerVertical: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary_light,
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 8,
  },
  itemStat: {
    flexGrow: 0,
    padding: 4
  },
  itemLarge: {
    flex: 1,
    flexGrow: 2,
    flexWrap: 'nowrap',
    justifyContent: 'center',
  },
  language: {
    backgroundColor: theme.palette.secondary,
    padding: 8,
    color: theme.palette.light,
    borderRadius: 8,
    marginTop: 8,
    overflow: 'hidden'
  }
})

const toKilos = (number) => {
  if (number < 1000) return number;
  return Math.round(number / 1000 * 10) / 10 + 'k';
}

const RepositoryItem = ({ item }) => {
  console.log(item);
  const img = item.ownerAvatarUrl;
  console.log('img', img);
  return (
    <View> 
      <View style={styles.containerHorisontal}>
        <Image style={styles.avatarImage} source={{ uri: img }} />
        <View style={styles.itemLarge}>
          <View style={styles.containerVertical}>
            <View style={styles.itemLarge}>
              <Text fontSize='subheading' fontWeight='bold'>{item.id}</Text>
              <Text>{item.description}</Text>
            </View>
            <View style={styles.itemLarge}>
              <Text style={styles.language}>{item.language}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.containerHorisontal}>
        <View style={styles.itemStat}>
          <Text fontSize='subheading' fontWeight='bold'>{toKilos(item.stargazersCount)}</Text>
          <Text fontSize='subheading'>Stars</Text>
        </View>
        <View style={styles.itemStat}>
          <Text fontSize='subheading' fontWeight='bold'>{toKilos(item.forksCount)}</Text>
          <Text fontSize='subheading'>Forks</Text>
        </View>
        <View style={styles.itemStat}>
          <Text fontSize='subheading' fontWeight='bold'>{toKilos(item.reviewCount)}</Text>
          <Text fontSize='subheading'>Reviews</Text>
        </View>
        <View style={styles.itemStat}>
          <Text fontSize='subheading' fontWeight='bold'>{toKilos(item.ratingAverage)}</Text>
          <Text fontSize='subheading'>Rating</Text>
        </View>
      </View>
    </View>
  )
}

export default RepositoryItem