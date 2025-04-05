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
  StatusBar,
} from 'react-native';
import {
    useQuery,
  } from '@tanstack/react-query';
import api from '@/service';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Favorites() {


 

  const data: ArrayLike<iMeal> | null | undefined = []


  const RenderItem = ({ item }: ListRenderItemInfo<iMeal>) => {
    return (
      <TouchableOpacity
        style={styles.card}
      >
       
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
      <Text style={styles.heading}>Favoritos</Text>

      
        
          <FlatList
            data={data}
            keyExtractor={(item: iMeal) => item.idMeal}
            renderItem={RenderItem}
            style={styles.flatlist}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.textEmptyList}>
                Você ainda não tem favoritos
              </Text>
            }
          />
        
      
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
