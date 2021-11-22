import { firebase } from '@firebase/app';
import '@firebase/firestore';
import { variables } from '../lib/variables';

const firebaseConfig = {
	apiKey: variables.firebaseApiKey,
	appId: variables.firebaseAppId,
	authDomain: variables.firebaseAuthDomain,
	projectId: variables.firebaseProjectId,
	storageBucket: variables.firebaseStorageBucket,
	messagingSenderId: variables.firebaseMessengerSenderId,
	measurementId: variables.firebaseMeassurmentId
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
