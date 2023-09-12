import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";

export const FormSchedule = (props) => {
    const [value, setValue] = useState([]);

    const pressHandler = () => {
        if(value.trim()) {
            props.onSubmit(value)
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
                placeholder="Введите название предмета"
            />
            <Button onPress={pressHandler} title="Кнопка" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#8312a8",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        padding: 10,
        gap: 8,
    },
    text: {
        color: "#fff",
        fontSize: 32,
    },
    input: {
        width: "80%",
        borderStyle: "solid",
        padding: 10,
        backgroundColor: "#fff",
    },
});
