import { iMeal } from '@/interfaces/meal.interface';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListRenderItemInfo,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  StatusBar,
} from 'react-native';

import api from '@/service';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecipeCard from '@/components/recipeCard';
import { RecipeHooks } from '@/hooks';
import { useRecipes } from '@/hooks/recipe';

export default function Home() {
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [skip, setSkip] = useState(0);
  const [take] = useState(3);

  const [isLoading, setIsLoading] = useState(false);
  const [shouldTakeMore, setShouldTakeMore] = useState(true);

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearch(searchTerm);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    getRecipes(true);
  }, [search]);

  const getRecipes = async (reset = false) => {
    if (isLoading || (!shouldTakeMore && !reset)) return;

    setIsLoading(true);

    const result = await RecipeHooks.findMany({
      skip: reset ? 0 : skip,
      take,
      search: search,
    });

    if (result) {
      if (reset) {
        setRecipes(result.records), setSkip(3);
      } else {
        setRecipes((prev) =>
          skip == 0 ? result.records : [...prev, ...result.records],
        );

        setSkip((prev) => prev + take);

        if (result.records.length < take) setShouldTakeMore(false);
      }
    }

    setIsLoading(false);
  };

  const RenderItem = ({ item }: ListRenderItemInfo<iMeal>) => {
    return <RecipeCard item={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor={'transparent'}
      />
      <Text style={styles.heading}>Welcome to CookFinder</Text>

      {isLoading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <>
          <TextInput
            placeholder="search..."
            placeholderTextColor={'#b8b8b8'}
            onChangeText={(value) => setSearchTerm(value)}
            value={searchTerm}
            style={styles.searchInput}
          />

          <FlatList
            onEndReached={() => {
              getRecipes();
            }}
            onEndReachedThreshold={0.3}
            data={recipes || []}
            keyExtractor={(item: iMeal) => item.id}
            renderItem={RenderItem}
            style={styles.flatlist}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.textEmptyList}>No recipes found</Text>
            }
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#e2e2e2e2',

    alignItems: 'center',
  },
  loading: {
    marginTop: 50,
  },
  heading: {
    paddingTop: 25,
    fontSize: 24,
    fontWeight: 'bold',
  },
  flatlist: {
    marginTop: 15,
    width: '100%',
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#b8b8b8',
    width: '100%',
    marginTop: 30,
    marginBottom: 10,
  },

  card: {
    flexDirection: 'row',
    width: '100%',
    padding: 5,
    gap: 10,
    marginBottom: 15,
    backgroundColor: '#ececec',
    borderRadius: 20,
  },
  cardText: {
    maxWidth: '45%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cardImage: {
    width: '50%',
    height: 150,
    borderRadius: 20,
    objectFit: 'cover',
  },
  textEmptyList: {
    textAlign: 'center',
  },
});
