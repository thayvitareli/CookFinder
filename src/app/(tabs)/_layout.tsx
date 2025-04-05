import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor:'#f4fcb8', headerShown:false, tabBarShowLabel:false,
      tabBarInactiveTintColor: '#515b38',
    
    tabBarStyle:{backgroundColor:'#95a868', borderTopRightRadius: 20,  borderTopLeftRadius: 20}}} initialRouteName='home'>
      <Tabs.Screen
        name="home"
    
        options={{
          
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          
          tabBarIcon: ({ color }) => <Ionicons size={28} name="heart-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          
          tabBarIcon: ({ color }) => <Ionicons name="person-circle-outline" size={28} color={color} />
        }}
      />
    </Tabs>
  );
}
