import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, Button, } from 'react-native'
import { GlobalStyles } from '../../consts/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { retrieveUserData } from '../../utils';
import { getDoc, doc, db } from '../../firebase'
import { Ionicons } from '@expo/vector-icons'


export const AdminTab = ({ route, navigation }: any) => {
    const [adminName, setAdminName] = useState("");

    useEffect(() => {
        const fetchUserInfo = async () => {
            const user = await retrieveUserData()
            if (user) {
                const docRef = await getDoc(doc(db, "users", user));
                const docData: any = docRef.data()
                const { babyName, babyBirthDate, parentName, gender, selectedAllergies } = docData || {};
                setAdminName(parentName)
            }
        }
        fetchUserInfo()
    }, [])

    const handleAddNewMeal = () => {
        navigation.navigate("AddMealPage")
    }

    const handleAddNewArticle = () => {
        navigation.navigate("AddArticlePage")
    }

    const handleAddNewTTip = () => {
        navigation.navigate("AddTipPage")
    }

    const handleEditAboutUS = () => {
        navigation.navigate("EditAboutUsPage")
    }

    return (
        <View style={styles.adminTabScreen}>
            <Text style={[GlobalStyles.titleTextStyleName, { color: '#fb6f92', marginVertical: 10 }]}> Hello {adminName} !</Text>
            <Text style={[GlobalStyles.titleTextStyleName, { color: '#cccc', marginVertical: 20, fontSize: 16 }]}>בחר/י באחת מהאפשרויות</Text>
            <View style={styles.innerComponent}>
                <View style={styles.gridItem}>
                    <Pressable
                        android_ripple={{
                            color: "#ccc"
                        }}
                        style={({ pressed }) => [
                            styles.buttonCategory,
                            pressed ? styles.buttonCategoryPressed : null]}
                        onPress={handleAddNewMeal}
                    >
                        <View style={[styles.innerContainer]}>
                            <Text style={styles.text}>{'הוספת מתכון'}</Text>
                            <Ionicons style={styles.icon} name="arrow-forward-outline" size={22} />
                        </View>
                    </Pressable>
                </View >
                <View style={styles.gridItem}>
                    <Pressable
                        android_ripple={{
                            color: "#ccc"
                        }}
                        style={({ pressed }) => [
                            styles.buttonCategory,
                            pressed ? styles.buttonCategoryPressed : null]}
                        onPress={handleAddNewArticle}
                    >
                        <View style={[styles.innerContainer]}>
                            <Text style={styles.text}>{'הוספת כתבה'}</Text>
                            <Ionicons style={styles.icon} name="arrow-forward-outline" size={22} />
                        </View>
                    </Pressable>
                </View >
            </View>
            <View style={styles.innerComponent}>
                <View style={styles.gridItem}>
                    <Pressable
                        android_ripple={{
                            color: "#ccc"
                        }}
                        style={({ pressed }) => [
                            styles.buttonCategory,
                            pressed ? styles.buttonCategoryPressed : null]}
                        onPress={handleAddNewTTip}
                    >
                        <View style={[styles.innerContainer]}>
                            <Text style={styles.text}>{'הוספת טיפ'}</Text>
                            <Ionicons style={styles.icon} name="arrow-forward-outline" size={22} />
                        </View>
                    </Pressable>
                </View >
                <View style={styles.gridItem}>
                    <Pressable
                        android_ripple={{
                            color: "#ccc"
                        }}
                        style={({ pressed }) => [
                            styles.buttonCategory,
                            pressed ? styles.buttonCategoryPressed : null]}
                        onPress={handleEditAboutUS}
                    >
                        <View style={[styles.innerContainer]}>
                            <Text style={styles.text}>{'עריכת קצת עלינו '}</Text>
                            <Ionicons style={styles.icon} name="arrow-forward-outline" size={22} />
                        </View>
                    </Pressable>
                </View >
            </View>
            <Button title='לחץ/י על מנת לדווח על בעיה' color={GlobalStyles.colors.btnColor}></Button>
        </View>

    )
};

const styles = StyleSheet.create({
    innerComponent: {
        flexDirection: 'row',
        padding: 10,
        gap: 10,
        alignSelf: "center",
        justifyContent: "center",
    },
    gridItem: {
		//AMIT - THIS MAKING ALERT IN CONSOLE
        //shadowColor: "#ff9ebb",
        //shadowOpacity: 0.3,
        //shadowOffset: { width: 0, height: 2 },
        //shadowRadius: 0,
        overflow: Platform.OS === 'android' ? "hidden" : 'visible'
    },
    adminTabScreen: {
        flex: 1,
        paddingTop: 20,
        alignItems: "center",
        backgroundColor: GlobalStyles.colors.appBodyBackColor,
    },
    buttonCategory: {
        // flex: 1
    },
    buttonCategoryPressed: {
        opacity: 0.6,
    },
    innerContainer: {
        paddingVertical: 5,
        width: 170,
        flexDirection: 'row',
        justifyContent: "center",
        backgroundColor: GlobalStyles.colors.btnLightColor,
        gap: 5,
    },
    text: {
        fontSize: 20,
        color: GlobalStyles.colors.btnLightTextColor,
    },
    icon: {
        color: GlobalStyles.colors.btnLightTextColor,
    }
});