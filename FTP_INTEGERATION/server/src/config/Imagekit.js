const Imagekit = require("imagekit");
const fileUploaded = new Imagekit({
  urlEndpoint: process.env.urlEndpoint,
  privateKey: process.env.privateKey,
  publicKey: process.env.publicKey,
});

const sendFile = async (file, fileName) => {
  const option = {
    file,
    fileName,
  };

  return await fileUploaded.upload(option);
};

module.exports = sendFile;
