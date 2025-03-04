"use client";

import FileUploaderWrapper from "@/Components/UI/FileUploaderWrapper";
import ImageUploader from "@/Components/UI/ImageUploader";
import React from "react";
import { useAuth } from "@/Hooks";
import { useUrl } from "@/Hooks";
const Home = () => {
  const { userData, user } = useAuth();
  const { isConverted } = useUrl()

  
  return (
    <>
      <div className="space-y-10 my-10">
        <div className="center">
          {user &&<div className="text-sm font-sans border border-line bg-secondary rounded-full p-2 px-4">

          Hello, {userData?.username}! 👋
          </div>}
          {!user && (
            <div className="text-sm font-sans border border-yellow-500 bg-yellow-500/10 text-yellow-500 rounded-full p-2 px-4">
              Sign in to save your images
            </div>
          )}
        </div>
        <div className="text-center ">
          <h2 className="font-sora font-semibold text-transparent bg-gradient-to-r from-orange-500 to-purple-500/90 bg-clip-text text-3xl">
            Image URL Generator
          </h2>
          <p className="text-sub">
            Upload images and generate optimized URLs for your website.
          </p>
        </div>
        <ImageUploader />
        {isConverted && <FileUploaderWrapper />}
      </div>
    </>
  );
};

export default Home;
