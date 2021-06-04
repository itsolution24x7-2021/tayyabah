import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-community/async-storage';


class FirebaseMethods {
  async login(payload) {
    try {
      let userCredential = await auth().signInWithEmailAndPassword(payload.email, payload.password);
      let fcmToken = await AsyncStorage.getItem('fcmToken', fcmToken);
      let getUserData = await firestore().collection(`user`).doc(userCredential.user._user.uid).get(); 
      let updateDate = await firestore().collection(`user`).doc(userCredential.user._user.uid).update({fcmToken});
      userCredential.userData = { id: getUserData._ref.id, data: getUserData._data }

      return new Promise((resolve, reject) => {
        this.handlePromise(resolve, reject, userCredential);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        this.handlePromise(resolve, reject, error);
      });
    }
  }

  async register(payload) {
    try {
      let userCredential = await auth().createUserWithEmailAndPassword(payload.email, payload.password);

      let storeProfileImage = await storage().ref(`/images/${userCredential.user._user.uid}`).put(payload.profileImageBlob);

      let downloadProfileImage = await storage().ref(`/images/${userCredential.user._user.uid}`).getDownloadURL();

      delete payload["profileImageBlob"];
      delete payload["password"];
      payload.profileImage = downloadProfileImage;
      payload.uid = userCredential.user._user.uid;

      let userData = await firestore().collection('user').doc(userCredential.user._user.uid).set(payload);

      let getUserData = await firestore().collection('user').doc(userCredential.user._user.uid).get();

      userCredential.userData = { id: getUserData._ref.id, data: getUserData._data }

      return new Promise((resolve, reject) => {
        this.handlePromise(resolve, reject, userCredential);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        this.handlePromise(resolve, reject, error);
      });
    }
  }

  handlePromise = (resolve, reject, response) => {
    if (response?.userData?.id) {
      resolve(response.userData);
    } else {
      if (!response?.userData && response?.message) {
        reject(response?.message);
      }
    }
  };
}

export default new FirebaseMethods();
