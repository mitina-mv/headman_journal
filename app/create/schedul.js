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
import { useState, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, router } from "expo-router";
import {THEME} from '../../src/modules/theme'
import * as SQLite from "expo-sqlite";
import PickerModal from 'react-native-picker-modal-view';


export default function Page() {
	const [selectedNedela, setSelectedNedela] = useState("white");
	const [subjects, setSubjects] = useState([]);
	const [selectedSubject, setSelectedSubject] = useState([]);


	const db = SQLite.openDatabase("jornal.db");

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		db.transaction((tx) => {
		  tx.executeSql(
			`select * from subjects;`,
			[],
			(_, { rows: { _array } }) => {
				let data = _array.map(item => ({
					Id: item.id,
					Name: item.name + ` (${item.reduction})`,
					Value: item.id
				  }));
				console.log(data);
				setSubjects(data)},
			(_, error) => {
			  console.error("Ошибка при получении данных: ", error);
			}
		  );
		});
	};

    const pressHandler = () => {
        if(value.trim() && reduction.trim()) {
            addSubject(value.trim(), reduction.trim())
        } else {
            Alert.alert('Все поля должны быть заполнены!')	
        }
    };

	const addSubject = (name, red) => {
		db.transaction((tx) => {
			tx.executeSql(
				"INSERT INTO subjects (name, reduction) VALUES (?, ?);",
				[name, red],
				(_, result) => {
					console.log(`Добавлен элемент: `, value);
					router.replace('/subjects');
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
				<PickerModal
					onSelected={(selected) => {
						setSelectedNedela(selected)
					}}
					items={[
						{Id: 1, Name: "Белая", Value: 'white'},
						{Id: 2, Name: "Зеленая", Value: 'green'},
					]}
					showToTopButton={true}
					selected={selectedNedela}
					requireSelection={true}
					selectPlaceholderText={'Выбор недели'}
					searchPlaceholderText={'Поиск...'}
					style={styles.input}
				/>

				<PickerModal
					onSelected={(selected) => {
						setSelectedSubject(selected)
					}}
					items={subjects}
					showToTopButton={true}
					selected={selectedSubject}
					requireSelection={true}
					selectPlaceholderText={'Выбор предмета'}
					searchPlaceholderText={'Поиск...'}
					style={styles.input}
				/>
				{/* <TextInput
					style={styles.input}
					onChangeText={setValue}
					value={value.toString()}
					placeholder='Введите название предмета'
				/>
				<TextInput
					style={styles.input}
					onChangeText={setReduction}
					value={reduction.toString()}
					placeholder='Введите сокращение предмета'
				/> */}
				<TouchableOpacity style={styles.buttonGroup}>
					<Link
						href="/subjects"
						asChild
						style={styles.cancelButton}
					>
						<Pressable>
						<Text style={styles.addButtonText}>Отмена</Text>
						</Pressable>
					</Link>

					<Pressable  style={styles.addButton} onPress={pressHandler}>
						<FontAwesome name="plus" size={18} color="#fff" />
						<Text style={styles.addButtonText}>Сохранить</Text>
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
