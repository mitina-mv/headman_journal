import { View, Text, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DateSwitcher from "./../components/DateSwitcher";

export default function Page() {
  return (
    <SafeAreaProvider>
        <View style={styles.container}>
            <View style={styles.content}>
                <Text>Настройки!</Text>
            </View>
        </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
  }
});
