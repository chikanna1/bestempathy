import React, { useState } from "react";
import { API_URL } from "../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";

import Image from "next/image";
import therapist_profile_image_sample from "../assets/images/therapist-profile-page/default-profile-icon.jpg";

const ImageUpload = ({ uploadProfileImage, onClose }) => {
  const [previewImage, setPreviewImage] = useState(null);

  const [uploading, setUploading] = useState(false);

  const backgroundClassMap = {
    themeBorderColor: "border-mint-tulip-500",
    themeTextColor: "text-mint-tulip-500",
    themeHoverTextColor: "mint-tulip-700",
    themeTextSecondaryColor: "black",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    if (!previewImage) {
      toast.error("No Image Selected!");
      toast.clearWaitingQueue();
      return;
    }
    const formData = new FormData();
    formData.append("files", previewImage);

    const imageUploaded = await uploadProfileImage(formData);

    console.log(imageUploaded);
    if (imageUploaded.uploaded) {
      toast.success(imageUploaded.message);
      onClose(true);
      setUploading(false);
    } else {
      toast.error(imageUploaded.message);
      setUploading(false);
    }
  };
  const handleFileChange = async (e) => {
    // Check Filename Extensions

    let file = e.target.files[0];
    switch (file.type) {
      case "image/png":
        //('image type is png');
        setPreviewImage(e.target.files[0]);
        return;
      case "image/jpg":
        //('image/jpg')
        setPreviewImage(e.target.files[0]);
        return;
      case "image/jpeg":
        //('image is jpeg')
        setPreviewImage(e.target.files[0]);
        return;
      default:
        toast.error("Please Upload A Supported Image Type (JPEG/JPG/PNG");
        setPreviewImage(null);
        return;
    }
  };

  return (
    <div>
      <ToastContainer limit={1} />
      <div className="flex flex-col">
        <h1 className="text-[30px] font-semibold capitalize">
          Upload Account Profile Image
        </h1>
        {/* Image */}
        <div className="flex justify-center my-5">
          {previewImage ? (
            <img
              className={`w-[120px] h-[120px] lg:w-[150px] lg:h-[150px]  border ${backgroundClassMap["themeBorderColor"]} p-1`}
              src={URL.createObjectURL(previewImage)}
              alt="Thumb"
            />
          ) : (
            <Image
              className={`w-[120px] h-[120px] lg:w-[150px] lg:h-[150px]  border ${backgroundClassMap["themeBorderColor"]} p-1`}
              src={therapist_profile_image_sample}
              alt="Badge"
            />
          )}
        </div>
        {uploading ? (
          <div className="flex flex-col items-center justify-center mt-[10%]">
            <ReactLoading
              type={"spin"}
              color={"#9e9fa9"}
              height={150}
              width={150}
            />
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit}>
              <div className="py-[50px] bg-blue-gray-200 ">
                <input type="file" onChange={handleFileChange} />
              </div>
              <button className="bg-orange-700 py-2 my-3 w-full " type="submit">
                <p className="text-white text-[20px]">Upload</p>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
