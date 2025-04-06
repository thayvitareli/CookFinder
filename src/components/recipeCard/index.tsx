import { TouchableOpacity, StyleSheet,Text } from "react-native";
import {Image} from 'expo-image'
import { router } from "expo-router";
import { iMeal } from "@/interfaces/meal.interface";

export default function RecipeCard({item}:{item:iMeal}){
  const handlePress = (id: string) => {
    router.push(`/recipe/${id}`);
  };
  
    return  <TouchableOpacity
            style={styles.card}
            onPress={() => handlePress(item.id)}
          >
            <Image source={item.image_uri} style={styles.cardImage} />
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
}


const styles = StyleSheet.create({


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
});
