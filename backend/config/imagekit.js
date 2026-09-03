import ImageKit from "@imagekit/nodejs";

let imagekitInstance = null;

const getImageKit = () => {
  if (!imagekitInstance) {
    console.log("PRIVATE KEY:", !!process.env.IMAGEKIT_PRIVATE_KEY);
    console.log("PUBLIC KEY:", !!process.env.IMAGEKIT_PUBLIC_KEY);
    console.log("URL ENDPOINT:", !!process.env.IMAGEKIT_URL_ENDPOINT);
    
    imagekitInstance = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });
  }
  return imagekitInstance;
};

export default getImageKit;