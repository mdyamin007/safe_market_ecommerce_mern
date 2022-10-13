const firebase = require("../config/firebase");

require("firebase/storage");

const storage = firebase.storage().ref();

global.XMLHttpRequest = require("xhr2");

exports.uploadImage = async (image) => {
  const timestamp = Date.now();
  const name = image.originalname.split(".")[0];
  const type = image.originalname.split(".")[1];
  const imageKey = `${name}_${timestamp}.${type}`;

  const imageRef = storage.child(imageKey);
  const snapshot = await imageRef.put(image.buffer);
  const imageUrl = await snapshot.ref.getDownloadURL();

  return { imageUrl, imageKey };
};
