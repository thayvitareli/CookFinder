import { TouchableOpacity, StyleSheet,Text } from "react-native";
import {Image} from 'expo-image'
import { router } from "expo-router";

export default function RecipeCard({item}:{item:any}){
  const handlePress = (id: string) => {
    router.push('/(tabs)/favorites');
  };
  
    return  <TouchableOpacity
            style={styles.card}
            onPress={() => handlePress(item.idMeal)}
          >
            <Image source={item.strMealThumb} style={styles.cardImage} />
            <Text style={styles.cardText}>{item.strMeal}</Text>
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
