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
  StatusBar,
} from 'react-native';
import {
    useQuery,
  } from '@tanstack/react-query';
import api from '@/service';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecipeCard from '@/components/recipeCard';


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
    router.push('/(tabs)/favorites');
  };

  const RenderItem = ({ item }: ListRenderItemInfo<iMeal>) => {
    return <RecipeCard item={item}/>
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
    flexDirection:'row',
    width: '100%',
    padding:5,
   gap:10,
    marginBottom: 15,
    backgroundColor: '#ececec',
    borderRadius: 20,
  },
  cardText: {
    maxWidth:'45%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cardImage: {
    width: '50%',
    height: 150,
   borderRadius:20,
    objectFit: 'cover',
  },
  textEmptyList: {
    textAlign: 'center',
  },
});
