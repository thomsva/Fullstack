import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme'

const styles = StyleSheet.create({
  main: {
    backgroundColor: theme.palette.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.main}>
      <AppBar />
      <RepositoryList />
    </View>
  );
};

export default Main;