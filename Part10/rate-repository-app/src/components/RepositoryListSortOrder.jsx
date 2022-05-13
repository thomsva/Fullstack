import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import theme from '../theme';
import Button from './Button';
import Text from './Text';
import {} from 'react-native-web';

const styles = StyleSheet.create({
  itemTextField: {
    padding: 8,
    backgroundColor: theme.palette.light,
    borderColor: theme.palette.mainBackground,
    alignContent: 'flex-start',
  },

  text: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
  selected: {
    backgroundColor: theme.palette.secondary,
  },
});

const SortOrderForm = ({ setSortOrder }) => {
  const [selection, setSelection] = useState('latest');

  useEffect(() => {
    switch (selection) {
      case 'latest':
        setSortOrder({ orderBy: 'CREATED_AT', orderDirection: 'DESC' });
        break;
      case 'highest':
        setSortOrder({ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' });
        break;
      case 'lowest':
        setSortOrder({ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' });
    }
  }, [selection]);

  return (
    <View>
      <Pressable onPress={() => setSelection('latest')}>
        <Text
          style={[
            styles.itemTextField,
            selection === 'latest' ? styles.selected : styles.notSelected,
          ]}
        >
          Latest repositories
        </Text>
      </Pressable>
      <Pressable onPress={() => setSelection('highest')}>
        <Text
          style={[
            styles.itemTextField,
            selection === 'highest' ? styles.selected : styles.notSelected,
          ]}
        >
          Highest rated repositories
        </Text>
      </Pressable>
      <Pressable onPress={() => setSelection('lowest')}>
        <Text
          style={[
            styles.itemTextField,
            selection === 'lowest' ? styles.selected : styles.notSelected,
          ]}
        >
          Lowest rated repositories
        </Text>
      </Pressable>
    </View>
  );
};

const RepositoryListSortOrder = ({ setSortOrder }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.itemTextField} visible>
      {visible && <SortOrderForm setSortOrder={setSortOrder} />}

      <Pressable onPress={() => setVisible(!visible)}>
        <Button text="Show / hide sort order" />
      </Pressable>
    </View>
  );
};

export default RepositoryListSortOrder;
