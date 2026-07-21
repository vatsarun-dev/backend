import Imagekit from "imagekit";
import env from "./env.js";
const imageStore = new Imagekit({
  urlEndpoint: env.URLENDPOINT,
  privateKey: env.PRIVATEKEY,
  publicKey: env.PUBLICKEY,
});

const sendFiles = async (file, fileName) => {
  const option = {
    file,
    fileName,
    folder: "Students",
  };

  return await imageStore.upload(option);
};
export default sendFiles;
