"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Subscribe = () => {
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      const subscriptionId = localStorage.getItem("subscriptionId");
      if (!subscriptionId) return;

      try {
        const response = await fetch(
          `http://localhost:4000/check-subscription?subscriptionId=${subscriptionId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const result = await response.json();

        if (result.isPremium) {
          setIsPremium(true);
          alert("Você já é um usuário premium!");
          router.push("/");
        }
      } catch (error) {
        console.error("Error checking subscription:", error);
      }
    };

    checkSubscription();
  }, [router]);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:4000/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            priceId: "price_1PSqqvG5WXPokcit9lLjKj13",
          }),
        }
      );

      const session = await response.json();
      window.location.href = session.url;

      // Save subscriptionId after successful payment (this part needs to be handled on the success page)
      localStorage.setItem("subscriptionId", session.subscriptionId);
    } catch (error) {
      console.error("Error creating checkout session:", error);
      setLoading(false);
    }
  };

  return (
    <div className="w-[100%] min-h-screen flex items-center justify-center bg-gray-100 flex-wrap sm:flex-nowrap">
      {/* Parte 1: Imagem */}
      <div className="w-full sm:w-[50%] hidden sm:block h-screen flex flex-col m-auto justify-center items-center bg-gray-200">
        <img
          src="https://th.bing.com/th/id/R.9dd61cbc5dca70787ebf397eaab9894a?rik=yILfUWBnMpMH9g&pid=ImgRaw&r=0"
          alt="Imagem Bacana"
          className="max-w-full h-[100%] object-cover"
        />
      </div>

      {/* Parte 2: Assinar Agora */}
      <div className="w-full sm:w-[50%] flex flex-col h-[100vh] justify-center p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-[goldenrod] text-[2.5rem] font-bold mb-4">
          Que bom ter você aqui!
        </h1>
        <p className="mb-4 text-[#000000]">
          Agradecemos seu interesse em se tornar um usuário premium!
        </p>
        {!isPremium && (
          <>
            <h2 className="text-[1.5rem] text-[#000000]">
              Assine agora e tenha acesso a recursos exclusivos!
            </h2>

            <button
              onClick={handleSubscribe}
              className="px-4 py-2 m-5 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Processando..." : "Assinar Agora"}
            </button>
          </>
        )}

        <div className="h-[300px] w-full flex flex-col gap-4 items-center justify-center text-blue-500">
          Ainda não tem nosso app? Baixe agora e aproveite!
          <Link
            className="text-tomato text-[1.5rem] hover:bg-blue-700 text-[white] rounded-md p-2 bg-blue-500"
            href="/downloads"
          >
            Download
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
