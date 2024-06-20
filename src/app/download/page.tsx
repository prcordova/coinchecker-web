import React from "react";

export default function DownloadPage() {
  return (
    <div className="w-full max-w-[800px] flex gap-[2rem] flex-col justify-center items-center   h-[100vh] max-h-[600px]  m-auto p-5">
      <h1 className="text-5xl font-bold text-[black]">
        Coin<span className="text-[goldenrod]">Checker</span>
      </h1>

      <p className="text-[black] text-2xl">Download now our app</p>
      <button className="px-4 py-2 m-5 bg-blue-500 w-full max-w-[150px] text-white rounded hover:bg-blue-600">
        Download
      </button>
    </div>
  );
}
