"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import useStore from "../../contexts/store";
import useAuth from "../../hooks/useAuth";
import { getBaseUrl } from "../../utils/api";

const Subscribe = () => {
  const router = useRouter();
  const isPremium = useStore((state) => state.isPremium);
  const setIsPremium = useStore((state) => state.setIsPremium);
  const subscriptionId = useStore((state) => state.subscriptionId);
  const setSubscriptionId = useStore((state) => state.setSubscriptionId);
  const [loading, setLoading] = useState(false);
  const { checkAuth, getUser } = useAuth();

  useEffect(() => {
    const checkSubscription = async () => {
      const id = localStorage.getItem("subscriptionId");
      if (!id) return;

      setSubscriptionId(id);

      try {
        const baseUrl = getBaseUrl();
        const response = await fetch(
          `${baseUrl}/check-subscription?subscriptionId=${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const result = await response.json();

        if (result.isPremium) {
          setIsPremium(true);
          toast.success("You already have a premium subscription.");
          router.push("/");
        }
      } catch (error) {
        console.error("Error checking subscription:", error);
        toast.error("Error checking subscription.");
      }
    };

    checkSubscription();
  }, [router, setIsPremium, setSubscriptionId]);

  const handleSubscribe = async () => {
    if (!checkAuth()) {
      toast.warn("You need to be logged in to subscribe.");
      router.push("/login");
      return;
    }

    const user = getUser();
    if (!user || !user.email) {
      toast.error("Error getting user information.");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const baseUrl = getBaseUrl();
      const response = await fetch(`${baseUrl}/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });

      const session = await response.json();
      if (session.url) {
        window.location.href = session.url;
      } else {
        throw new Error(session.error || "Error creating checkout session.");
      }
    } catch (error: any) {
      console.error("Error creating checkout session:", error);
      toast.error("Error creating checkout session: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-[100%] min-h-screen flex items-center justify-center bg-gray-100 flex-wrap sm:flex-nowrap">
      <div className="w-full sm:w-[50%] hidden sm:block h-screen flex flex-col m-auto justify-center items-center bg-gray-200">
        <img
          src="https://th.bing.com/th/id/R.9dd61cbc5dca70787ebf397eaab9894a?rik=yILfUWBnMpMH9g&pid=ImgRaw&r=0"
          alt="Imagem Bacana"
          className="max-w-full h-[100%] object-cover"
        />
      </div>
      <div className="w-full  sm:w-[50%] flex flex-col h-[100vh] justify-center p-6 rounded-lg shadow-lg text-center">
        {!isPremium ? (
          <>
            <h1 className="text-[goldenrod] text-[2.5rem] font-bold mb-4">
              Its time to subscribe!
            </h1>
            <p className="mb-4 text-[#000000]">
              We have exclusive resources for our premium users.
            </p>

            <h2 className="text-[1.5rem] text-[#000000]">
              Subscribe now and get access to exclusive resources!
            </h2>

            <div className="flex p-4 items-center- justify-center w-full">
              <button
                onClick={handleSubscribe}
                className="px-4 py-2 m-5 bg-blue-500 w-full max-w-[250px] text-white rounded hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Processando..." : "Assinar Agora"}
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-[goldenrod] text-[2.5rem] font-bold mb-4">
              You already have a premium subscription!
            </h1>
            <p className="mb-4 text-[#000000]">
              Thank you for subscribing to our premium plan.
            </p>
          </>
        )}

        <div className="h-[300px] w-full flex flex-col gap-4 items-center justify-center text-blue-500">
          Still not convinced? Download our free resources and see for yourself!
          <Link
            className="px-4 py-2 m-5 bg-blue-500 w-full max-w-[150px] text-white rounded hover:bg-blue-600"
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
