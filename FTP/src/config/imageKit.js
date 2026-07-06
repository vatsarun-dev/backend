require("dotenv").config();
const Imagekit = require("imagekit");

// to use imagekit we have to create a instance of Imagekit class and set three key
// which is {urlEndpoint, privateKey, publicKey}
const imageStorage = new Imagekit({
  urlEndpoint: process.env.urlEndpoint,
  privateKey: process.env.privateKey,
  publicKey: process.env.publicKey,
});

// this function define how to upload the data to imagekit cloud
const sendFiles = async (file, fileName) => {
  let option = {
    file,
    fileName,
  };
  return await imageStorage.upload(option);
};

module.exports = sendFiles;
