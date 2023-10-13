import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function Page() {
  return (
    <View>
        <Text>О нас!</Text>
      <Link href="/">Main</Link>
      <Link href="/about">About</Link>
    </View>
  );
}