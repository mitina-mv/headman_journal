import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Pressable,
} from "react-native";

export const Schedule = ({ item, onDelete }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{item.title}</Text>
            <View style={styles.buttonGroup}>
                <Button title="Изм" />
                <TouchableOpacity>
                    <Pressable
                        style={styles.deleteButton}
                        onPress={() => onDelete(item.id)}
                    >
                        <Text style={styles.deleteButtonText}>Удалить</Text>
                    </Pressable>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 4,
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
    },
    text: {
        color: "#000",
        fontSize: 16,
    },
    buttonGroup: {
        flexDirection: "row",
        gap: 8,
    },
    deleteButton: {
        backgroundColor: "#dd0000",
        padding: 10,
        borderRadius: 4,
        elevation: 3,
    },
    deleteButtonText: {
        color: "#fff",
        textTransform: "uppercase",
        fontWeight: "bold",
    },
});
