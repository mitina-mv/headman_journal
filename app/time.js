import { View, Text, Pressable, StyleSheet, Button, FlatList } from "react-native";
import { Link } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DateSwitcher from "./../components/DateSwitcher";
import { useEffect, useState } from 'react';
import { setupDatabase } from './../modules/Database';
import * as SQLite from 'expo-sqlite';

export default function Time() {
  const [times, setTimes] = useState([]);
  const db = SQLite.openDatabase('jornal.db');

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from times;`,
        [],
        (_, { rows: { _array } }) => setTimes(_array)
      );
    });
  }, []);

  const addTime = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO times (name) VALUES (?);',
        ['900'],
        (_, result) => {
          console.log(`Добавлен элемент: `, result);
          setTimes(() => [
            ...times,
            {
              id: result.insertId,
              name: '11'
            }
          ])
        },
        (_, error) => {
          console.error('Ошибка при добавлении элемента: ', error);
        }
      );
    });
  }

  return (
    <SafeAreaProvider>
        <View style={styles.container}>
            <View style={styles.content}>
                <Text>Время</Text>
                <View>
                    <Text>SQLite Database Example</Text>
                    <Button title="Добавить элемент" onPress={addTime} />
                </View>

                <FlatList data={times} renderItem={({ item }) => (
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
