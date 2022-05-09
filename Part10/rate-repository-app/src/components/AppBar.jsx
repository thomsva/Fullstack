import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import { Link } from 'react-router-native';


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
      <Link to='/' style={styles.itemLarge}>
        <Text fontSize='tabheading' color='light'>Repositories</Text>
      </Link>
      <Link to='/signIn' style={styles.itemLarge}>
        <Text fontSize='tabheading' color='light'>Sign in</Text>
      </Link>
    </View>
  );
};

export default AppBar;


