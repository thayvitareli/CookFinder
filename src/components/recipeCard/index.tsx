import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { iMeal } from '@/interfaces/meal.interface';
import { Ionicons } from '@expo/vector-icons';
import { RecipeHooks } from '@/hooks';

export default function RecipeCard({ item }: { item: iMeal }) {
  const handlePress = (id: string) => {
    router.push(`/recipe/${id}`);
  };

  const onPressLikeBtn = async (recipeId: string) => {
    const result = await RecipeHooks.likeOrDeslike(recipeId);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item.id)}>
      <Image source={item.image_uri} style={styles.cardImage} />
      <Text style={styles.cardText}>{item.name}</Text>

      <TouchableOpacity onPress={() => onPressLikeBtn(item.id)}>
        <Ionicons name="heart-outline" size={26} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cardImage: {
    width: '50%',
    height: 150,
    borderRadius: 20,
    objectFit: 'cover',
  },
});
