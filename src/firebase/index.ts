import { initializeApp } from 'firebase/app';
import {
	getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification,
	signOut, sendPasswordResetEmail
} from "firebase/auth";
import { getFirestore, collection, getDocs, setDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
	apiKey: "AIzaSyCmqgj97fze-ExeYaJVZ3keGhf9QGkDKs4",
	authDomain: "baby-up-project.firebaseapp.com",
	projectId: "baby-up-project",
	storageBucket: "baby-up-project.appspot.com",
	messagingSenderId: "548319245387",
	appId: "1:548319245387:web:fe84f2546f45a18c4c49ce"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
	if (user) {
		console.log('user logged in')
		await AsyncStorage.setItem('user', JSON.stringify(user?.uid));
	} else {
		console.log('user logged out')
		await AsyncStorage.removeItem('user');
	}
});

export {
	app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut, sendPasswordResetEmail,
	db, collection, getDocs, setDoc, doc, getDoc, onSnapshot
}