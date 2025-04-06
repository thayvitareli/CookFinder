import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/Themed';
import { TextInput } from 'react-native';
export default function Login() {
  return (
    <SafeAreaView>
      <Text>Login</Text>

      <TextInput />
      <TextInput />
    </SafeAreaView>
  );
}
