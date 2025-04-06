import { iMeal } from '@/interfaces/meal.interface';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  ListRenderItemInfo,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import api from '@/service';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecipeCard from '@/components/recipeCard';
import { RecipeHooks } from '@/hooks';
import { useRecipes } from '@/hooks/recipe';
import { useIsFocused } from '@react-navigation/native';

export default function Favorites() {
  const [skip, setSkip] = useState(0);
  const [take] = useState(3);

  const [isLoading, setIsLoading] = useState(false);
  const [shouldTakeMore, setShouldTakeMore] = useState(true);

  const [recipes, setRecipes] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) getRecipes(true);
  }, [isFocused]);

  const getRecipes = async (reset = false) => {
    if (isLoading || (!shouldTakeMore && !reset)) return;

    setIsLoading(true);

    const result = await RecipeHooks.listMyFavoriteRecipes({
      skip: reset ? 0 : skip,
      take,
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
      <Text style={styles.heading}>Favoritos</Text>

      {isLoading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <>
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
