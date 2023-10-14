import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput,     TouchableOpacity,
    Pressable, Alert } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";


const FormAddItem = ({placeholder, onSubmit}) => {
    const [value, setValue] = useState([]);

    const pressHandler = () => {
        if(value.trim()) {
            onSubmit(value)
            setValue('')
        } else {
            Alert.alert('Название предмета не может быть пустым!')
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setValue}
                value={value.toString()}
                placeholder={placeholder}
            />
            <TouchableOpacity>
                <Pressable
                    style={styles.addButton}
                    onPress={pressHandler}
                >
                    <FontAwesome
                        name="plus"
                        size={24}
                        color="#fff"
                    />
                </Pressable>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        padding: 10,
        paddingVertical: 20,
        borderBottomWidth: 2,
        borderColor: "#aaa",
        gap: 8,
        marginBottom: 10
    },
    text: {
        color: "#fff",
        fontSize: 32,
    },
    input: {
        width: "80%",
        borderStyle: "solid",
        borderColor: "#ccc",
        borderRadius: 5,
        borderWidth: 2,
        padding: 10,
        backgroundColor: "#fff",
    },
    addButton: {
        color: "#fff",
        backgroundColor: "#009d00",
        padding: 10,
        borderRadius: 5,
        paddingHorizontal: 15,
    }
});

export default FormAddItem;