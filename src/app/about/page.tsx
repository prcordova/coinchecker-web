import React from "react";

export default function AboutPage() {
  return (
    <div className="w-full max-w-[800px] flex gap-[2rem] flex-col m-auto h-[100vh] max-h-[600px] max-w-[1200px] m-auto p-5">
      <h1 className="text-5xl font-bold text-[black]">
        Coin<span className="text-[goldenrod]">Checker</span>
      </h1>
      <p className="text-gray-700 text-2xl font-bold">
        CoinChecker is a web app that allows you to check the price of
        cryptocurrencies in real-time. You can also subscribe to a premium plan
        to get access to more features.
      </p>
    </div>
  );
}
