import getImageKit from "../config/imagekit.js";

export const getUploadAuth = async (req, res, next) => {
  try {
    const imagekit = getImageKit();
    const { token, expire, signature } =
      imagekit.helper.getAuthenticationParameters();

    res.status(200).json({
      success: true,
      token,
      expire,
      signature,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error) {
    next(error);
  }
};