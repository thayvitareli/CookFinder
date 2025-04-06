import { AuthContext } from "@/context/auth.context";
import { Redirect } from "expo-router";
import { useContext, useEffect } from "react";
import { View , Text, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile(){
const {user} = useContext(AuthContext)
    return !user ?Redirect({ href: '/auth'}) : <SafeAreaView style={styles.container}>
        <Text>Perfil</Text>

        
    </SafeAreaView>
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
 
});
