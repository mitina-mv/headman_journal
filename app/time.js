import { View, Text, Pressable, StyleSheet, Button, FlatList } from "react-native";
import { Link } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DateSwitcher from "./../components/DateSwitcher";
import { useEffect } from 'react';
import { setupDatabase, insertItem, getTimes } from './../modules/Database';

export default function Time() {
    let dataTable = [];
    useEffect(() => {
        setupDatabase(); // Создание таблицы при запуске приложения
        dataTable = getTimes();
      }, []);
    
      const handleAddItem = async () => {
        insertItem('9:40'); // Добавление элемента в таблицу
        console.log('111', dataTable);

        dataTable = await getTimes();
        console.log('444', dataTable);
      };
  return (
    <SafeAreaProvider>
        <View style={styles.container}>
            <View style={styles.content}>
                <Text>Время</Text>
                <View>
                    <Text>SQLite Database Example</Text>
                    <Button title="Добавить элемент" onPress={handleAddItem} />
                </View>

                <FlatList data={dataTable} renderItem={({ item }) => (
                    <Text>{item.name}</Text>
                )} keyExtractor={(item) => item.id}></FlatList>
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
