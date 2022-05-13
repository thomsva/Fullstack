import { View, Pressable, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import { Link } from 'react-router-native';
import useUserSignedIn from '../hooks/useUserSignedIn';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.palette.primary,
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    flexWrap: 'nowrap',
    display: 'flex',
    height: 80,
    alignItems: 'flex-end',
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
    padding: 8,
  },
  itemLarge: {
    flexGrow: 1,
    padding: 8,
  },
});

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const clickSignOut = async () => {
    try {
      console.log('try logout');
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
    } catch (e) {
      console.error(e);
    }
  };

  const { me } = useUserSignedIn();

  return (
    <View style={styles.container}>
      <ScrollView horisontal style={styles.scrollHorisontal}>
        <View style={styles.tabsContainer}>
          <Link
            to="/"
            style={styles.itemLarge}
            text="Repositories"
            component={View}
          >
            <Text fontSize="button" fontWeight="bold" color="light">
              Repositories
            </Text>
          </Link>
          {!me && (
            <>
              <Link to="/signin" style={styles.itemLarge} component={View}>
                <Text fontSize="button" fontWeight="bold" color="light">
                  Sign in
                </Text>
              </Link>
              <Link to="/signup" style={styles.itemLarge} component={View}>
                <Text fontSize="button" fontWeight="bold" color="light">
                  Sign up
                </Text>
              </Link>
            </>
          )}
          {me && (
            <>
              <Link to="/review" style={styles.itemLarge} component={View}>
                <Text fontSize="button" fontWeight="bold" color="light">
                  Create a review
                </Text>
              </Link>
              <Pressable
                onPress={clickSignOut}
                style={styles.itemLarge}
                component={View}
              >
                <Text fontSize="button" fontWeight="bold" color="light">
                  Sign out
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;
