import { initializeApp } from 'firebase/app';
import {
	getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification,
	signOut, sendPasswordResetEmail
} from "firebase/auth";
import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "api-key",
	authDomain: "project-id.firebaseapp.com",
	databaseURL: "https://project-id.firebaseio.com",
	projectId: "project-id",
	storageBucket: "project-id.appspot.com",
	messagingSenderId: "sender-id",
	appId: "app-id",
	measurementId: "G-measurement-id",
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
	if (user) {
		console.log('user logged in', user?.uid)
	} else {
		console.log('user logged out')
	}
});

export {
	app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut, sendPasswordResetEmail,
	db, collection, getDocs, setDoc, doc
}