import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import { GlobalStyles } from '../consts/styles';
import { Ionicons } from '@expo/vector-icons';
import { EMPTY_STRING } from '../consts/GeneralConsts';
import * as ImagePicker from 'expo-image-picker';

const AddTipScreen = () => {
    const [imgUri, setImgUri] = useState(EMPTY_STRING);
    const [tipName, setTipName] = useState(EMPTY_STRING);
    const [tipItemBody, setTipItemBody] = useState(EMPTY_STRING);

    const handleChoosePhoto = async () => {
        try {
            const res = await ImagePicker.launchImageLibraryAsync();
            if (!res.canceled && res.assets.length > 0) {
                const uri = res.assets[0].uri;
                setImgUri(uri);

            }
        } catch (err) {
            console.log("open camera error");
        }
        console.log(imgUri)
    };


    // const handlePost = async () => {
    //     if (imgUri) {
    //         const url = await UserModel.uploadImage(imgUri);
    //         const sender = await AsyncStorage.getItem("id");
    //         const post: Post = {
    //             message: description,
    //             sender: String(sender),
    //             avatarUrl: url,
    //         };
    //         try {
    //             const res: any = await UserModel.addNewPost(post);
    //             if (!res) {
    //                 return;
    //             }
    //             Alert.alert("Great Post\n", `Description: ${description}`);
    //         } catch (err) {
    //             console.log("cant create post ");
    //         }
    //     } else {
    //         Alert.alert("Cant creat post\n", `Photo is required`);
    //     }
    //     navigation.goBack();
    // };


    return (
        <ScrollView style={{ backgroundColor: GlobalStyles.colors.appBodyBackColor, }} >
            <View style={styles.container}>
                <TouchableOpacity onPress={handleChoosePhoto}>
                    <Ionicons name={"image"} style={styles.galleryButton} size={50} />
                    <View style={styles.imageContainer}>
                        {imgUri && (
                            <Image source={{ uri: imgUri }} style={styles.image} />
                        )}
                        {!imgUri && (
                            <Text style={styles.choosePhotoText}>העלה תמונה </Text>
                        )}
                    </View>
                </TouchableOpacity>
                <TextInput
                    style={styles.nameInput}
                    placeholder="כותרת"
                    value={tipName}
                    onChangeText={setTipName}
                />
                <TextInput
                    style={styles.descriptionInput}
                    placeholder="הכנס תוכן"
                    value={tipItemBody}
                    onChangeText={setTipItemBody}
                />

                <TouchableOpacity style={[GlobalStyles.buttonLightStyle, { marginBottom: 30 }]}>
                    <Text style={[GlobalStyles.buttonPinkTextStyle, { color: '#FF8DC7', }]}>הוספה</Text>
                </TouchableOpacity>
            </View>
        </ScrollView >
    );
};

export default AddTipScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: GlobalStyles.colors.appBodyBackColor,
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    imageContainer: {
        margin: 10,
        width: "40%",
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        color: "#B7B7B7",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 30,
        alignContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    galleryButton: {
        position: "absolute",
        flexDirection: "row",
        margin: 65,
        color: "#FF8DC7",
    },
    choosePhotoText: {
        fontSize: 14,
        margin: 30,
        color: "#ccc",
    },
    descriptionInput: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        color: "#B7B7B7",
        padding: 10,
        width: "95%",
        minHeight: 100,
        marginBottom: 20,
        textAlignVertical: "top",
        textAlign: "right",
    },
    nameInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        color: "#B7B7B7",
        borderRadius: 10,
        padding: 10,
        width: "95%",
        minHeight: 50,
        marginBottom: 20,
        textAlignVertical: "top",
        textAlign: "right",

    },
})