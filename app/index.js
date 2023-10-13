import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DateSwitcher from './../components/DateSwitcher';

export default function Page() {
  return (
    <SafeAreaProvider>
        <View>
            <DateSwitcher /> 
            <Text>Моя страница!</Text>
        <Link href="/about">About</Link>
        <Link href="/other" asChild>
            <Pressable>
                <Text>MAIN</Text>
            </Pressable>
            </Link>
        </View>
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    padding: 10,
  },
  button: {
    fontSize: 18,
    color: 'blue',
  },
  date: {
    fontSize: 18,
  },
});