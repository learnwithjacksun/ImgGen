"use client";

import { ChevronLeft } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

const Uploads = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  return (
    <>
      <div className="md:w-[700px] w-full mx-auto space-y-4 my-10">
        <button
          onClick={goBack}
          className="h-10 w-10 center rounded-lg bg-secondary"
        >
          <ChevronLeft size={20} />
        </button>

        <div>
          <h1 className="text-2xl font-bold font-sora text-transparent bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text">
            Your Uploads
          </h1>
          <p className="text-sub text-sm">View all your uploaded images</p>
        </div>

        <h1>Coming Soon!!!</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
      </div>
    </>
  );
};

export default Uploads;
