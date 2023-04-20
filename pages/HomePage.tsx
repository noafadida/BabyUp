// import React, { FC, useLayoutEffect } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';
// import { HomeScreen } from '../components/HomePage/Home';
// import { ProfileScreen } from '../components/HomePage/Profile';
// import { FavoritesScreen } from '../components/HomePage/Favorite';


// const HomePage: FC<{ route: any, navigation: any }> = ({ navigation, route }) => {
//     // useLayoutEffect(() => { //Hide Back button
//     //     navigation.setOptions({
//     //         headerLeft: null,
//     //     });
//     // }, [navigation]);

//     const Tab = createBottomTabNavigator();
//     return (
//         <View style={styles.container}>
//             <Tab.Navigator
//                 screenOptions={({ route }) => ({
//                     tabBarIcon: ({ focused, color, size }) => {
//                         let iconName: String | undefined;
//                         if (route.name === "HomeScreen") {
//                             iconName = focused ? "home" : "home-outline";
//                         } else if (route.name === "ProfileScreen") {
//                             iconName = focused ? "person-circle" : "person-circle-outline";
//                         } else if (route.name === 'FavoritesScreen') {
//                             iconName = focused ? 'ios-heart' : 'ios-heart-outline'
//                         }

//                         return <Ionicons name={iconName as "key" | "search" | "repeat" | "link" | "at" | "body" | "code" | "map" | "menu" | "time" | "ellipse" | "filter" | "image" | "stop" | "text" | "push" | "home" | "home-outline" | "person-circle" | undefined} size={size} color={color} />;
//                     },
//                     tabBarActiveTintColor: "#4285F4",
//                     tabBarInactiveTintColor: "grey",
//                 })}
//             >
//                 <Tab.Screen
//                     name="ProfileScreen"
//                     component={ProfileScreen}
//                     options={{
//                         title: "הפרופיל שלי",
//                         headerStyle: { backgroundColor: "#FF6FB5", height: 35 },
//                         headerTintColor: "white",
//                     }}

//                 />

//                 <Tab.Screen
//                     name="HomeScreen"
//                     component={HomeScreen}
//                     options={{
//                         title: "עמוד הבית", headerStyle: { backgroundColor: "#FF6FB5", height: 35 },headerTintColor: "white",
//                     }}
//                 />

//                 <Tab.Screen
//                     name="FavoritesScreen"
//                     component={FavoritesScreen}
//                     options={{ title: " המועדפים שלי " ,headerStyle: { backgroundColor: "#FF6FB5", height: 35 },headerTintColor: "white", }}
//                 />
//             </Tab.Navigator>
//         </View>

//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "pink"
//     },
//     button: {
//         backgroundColor: '#4285F4',
//         paddingVertical: 10,
//         paddingHorizontal: 70,
//         borderRadius: 5,
//         marginTop: 20,
//         marginBottom: 20
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 18,
//     },
// });


// export default HomePage;