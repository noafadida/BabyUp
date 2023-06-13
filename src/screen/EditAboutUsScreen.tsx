import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { GlobalStyles } from '../consts/styles';

const EditAboutUsScreen = ({ duration, complexity, affordability, style, textStyle }: any) => {

    const [bio, setBio] = useState(""); // put the current bio as a default value

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.descriptionInput}
                placeholder="ערוך"
                value={bio}
                onChangeText={setBio}
            />
        </View>
    )
}

export default EditAboutUsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.appBodyBackColor,
        alignItems: "center",
        // justifyContent: "flex-start",
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    descriptionInput: {
        borderWidth:1,
        borderColor: "#ccc",
        color: "#B7B7B7",
        borderRadius: 10,
        padding: 10,
        width: "95%",
        minHeight: 100,
        marginBottom: 20,
        marginTop: 20,
        textAlignVertical: "top",
        textAlign: "right",
    },
})