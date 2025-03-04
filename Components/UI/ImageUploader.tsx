"use client";

import { ImagePlus, Link, Loader, Save, X } from "lucide-react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useState } from "react";
import useUrl from "@/Hooks/useUrl";
import { toast } from "sonner";
export default function ImageUploader() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | StaticImport>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
    console.log(image);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className="w-full md:w-1/2 mx-auto">
        {preview ? (
          <ImagePreview image={image} preview={preview} setPreview={setPreview} />
        ) : (
          <Uploader
            handleImageChange={handleImageChange}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
          />
        )}
      </div>
    </>
  );
}

const Uploader = ({
  handleImageChange,
  handleDragOver,
  handleDrop,
}: {
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}) => {
  return (
    <div>
      <label htmlFor="image" className="cursor-pointer">
        <input
          type="file"
          name="image"
          id="image"
          accept=".png, .jpg, .jpeg"
          className="hidden"
          onChange={handleImageChange}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
        <div onDragOver={handleDragOver} onDrop={handleDrop} className="flex flex-col items-center text-sm text-sub justify-center bg-foreground h-48 border-2 border-dashed border-line rounded-md">
          <ImagePlus size={30} className="mb-4" />
          <p>
            <span className="text-main font-medium">Upload a file</span> or drag
            and drop
          </p>
          <p>PNG, JPG, JPEG up to 2MB</p>
        </div>
      </label>
    </div>
  );
};

const ImagePreview = ({
  image,
  preview,
  setPreview,
}: {
  image: File | null;
  preview: string | StaticImport;
  setPreview: React.Dispatch<React.SetStateAction<string | StaticImport>>;
}) => {
  const { isLoading, generateUrl, isConverted, handleSaveImage } = useUrl()

     

  const handleGenerateUrl = () => {
    if(!image){
      toast.error("Please upload an image")
      return
    }
    generateUrl(image)
  }


  return (
    <>
      <div className="p-4 bg-foreground rounded-xl relative border border-line">
        <button
          onClick={() => setPreview("")}
          className="h-10 w-10 rounded-full bg-secondary text-main center top-2 right-2 absolute shadow-2xl"
        >
          <X size={20} />
        </button>
        <div className="h-[200px] w-[200px] mx-auto overflow-hidden">
          <Image
            src={preview}
            alt="Preview"
            width={100}
            height={100}
            className="h-full w-full mx-auto object-cover rounded-md"
          />
        </div>

      </div>
      {!isConverted && (
        <>
        <button disabled={isLoading} onClick={handleGenerateUrl} className="bg-primary text-primary-inverse px-4 py-2 mx-auto mt-4 rounded-md">
          {isLoading ? <Loader size={20} className="animate-spin" /> : <Link size={18} />}
          {isLoading ? "Generating..." : "Generate URL"}
        </button>
        </>
      )}
      {isConverted && (
        <>  
        <button disabled={isLoading} onClick={handleSaveImage} className="bg-primary text-primary-inverse px-4 py-2 mx-auto mt-4 rounded-md">
          {isLoading ? <Loader size={20} className="animate-spin" /> : <Save size={18} />}
          {isLoading ? "Saving..." : "Save Converted Image"}
        </button>
        </>
      )}
    </>
  );
};
