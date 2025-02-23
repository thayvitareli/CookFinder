import { iMeal } from '@/interfaces/meal.interface';
import { router } from 'expo-router';
import {  useState } from 'react';
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
import {
    useQuery,
  } from '@tanstack/react-query';
import api from '@/service';


export default function Home() {
  const [search, setSearch] = useState('');

  const getAllCategories = async () => {
    const { data: response } = await api.get(`/list.php?c=list`);
    return response.meals.map(
      (meal: { strCategory: string }) => meal.strCategory,
    );
  };

  const getAllMeals = async () => {
    try {
      const categories = await getAllCategories();

      const requests = categories.map((category: string) =>
        api.get(`/filter.php?c=${category}`),
      );

      const responses = await Promise.all(requests);
      let allMeals: iMeal[] = responses.flatMap(
        (response) => response.data.meals,
      );

      return allMeals
    } catch (error:any) {
        console.error(error?.response)
        return null;
    } 
  };

  const { data: meals, isLoading } = useQuery({
    queryKey: ['meals'],
    queryFn: getAllMeals,
    staleTime: 600000,
    refetchInterval: 600000,
    refetchOnWindowFocus: false, 
    refetchOnReconnect: true,   
  });



  const handlePress = (id: string) => {
    //@ts-ignore
    router.push(`/recipe/${id}`);
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
      <Text style={styles.heading}>Welcome to CookFinder</Text>

      {isLoading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <>
          <TextInput
            placeholder="search..."
            placeholderTextColor={'#b8b8b8'}
            onChangeText={(value) => setSearch(value)}
            value={search}
            style={styles.searchInput}
          />

          <FlatList
            data={meals?.filter((meal) => meal.strMeal.includes(search.trim()))}
            keyExtractor={(item: iMeal) => item.idMeal}
            renderItem={RenderItem}
            style={styles.flatlist}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.textEmptyList}>
                No recipes found
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
