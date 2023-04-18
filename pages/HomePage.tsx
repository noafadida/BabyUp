import React, { FC } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CategoryGrid from '../components/CategoryGrid';
import { CATEGORIES } from '../data';


const HomePage: FC<{ route: any, navigation: any }> = ({ navigation, route }) => {
    
    // Define screen components
    const HomeScreen = ({ navigation }: any) => {
        const renderCategoryItem = (itemData: any) => {
            const pressHandler = () => (
                navigation.navigate("MealsOverViewScreen", { categoryId: itemData.item.id })
            )
            return (<CategoryGrid
                title={itemData.item.title}
                color={itemData.item.color}
                onPress={pressHandler}
            />)
        }
        return (
            <View style={styles.screen} >
                <FlatList
                    data={CATEGORIES}
                    keyExtractor={(item: any) => item.id}
                    renderItem={renderCategoryItem}
                />
            </View >
        )
    };

    const ProfileScreen = () => (
        <View style={styles.screen}>
            <Text>Profile Screen</Text>
        </View>
    );
    const FavoritesScreen = () => (
        <View style={styles.screen}>
            <Text>Favorite Screen</Text>
        </View>
    );

    const Tab = createBottomTabNavigator();
    return (
        <View style={styles.container}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: String | undefined;
                        if (route.name === "HomeScreen") {
                            iconName = focused ? "home" : "home-outline";
                        } else if (route.name === "ProfileScreen") {
                            iconName = focused ? "person-circle" : "person-circle-outline";
                        } else if (route.name === 'FavoritesScreen') {
                            iconName = focused ? 'ios-heart' : 'ios-heart-outline'
                        }

                        return <Ionicons name={iconName as "key" | "search" | "repeat" | "link" | "at" | "body" | "code" | "map" | "menu" | "time" | "ellipse" | "filter" | "image" | "stop" | "text" | "push" | "home" | "home-outline" | "person-circle" | undefined} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "#4285F4",
                    tabBarInactiveTintColor: "grey",
                })}
            >
                <Tab.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                    options={{ title: "הפרופיל שלי", headerShown: false }}
                />

                <Tab.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ title: "עמוד הבית", headerShown: false }}
                />

                <Tab.Screen
                    name="FavoritesScreen"
                    component={FavoritesScreen}
                    options={{ title: "מועדפים ", headerShown: false }}
                />
            </Tab.Navigator>
        </View>

    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        backgroundColor: "white"
    },
    container: {
        flex: 1,
    },
    button: {
        backgroundColor: '#4285F4',
        paddingVertical: 10,
        paddingHorizontal: 70,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 20
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});


export default HomePage;