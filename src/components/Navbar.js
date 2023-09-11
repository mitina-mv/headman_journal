import React from 'react'
import { StyleSheet, Text, View } from "react-native";

export const Navbar = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Привет Мир!</Text>
            <Text>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 300,
        backgroundColor: "#45a286",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#7401f2",
        fontSize: 26
    }
});