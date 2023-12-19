import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Pressable,
	Alert,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, router } from "expo-router";
import {THEME} from '../../src/modules/theme'
import * as SQLite from "expo-sqlite";


export default function Page() {
	const [name, setName] = useState('');
	const [firstname, setFirstname] = useState('');

	const db = SQLite.openDatabase("jornal.db");

    const pressHandler = () => {
        if(name.trim() && firstname.trim()) {
            addPeople(name.trim(), firstname.trim())
        } else {
            Alert.alert('Все поля должны быть заполнены!')	
        }
    };

	const addPeople = (name, fname) => {
		console.log('ok');

		db.transaction((tx) => {
			tx.executeSql(
				"INSERT INTO peoples (name, firstname) VALUES (?, ?);",
				[name, fname],
				(_, result) => {
					console.log(`Добавлен элемент: `, name, fname);
					setName('')
					setFirstname('')
					router.replace('/group');
				},
				(_, error) => {
					console.error("Ошибка при добавлении элемента: ", error);
				}
			);
		});
	};

	return (
		<SafeAreaProvider>
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					onChangeText={(text) => setName(text || '')}
					value={name.toString()}
					placeholder='Введите имя студента'
				/>
				<TextInput
					style={styles.input}
					onChangeText={(text) => setFirstname(text || '')}
					value={firstname.toString()}
					placeholder='Введите фамилию студента'
				/>
				<TouchableOpacity style={styles.buttonGroup}>
					<Link
						href="/group"
						asChild
						style={styles.cancelButton}
					>
						<Pressable>
						<Text style={styles.addButtonText}>Отмена</Text>
						</Pressable>
					</Link>

					<Pressable  style={styles.addButton} onPress={pressHandler}>
						<FontAwesome name="plus" size={18} color="#fff" />
						<Text style={styles.addButtonText}>Добавить</Text>
					</Pressable>
				</TouchableOpacity>
			</View>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
		gap: 10,
		marginBottom: 10,
	},
	text: {
		color: "#fff",
		fontSize: 32,
	},
	input: {
		width: "100%",
		borderStyle: "solid",
		borderColor: "#ccc",
		borderRadius: 5,
		borderWidth: 2,
		padding: 10,
		backgroundColor: "#fff",
	},
	addButton: {
		flexDirection: 'row',
		gap: 10,
		backgroundColor: THEME.ACTIVE_COLOR,
		padding: 10,
		borderRadius: 5,
		paddingHorizontal: 15,
		alignItems: 'center',
	},
	addButtonText: {
		color: "#fff",
		fontSize: 18,
	},
	buttonGroup: {
		flexDirection: 'row', 
		gap: 10,
		marginTop: 20,
	},
	cancelButton: {
		flexDirection: 'row',
		gap: 10,
		backgroundColor: THEME.DANGER_COLOR,
		padding: 10,
		borderRadius: 5,
		paddingHorizontal: 15,
		alignItems: 'center',
	}
});
