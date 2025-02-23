import { iMeal } from '@/interfaces/meal.interface';
import axios from 'axios';
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
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function Home() {
  const [meals, setMeals] = useState([] as iMeal[]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

  useEffect(() => {
    getAllMeals();
  }, []);

  const getAllCategories = async () => {
    const { data: response } = await axios.get(`${BASE_URL}/list.php?c=list`);
    return response.meals.map(
      (meal: { strCategory: string }) => meal.strCategory,
    );
  };

  const getAllMeals = async () => {
    try {
      const categories = await getAllCategories();

      const requests = categories.map((category: string) =>
        axios.get(`${BASE_URL}/filter.php?c=${category}`),
      );

      const responses = await Promise.all(requests);
      let allMeals: iMeal[] = responses.flatMap(
        (response) => response.data.meals,
      );

      if (allMeals) setMeals(allMeals);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handlePress = (id: string) => {
    //@ts-ignore
    router.push(`/meal/${id}`);
  };

  const RenderItem = ({ item }: ListRenderItemInfo<iMeal>) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handlePress(item.idMeal)}
      >
        <Image src={item.strMealThumb} style={styles.cardImage} />
        <Text style={styles.cardText}>{item.strMeal}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor={'transparent'}
      />
      <Text style={styles.heading}>Bem vindo ao CookFinder</Text>

      {isLoading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <>
          <TextInput
            placeholder="Buscar por"
            placeholderTextColor={'#b8b8b8'}
            onChangeText={(value) => setSearch(value)}
            value={search}
            style={styles.searchInput}
          />

          <FlatList
            data={meals.filter((meal) => meal.strMeal.includes(search.trim()))}
            keyExtractor={(item: iMeal) => item.idMeal}
            renderItem={RenderItem}
            style={styles.flatlist}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.textEmptyList}>
                Nenhuma receita encontrada
              </Text>
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
    padding: 24,
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
    width: '100%',
    height: 250,
    marginBottom: 15,
    backgroundColor: '#ececec',
    borderRadius: 20,
  },
  cardText: {
    paddingTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    objectFit: 'cover',
  },
  textEmptyList: {
    textAlign: 'center',
  },
});
