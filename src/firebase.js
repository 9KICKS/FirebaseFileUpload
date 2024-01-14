// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC5jn2EvC74xua9UTTYyxIVPCeGyrJxBDM",
    authDomain: "uploadingfile-a7063.firebaseapp.com",
    projectId: "uploadingfile-a7063",
    storageBucket: "uploadingfile-a7063.appspot.com",
    messagingSenderId: "171080362760",
    appId: "1:171080362760:web:9835a141dad70a598f1abd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
