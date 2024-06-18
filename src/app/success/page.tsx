// pages/success.js

import { useEffect } from "react";
import { useRouter } from "next/router";

const Success = () => {
  const router = useRouter();

  useEffect(() => {
    const storeSubscriptionId = async () => {
      const session_id = router.query.session_id;
      if (!session_id) return;

      try {
        const response = await fetch(
          `http://localhost:4000/retrieve-session?session_id=${session_id}`
        );
        const result = await response.json();
        localStorage.setItem("subscriptionId", result.subscriptionId);
        router.push("/");
      } catch (error) {
        console.error("Error retrieving subscription:", error);
      }
    };

    storeSubscriptionId();
  }, [router]);

  return (
    <div className="w-[100%] min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-[2.5rem] font-bold">
        Pagamento Concluído com Sucesso!
      </h1>
    </div>
  );
};

export default Success;
