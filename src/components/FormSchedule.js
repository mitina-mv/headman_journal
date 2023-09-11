import React from 'react'
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export const FormSchedule = (props) => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} />
            <Button title='Кнопка' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#8312a8",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row',
        padding: 10, 
        gap: 8
    },
    text: {
        color: "#fff",
        fontSize: 32
    },
    input: {
        width: '80%',
        borderStyle: 'solid',
        padding: 10,
        backgroundColor: '#fff'
    }
});