import { iRecipiet } from '@/interfaces/meal.interface';
import axios, { AxiosResponse } from 'axios';
import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  Button,
  Linking,
  Touchable,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function Meal() {
  const [recipient, setRecipient] = useState({} as iRecipiet);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useLocalSearchParams();

  useEffect(() => {
    getRecipient();
  }, [id]);

  const getRecipient = async () => {
    try {
      console.log('buscando');
      const { data } = (await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      )) as AxiosResponse<{ meals: iRecipiet[] }>;
      console.log('data', data);
      if (data) setRecipient(data?.meals[0]);
    } catch (error: any) {
      console.log(error);
    } finally {
      console.log('finalizado');
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor={'transparent'}
      />
      <Link href={'/'} style={styles.backButton}>
        <Text>Voltar</Text>
      </Link>

      {isLoading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>{recipient.strMeal}</Text>
          <Image
            source={{ uri: recipient.strMealThumb }}
            style={{ width: '100%', height: 200, borderRadius: 10 }}
          />
          <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold' }}>
            Instruções:
          </Text>
          <Text style={{ fontSize: 16, marginTop: 10 }}>
            {recipient.strInstructions}
          </Text>
          {recipient.strYoutube && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL(recipient.strYoutube)}
            >
              <Text style={styles.buttonTitle}>Assistir no YouTube</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
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
  backButton: {
    paddingTop: 20,
    padding: 5,
    alignSelf: 'flex-start',
  },
  scroll: {
    flexGrow: 1,
    padding: 10,
    gap: 10,
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },

  image: {
    width: '100%',
    height: 200,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    objectFit: 'cover',
  },
  button: {
    alignItems: 'center',

    padding: 10,
    borderRadius: 10,
    backgroundColor: '#d57070',
  },
  buttonTitle: {
    color: '#fff',
    fontWeight: '600',
  },
});
