const Imagekit = require("imagekit");
const fileUploaded = new Imagekit({
  urlEndpoint: process.env.urlEndpoint,
  privateKey: process.env.privateKey,
  publicKey: process.env.publicKey,
});
