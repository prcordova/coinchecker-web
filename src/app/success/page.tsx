"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/retrieve-session?session_id=${sessionId}`,
          {
            method: "GET",
          }
        );

        const result = await response.json();

        if (result.subscriptionId) {
          document.cookie = `subscriptionId=${result.subscriptionId}; path=/`;
          alert("Assinatura concluída com sucesso!");
          router.push("/");
        } else {
          alert("Erro ao recuperar a assinatura.");
        }
      } catch (error) {
        console.error("Erro ao recuperar a assinatura:", error);
        alert("Erro ao recuperar a assinatura.");
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchSubscription();
    } else {
      setLoading(false);
    }
  }, [router, sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {loading ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Processando...</h1>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4">Assinatura concluída!</h1>
          <p className="mb-4">Obrigado por se tornar um usuário premium.</p>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;
