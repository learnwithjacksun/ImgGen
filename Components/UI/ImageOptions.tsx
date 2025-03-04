"use client";
import React, { useRef } from 'react';
import Select from "./Select";
import useUrl from "@/Hooks/useUrl";

const ImageOptions: React.FC = () => {
  const {handleSelectUrlType, handleSelectHtmlTag} = useUrl()
  const scrollToRef = useRef<HTMLDivElement>(null);

  const handleGenerateUrl = () => {
    // Call your generate URL function here
    // After generating the URL, scroll to the ref
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="border-line border rounded-md">
      <h2 className="text-lg font-bold  border-b border-line p-4 font-sora text-main">
        Image Options
      </h2>
      <div className="p-4 pb-6 space-y-4">
        <Select
          options={[
            "Original",
            "Thumbnail",
            "Medium",
           
          ]}
          onSelect={handleSelectUrlType}
          placeholder="Select URL type"
          label="URL Type"
        />
        <Select
          options={["Image Tag", "Anchor Tag"]}
          onSelect={handleSelectHtmlTag}
          placeholder="Select HTML Tag"
          label="HTML Tag"
        />
      </div>
      <div ref={scrollToRef}>
        {/* Content to scroll to */}
      </div>
    </div>
  );
};

export default ImageOptions;
