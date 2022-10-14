const { v4 } = require("uuid");
const app = require("../config/firebase");
require("firebase/storage");

exports.uploadImage = (image) => {
  // let imageUrl = "";
  // const timestamp = Date.now();
  // const name = image.originalname.split(".")[0];
  // const imageKey = `${name}_${timestamp}.${type}`;

  // console.log(image);

  return new Promise(async (resolve, reject) => {
    try {
      // console.log(imageKey);
      // const imageRef = ref(storage, imageKey);
      // // console.log(imageRef);
      // uploadBytes(imageRef, image)
      //   .then((snapshot) => {
      //     console.log(snapshot);
      //     getDownloadURL(snapshot.ref).then((imageUrl) => {
      //       console.log(imageUrl);
      //       resolve({ imageUrl, imageKey });
      //     });
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     reject(error);
      //   });

      // console.log(image);

      const type = image.originalname.split(".")[1];
      const imageKey = `${image.fieldname}${v4()}.${type}`;
      const storage = app.storage().ref();
      const imageRef = storage.child(imageKey);
      const snapshot = await imageRef.put(image.buffer);
      const imageUrl = await snapshot.ref.getDownloadURL();
      resolve({ imageUrl, imageKey });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
