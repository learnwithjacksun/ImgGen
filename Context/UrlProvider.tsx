"use client";

import { useState } from "react";
import { UrlContext } from "./UrlContext";
import { toast } from "sonner";
import { databases, DB, ID, UPLOADS } from "@/Lib/appwrite";
import { useAuth } from "@/Hooks";

export interface UrlContextType {
  url: string;
  setUrl: (url: string) => void;
  thumbnail: string;
  setThumbnail: (thumbnail: string) => void;
  medium: string;
  setMedium: (medium: string) => void;
  deleteUrl: string;
  setDeleteUrl: (deleteUrl: string) => void;
  anchorTag: string;
  generateUrl: (image: File) => Promise<void>;
  isLoading: boolean;
  linkContent: string;
  htmlContent: string;
  handleSelectUrlType: (option: string) => void;
  handleSelectHtmlTag: (option: string) => void;
  handleSaveImage: () => Promise<void>;
  imageData: ImageData | undefined;
  setIsConverted: (value: boolean) => void;
  isConverted: boolean;
}

type ImageData = {
  id: string;
  url: string;
  display_url: string;
  thumb: {
    url: string;
  };
  medium: {
    url: string;
  };
  delete_url: string;
  timestamp: string;
  image: {
    filename: string;
  };
  size: string;
};

export default function UrlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [imageData, setImageData] = useState<ImageData | undefined>();
  const [url, setUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [medium, setMedium] = useState("");
  const [deleteUrl, setDeleteUrl] = useState("");
 
  const [linkContent, setLinkContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isConverted, setIsConverted] = useState(false);
  


//   const setIsConverted = (value: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("isConverted", value);
//     router.push(`?${params.toString()}`);
//   };

  const generateUrl = async (image: File | null) => {
    setIsLoading(true);
    try {
      if (!image) {
        toast.error("Please upload an image");
        return;
      }
      const formData = new FormData();
      formData.append("image", image);
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("API Response:", data); 

      if (data.success) {
        const imgData = data.data;

      setImageData(imgData);
      setUrl(imgData.display_url || ""); // Ensure default values if undefined
      setThumbnail(imgData.thumb?.url || ""); // Prevent reading undefined properties
      setMedium(imgData.medium?.url || ""); 
      setDeleteUrl(imgData.delete_url || "");

      setIsConverted(true);

      window.scrollTo({
        top: 500,
        behavior: "smooth",
      });
      } else {
        toast.error("Failed to upload image. Please try again.");
        console.error("Upload failed:", data);
      }

      console.log(imageData);
    } catch (error) {
      console.error("Error during image upload:", (error as Error).message);
      toast.error("Error converting image", {
        description: (error as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  

  const anchorTag = `<a href="${url}" target="_blank"><img src="${url}" alt="Image" /></a>`;
  const imageTag = `<img src="${url}" alt="Image" />`;

  const handleSelectUrlType = (option: string) => {
    console.log("Selected option:", option);
    if (option === "Original") {
      setLinkContent(url);
    } else if (option === "Thumbnail") {
      setLinkContent(thumbnail);
    } else if (option === "Medium") {
      setLinkContent(medium);
    }
  };
  const handleSelectHtmlTag = (option: string) => {
    console.log("Selected option:", option);
    if (option === "Image Tag") {
      setHtmlContent(imageTag);
    } else if (option === "Anchor Tag") {
      setHtmlContent(anchorTag);
    }
  };

  const handleSaveImage = async () => {
    if(!user){
      toast.error("Please login to save your image")
      return
    }
    if(!imageData){
      toast.error("Please generate a url first")
      return
    }
    setIsLoading(true)
    const newUploadedImage = {
      id: imageData?.id,
      user_id: user?.$id,
      url: imageData?.url,
      displayUrl: imageData?.display_url    ,
      thumbnailUrl: imageData?.thumb?.url,
      deleteUrl: imageData?.delete_url,
      timestamp: new Date().toISOString(),
      filename: imageData?.image.filename,
      size: `${imageData?.size} bytes`,
    };
    try {
      await databases.createDocument(
        DB,
        UPLOADS,
        ID.unique(),
        newUploadedImage
      );
      toast.success("Image saved successfully", {
        description: "You can view it in your dashboard",
      });
    } catch (error) {
      console.error((error as Error).message);
      toast.error("Error saving image", {
        description: (error as Error).message,
      });
    } finally {
      setIsLoading(false)
    }
  };

  const value: UrlContextType = {
    url,
    setUrl,
    thumbnail,
    setThumbnail,
    medium,
    setMedium,
    deleteUrl,
    setDeleteUrl,
    anchorTag,
    generateUrl,
    isLoading,
    linkContent,
    htmlContent,
    handleSelectUrlType,
    handleSelectHtmlTag,
    handleSaveImage,
    imageData,
    setIsConverted,
    isConverted,
  };
  return <UrlContext.Provider value={value}>{children}</UrlContext.Provider>;
}
