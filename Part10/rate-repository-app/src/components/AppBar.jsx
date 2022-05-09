import { Pressable, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.palette.primary,
    flexWrap: 'nowrap',
    height: 80,
    alignItems: 'center',
    padding: 8,
    
  },
  itemSmall: {
    flexGrow: 0,
    justifyContent: 'center',
    padding: 8,
  },
  itemLarge: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 8,
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <View style={styles.itemLarge}>
          <Text fontSize='tabheading' color='light'>Repositories</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default AppBar;


