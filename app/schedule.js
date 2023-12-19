import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import FlatListItem from "../src/components/FlatListItem";
import { Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";


export default function Time() {
	const [schedule, setSchedule] = useState([]);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const db = SQLite.openDatabase("jornal.db");

	useEffect(() => {
		console.log('переход');
		fetchData();
	}, [isRefreshing]);
	  
	const fetchData = () => {
		db.transaction((tx) => {
		  tx.executeSql(
			`select * from schedule;`,
			[],
			(_, { rows: { _array } }) => setSchedule(_arraydeleteSchedule),
			(_, error) => {
			  console.error("Ошибка при получении данных: ", error);
			}
		  );
		});
	};

	const deleteSchedule = (id) => {
		db.transaction((tx) => {
		  tx.executeSql(
			"DELETE FROM schedule WHERE id=(?);",
			[id],
			(_, result) => {
			  console.log(`Удалили: `, id);
			  fetchData();
			},
			(_, error) => {
			  console.error("Ошибка при удалении элемента: ", error);
			}
		  );
		});
	};

	const handleRefresh = () => {
		setIsRefreshing(true);
		fetchData();
		setIsRefreshing(false);
	};

	return (
		<SafeAreaProvider>
			<View style={styles.container}>
				<View style={styles.content}>
					<FlatList
						data={schedule}
						renderItem={({ item }) => (
							<FlatListItem
								name={item.name + ` (${item.reduction})`}
								id={item.id}
								onDelete={deleteSchedule}
							/>
						)}
						keyExtractor={(item) => item.id}
						refreshing={isRefreshing}
						onRefresh={handleRefresh}
					></FlatList>

					<Link
						href="/create/schedule"
						asChild
						style={styles.addButton}
					>
						<Pressable>
							<FontAwesome name="plus" size={24} color="#fff" />
						</Pressable>
					</Link>
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
		paddingTop: 10
	},
	addButton: {
		position: 'absolute',
		bottom: 10,
		right: 10,
		padding: 15,
		paddingHorizontal: 18,
		backgroundColor: '#30BA8F',
		borderRadius: 100,
	},
});
