"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Subscribe = () => {
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      const subscriptionId = getCookie("subscriptionId");
      if (!subscriptionId) return;

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
    };

    checkSubscription();
  }, [router]);

  const handleSubscribe = async () => {
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
    if (session.url) {
      window.location.href = session.url;
    } else {
      alert("Erro ao iniciar a assinatura.");
    }
  };

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">CoinChecker</h1>
        <p className="mb-4">
          Agradecemos seu interesse em se tornar um usuário premium!
        </p>
        {!isPremium && (
          <button
            onClick={handleSubscribe}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Assinar Agora
          </button>
        )}
      </div>
    </div>
  );
};

export default Subscribe;
