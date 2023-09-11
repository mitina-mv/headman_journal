import React from 'react'
import { StyleSheet, Text, View, Button } from "react-native";

export const Schedule = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.title}</Text>
            <View style={styles.buttonGroup}>
                <Button title='Изм' />
                <Button title='Уд' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 4,
        borderBottomColor: '#eee',
        borderBottomWidth: 1
    },
    text: {
        color: "#000",
        fontSize: 16
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 8,
    }
});