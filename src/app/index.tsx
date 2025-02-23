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
} from 'react-native';

export default function Home() {
  const [meals, setMeals] = useState([] as iMeal[]);

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
    <View style={styles.container}>
      <Text style={styles.heading}>Bem vindo ao CookFinder</Text>

      {isLoading && <ActivityIndicator style={styles.loading} />}
      <FlatList
        data={meals}
        keyExtractor={(item: iMeal) => item.idMeal}
        renderItem={RenderItem}
        contentContainerStyle={styles.flatlist}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
    marginTop: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  flatlist: {
    marginTop: 15,
    flexGrow: 1,
    gap: 20,
  },

  card: {
    width: '100%',
    backgroundColor: '#ececec',
    borderRadius: 20,
  },
  cardText: {
    padding: 10,
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
});
