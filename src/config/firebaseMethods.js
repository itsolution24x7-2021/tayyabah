import firestore from '@react-native-firebase/firestore';

const getResource = (collectionName) => {
  return new Promise((resolve, reject) => {
    const onResult = (QuerySnapshot) => {
      resolve(QuerySnapshot.docs);
    };

    const onError = (error) => {
      reject(error);
    };

    firestore()
      .collection(collectionName)
      .orderBy('timeStamp')
      .onSnapshot(onResult, onError);
  });
};

const updateData = ({collectionName, id, payload}) => {
  return firestore().collection(collectionName).doc(id).update(payload);
};

const getResourceById = (collectionName, id) => {
  return new Promise((resolve, reject) => {
    const onResult = (QuerySnapshot) => {
      resolve(QuerySnapshot);
    };

    const onError = (error) => {
      reject(error);
    };

    firestore()
      .collection(collectionName)
      .doc(id)
      .onSnapshot(onResult, onError);
  });
};

const getResourceWithRefrence = (collectionName, payload) => {
  return new Promise((resolve, reject) => {
    const onResult = (QuerySnapshot) => {
      resolve(QuerySnapshot.docs);
    };

    const onError = (error) => {
      reject(error);
    };

    firestore()
      .collection(collectionName)
      .where(payload.key, '==', payload.value)
      .onSnapshot(onResult, onError);
  });
};

const getResourceFromSubCollection = ({
  collectionName,
  collectionDocId,
  subCollectionName,
}) => {
  return new Promise((resolve, reject) => {
    const onResult = (QuerySnapshot) => {
      resolve(QuerySnapshot.docs);
    };

    const onError = (error) => {
      reject(error);
    };

    firestore()
      .collection(collectionName)
      .doc(collectionDocId)
      .collection(subCollectionName)
      .orderBy('timeStamp')
      .onSnapshot(onResult, onError);
  });
};

const getResourceByIdFromSubCollection = ({
  collectionName,
  collectionDocId,
  subCollectionName,
  subCollectionDocId,
}) => {
  return new Promise((resolve, reject) => {
    const onResult = (QuerySnapshot) => {
      resolve(QuerySnapshot);
    };

    const onError = (error) => {
      reject(error);
    };

    firestore()
      .collection(collectionName)
      .doc(collectionDocId)
      .collection(subCollectionName)
      .doc(subCollectionDocId)
      .onSnapshot(onResult, onError);
  });
};

const createResourceInNestedSubCollection = ({
  collectionName,
  collectionDocId,
  subCollectionName,
  subCollectionDocId,
  innerCollectionName,
  payload,
}) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(collectionName)
      .doc(collectionDocId)
      .collection(subCollectionName)
      .doc(subCollectionDocId)
      .collection(innerCollectionName)
      .add(payload)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const createResourceNestedCollection = ({
  collectionName,
  collectionDocId,
  subCollectionName,
  subCollectionDocId,
  payload,
}) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(collectionName)
      .doc(collectionDocId)
      .collection(subCollectionName)
      .doc(subCollectionDocId)
      .set(payload)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const deleteResourceNestedCollection = ({
  collectionName,
  collectionDocId,
  subCollectionName,
  subCollectionDocId,
}) => {
  return firestore()
    .collection(collectionName)
    .doc(collectionDocId)
    .collection(subCollectionName)
    .doc(subCollectionDocId)
    .delete();
};

const getResourceFromNestedSubCollection = ({
  collectionName,
  collectionDocId,
  subCollectionName,
  subCollectionDocId,
  innerCollectionName,
}) => {
  return new Promise((resolve, reject) => {
    const onResult = (QuerySnapshot) => {
      resolve(QuerySnapshot.docs);
    };

    const onError = (error) => {
      reject(error);
    };

    firestore()
      .collection(collectionName)
      .doc(collectionDocId)
      .collection(subCollectionName)
      .doc(subCollectionDocId)
      .collection(innerCollectionName)
      .orderBy('timeStamp')
      .onSnapshot(onResult, onError);
  });
};

const deleteResourceFromNestedSubCollection = ({
  collectionName,
  collectionDocId,
  subCollectionName,
  subCollectionDocId,
  innerCollectionName,
  innerCollectionDocId,
}) => {
  return firestore()
    .collection(collectionName)
    .doc(collectionDocId)
    .collection(subCollectionName)
    .doc(subCollectionDocId)
    .collection(innerCollectionName)
    .doc(innerCollectionDocId)
    .delete();
};

export {
  getResource,
  getResourceById,
  updateData,
  getResourceWithRefrence,
  getResourceFromSubCollection,
  getResourceByIdFromSubCollection,
  createResourceInNestedSubCollection,
  getResourceFromNestedSubCollection,
  deleteResourceFromNestedSubCollection,
  createResourceNestedCollection,
  deleteResourceNestedCollection,
};
