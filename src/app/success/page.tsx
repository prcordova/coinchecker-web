"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useStore from "../../contexts/store";
import { getBaseUrl } from "@/utils/api";

const Success = () => {
  const router = useRouter();
  const setIsPremium = useStore((state) => state.setIsPremium);
  const setSubscriptionId = useStore((state) => state.setSubscriptionId);

  useEffect(() => {
    const handleSubscription = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get("session_id");
      if (!sessionId) {
        toast.error("Session ID não encontrado.");
        return;
      }

      try {
        const baseUrl = getBaseUrl();
        const response = await fetch(
          `${baseUrl}/check-subscription?sessionId=${sessionId}`
        );
        const result = await response.json();

        if (response.ok && result.subscription) {
          setIsPremium(result.subscription.status === "active");
          setSubscriptionId(result.subscription.id);
          toast.success("Assinatura confirmada com sucesso!");
        } else {
          toast.error("Erro ao confirmar a assinatura.");
        }
      } catch (error) {
        console.error("Erro ao verificar a assinatura:", error);
        toast.error("Erro ao verificar a assinatura.");
      }
    };

    handleSubscription();
  }, [router, setIsPremium, setSubscriptionId]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-white text-center">
        <h1 className="text-2xl font-bold mb-4">Sucesso</h1>
        <p className="mb-4">Obrigado por se tornar um usuário premium!</p>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Ir para a Home
        </button>
      </div>
    </div>
  );
};

export default Success;
