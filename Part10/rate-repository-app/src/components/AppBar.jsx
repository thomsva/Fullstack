import { View, StyleSheet, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.palette.primary,
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    flexWrap: 'nowrap',
    display: 'flex',
    height: 80,
    alignItems: 'flex-end'
  },
  scrollHorisontal: {
    flexDirection: 'row',
  },
  tabsContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  itemSmall: {
    flexGrow: 1,
    padding: 8
  },
  itemLarge: {
    flexGrow: 1,
    padding: 8
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
    <ScrollView horisontal style={styles.scrollHorisontal}>
      <View style={styles.tabsContainer}>
        <Link to='/' style={styles.itemLarge} text='Repositories' component={View}>
          <Text fontSize='tabheading' fontWeight='bold' color='light'>Repositories</Text>
        </Link>
        <Link to='/signIn' style={styles.itemLarge} component={View}>
          <Text fontSize='tabheading' fontWeight='bold' color='light'>Sign in</Text>
        </Link>
      </View>
    </ScrollView>
    </View>
  
  );
};

export default AppBar;
