"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getBaseUrl } from "@/utils/api";

interface SubscriptionCheckerProps {
  children: React.ReactNode;
}

const SubscriptionChecker = ({ children }: SubscriptionCheckerProps) => {
  const router = useRouter();

  useEffect(() => {
    const checkSubscription = async () => {
      const response = await fetch(`h${getBaseUrl}/check-subscription`, {
        method: "GET",
        credentials: "include",
      });

      const result = await response.json();

      if (result.isPremium) {
        alert("Você já é um usuário premium!");
        router.push("/");
      }
    };

    checkSubscription();
  }, [router]);

  return <>{children}</>;
};

export default SubscriptionChecker;
