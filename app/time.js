import {
	View,
	StyleSheet,
	FlatList,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import FlatListItem from "../components/FlatListItem";
import FormAddItem from "./../components/FormAddItem";

export default function Time() {
	const [times, setTimes] = useState([]);
	const db = SQLite.openDatabase("jornal.db");

	useEffect(() => {
		db.transaction((tx) => {
			tx.executeSql(
				`select * from times;`,
				[],
				(_, { rows: { _array } }) => setTimes(_array)
			);
		});
	}, []);

	const addTime = (name) => {
		db.transaction((tx) => {
			tx.executeSql(
				"INSERT INTO times (name) VALUES (?);",
				[name],
				(_, result) => {
					console.log(`Добавлен элемент: `, name);
					setTimes(() => [
						...times,
						{
							id: result.insertId,
							name: name,
						},
					]);
				},
				(_, error) => {
					console.error("Ошибка при добавлении элемента: ", error);
				}
			);
		});
	};

	const deleteTime = (id) => {
        db.transaction((tx) => {
			tx.executeSql(
				"DELETE FROM times WHERE id=(?);",
				[id],
				(_, result) => {
					console.log(`Удалили: `, id);
					setTimes((prev) => prev.filter((item) => item.id != id));
				},
				(_, error) => {
					console.error("Ошибка при удалении элемента: ", error);
				}
			);
		});
		
	};

	return (
		<SafeAreaProvider>
			<View style={styles.container}>
				<View style={styles.content}>
                    <FormAddItem onSubmit={addTime} placeholder='Введите время в формате 8:00-9:30' />                    

					<FlatList
						data={times}
						renderItem={({ item }) => (
							<FlatListItem
								name={item.name}
                                id={item.id}
                                onDelete={deleteTime}
							/>
						)}
						keyExtractor={(item) => item.id}
					></FlatList>
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
	},
});
