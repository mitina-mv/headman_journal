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
import { Link } from "expo-router";


export default function Page() {
	const [value, setValue] = useState([]);
	const [reduction, setReduction] = useState([]);

    const pressHandler = () => {
        if(value.trim() &&  reduction.trim()) {
            onSubmit({
				name: value,
				reduction: reduction
			})
            setValue('')
            setReduction('')
        } else {
            Alert.alert('Название предмета не может быть пустым!')
        }
    };
	return (
		<SafeAreaProvider>
			<View style={styles.container}>
				<TextInput
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
				/>
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
		backgroundColor: "#009d00",
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
		backgroundColor: "#b00a0a",
		padding: 10,
		borderRadius: 5,
		paddingHorizontal: 15,
		alignItems: 'center',
	}
});
