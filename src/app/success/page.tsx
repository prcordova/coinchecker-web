import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const FetchSubscription = () => {
  const router = useRouter();
  const { sessionId } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        // Substitua a URL pela sua API de busca de assinatura
        const response = await fetch(
          `https://sua-api.com/assinatura?session_id=${sessionId}`
        );
        const data = await response.json();

        // Processamento adicional baseado nos dados recebidos
        console.log(data);
      } catch (error) {
        console.error("Erro ao buscar assinatura:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [sessionId]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Renderize seu componente com base no estado de carregamento aqui
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-bold mb-4">Assinatura concluída!</h1>
      <p className="mb-4">Obrigado por se tornar um usuário premium.</p>
    </div>
  );
};

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <React.Suspense
        fallback={
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Processando...</h1>
          </div>
        }
      >
        <FetchSubscription />
      </React.Suspense>
    </div>
  );
};

export default SuccessPage;
