import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const firebaseConfig = {
  apiKey: "AIzaSyDtnxuFaEfC1KCVE__qX8TyxJsMLi7EMCE",
  authDomain: "treatmeter.firebaseapp.com",
  databaseURL: "https://treatmeter.firebaseio.com/",
  projectId: "treatmeter",
  storageBucket: "gs://treatmeter.appspot.com",
  messagingSenderId: ""
};

  // react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  };

  // Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);


// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase)
  )(createStore);

  const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
  });

  // Create initial state
const initialState = {  };

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  composeWithDevTools(
    reactReduxFirebase(firebase),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
