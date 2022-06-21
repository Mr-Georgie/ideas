import { useState } from "react";

import { sdk, bucketId } from "../config";

export default function useImageHandler() {
  // will hold image data from fetching from api
  const [image, setImage] = useState({});

  // will hold list of image data from fetching from api
  const [imageList, setImageList] = useState({});

  // handle signup events
  const uploadImage = async (file) => {
    console.log("uploading image...");
    // console.log("user input: ", data)

    try {
      const newImage = await sdk.storage.createFile(bucketId, "unique()", file);
      setImage(newImage);

      console.log("Uploading image...");
      return image["$id"];
    } catch (error) {
      console.log("Oops! An error occured while uploading");
      console.log(error);
    }
  };

  const getAllImages = async () => {
    try {
      const images = await sdk.storage.listFiles(bucketId);
      setImageList(images.files);

      console.log("Images fetched");
    } catch (error) {
      console.log("Oops! An error occured while fetching images");
      console.log(error);
    }
  };

  // handles image preview on the interface
  const getImagePreview = () => {
    // console.log(image['$id'])

    if (image["$id"] !== undefined) {
      return sdk.storage.getFilePreview(bucketId, image["$id"]);
    } else {
      return "";
    }
  };

  const removeUploadedImage = async () => {
    try {
      if (image["$id"] !== undefined) {
        await sdk.storage.deleteFile(bucketId, image["$id"]);
      }

      console.log("Removing image...");
    } catch (error) {
      console.log("Oops! An error occured removing image");
      console.log(error);
    }
  };

  const removeImageFromDatabase = async (id) => {
    try {
      if (id !== undefined) {
        // delete image first
        await sdk.storage.deleteFile(bucketId, image["$id"]);
        console.log("image is being removed from database...");
      }
    } catch (error) {
      console.log("Oops! An error occured while removing image from database");
      console.log(error);
    }
  };
  return {
    uploadImage,
    getAllImages,
    getImagePreview,
    removeImageFromDatabase,
    removeUploadedImage,
  };
}
